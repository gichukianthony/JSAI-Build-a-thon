import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import fs from "fs";
import path, { dirname } from "path";
import { fileURLToPath } from 'url';
import pdfParse from 'pdf-parse/lib/pdf-parse.js';
import { AzureChatOpenAI } from "@langchain/openai";
import { BufferMemory } from "langchain/memory";
import { ChatMessageHistory } from "langchain/stores/message/in_memory";
//                       ${message.sources.map(source => html`<p>${source}</p>`)}

// Load environment variables
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Resolve PDF path
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const projectRoot = path.resolve(__dirname, '../..');
const pdfPath = path.join(projectRoot, 'data/employee_handbook.pdf');

// PDF content cache and chunking
let pdfText = null;
let pdfChunks = [];
const CHUNK_SIZE = 800;

async function loadPDF() {
  if (pdfText) return pdfText;
  if (!fs.existsSync(pdfPath)) {
    console.warn("Employee handbook PDF not found at:", pdfPath);
    return null;
  }

  const dataBuffer = fs.readFileSync(pdfPath);
  const data = await pdfParse(dataBuffer);
  pdfText = data.text;

  let currentChunk = "";
  const words = pdfText.split(/\s+/);
  for (const word of words) {
    if ((currentChunk + " " + word).length <= CHUNK_SIZE) {
      currentChunk += (currentChunk ? " " : "") + word;
    } else {
      pdfChunks.push(currentChunk);
      currentChunk = word;
    }
  }
  if (currentChunk) pdfChunks.push(currentChunk);
  return pdfText;
}

function retrieveRelevantContent(query) {
  if (!pdfChunks.length) return [];
  const queryTerms = query.toLowerCase().split(/\s+/)
    .filter(term => term.length > 3)
    .map(term => term.replace(/[.,?!;:()"']/g, ""));

  if (!queryTerms.length) return [];
  const scored = pdfChunks.map(chunk => {
    const lower = chunk.toLowerCase();
    let score = 0;
    for (const term of queryTerms) {
      const matches = lower.match(new RegExp(term, 'g'));
      if (matches) score += matches.length;
    }
    return { chunk, score };
  });

  return scored
    .filter(item => item.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 3)
    .map(item => item.chunk);
}

// Initialize LangChain Azure Chat client
const chatModel = new AzureChatOpenAI({
  azureOpenAIApiKey: process.env.AZURE_INFERENCE_SDK_KEY,
  azureOpenAIApiInstanceName: process.env.INSTANCE_NAME,
  azureOpenAIApiDeploymentName: process.env.DEPLOYMENT_NAME,
  azureOpenAIApiVersion: "2024-08-01-preview",
  temperature: 1,
  maxTokens: 4096,
});

// In-memory session memories
const sessionMemories = {};

function getSessionMemory(sessionId) {
  if (!sessionMemories[sessionId]) {
    const history = new ChatMessageHistory();
    sessionMemories[sessionId] = new BufferMemory({
      chatHistory: history,
      returnMessages: true,
      memoryKey: "chat_history",
    });
  }
  return sessionMemories[sessionId];
}

// Chat endpoint with optional RAG and memory
app.post("/chat", async (req, res) => {
  const userMessage = req.body.message;
  const useRAG = req.body.useRAG === undefined ? true : Boolean(req.body.useRAG);
  const sessionId = req.body.sessionId || "default";

  if (!userMessage) {
    return res.status(400).json({ error: "Message is required." });
  }

  // Load session memory
  const memory = getSessionMemory(sessionId);
  const memoryVars = await memory.loadMemoryVariables({});

  // Retrieve RAG sources if enabled
  let sources = [];
  if (useRAG) {
    await loadPDF();
    sources = retrieveRelevantContent(userMessage);
  }

  // Prepare system prompt message
  const systemMessage = useRAG
    ? {
        role: "system",
        content: sources.length > 0
          ? `You are a helpful assistant for Contoso Electronics. Use ONLY these handbook excerpts to answer.\n--- EXCERPTS ---\n${sources.join('\n\n')}\n--- END ---`
          : `You are a helpful assistant for Contoso Electronics. The handbook excerpts do not contain relevant information. Reply: "I'm sorry, I don't know. The employee handbook does not contain information about that."`,
      }
    : {
        role: "system",
        content: "You are a helpful and knowledgeable assistant. Answer concisely and informatively.",
      };

  // Build messages with memory history
  const messages = [
    systemMessage,
    ...(memoryVars.chat_history || []),
    { role: "user", content: userMessage },
  ];

  try {
    const response = await chatModel.invoke(messages);
    // Save to memory
    await memory.saveContext({ input: userMessage }, { output: response.content });

    res.json({ reply: response.content, sources });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      error: "Model call failed",
      message: err.message,
      reply: "Sorry, I encountered an error. Please try again."
    });
  }
});

// Start server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`AI API server running on port ${PORT}`);
});
