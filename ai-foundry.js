import { AzureOpenAI } from "openai";
import dotenv from "dotenv";

dotenv.config();

export async function main() {
  // You will need to set these environment variables or edit the following values
  const endpoint = process.env["AZURE_OPENAI_ENDPOINT"] || "https://anton-mc3ctdjs-eastus2.openai.azure.com/";
  const apiKey = process.env["AZURE_OPENAI_API_KEY"] || "<REPLACE_WITH_YOUR_KEY_VALUE_HERE>";
  const apiVersion = "2025-01-01-preview";
  const deployment = "gpt-4o"; // This must match your deployment name
  console.log("Loaded endpoint:", endpoint);
console.log("Loaded API key:", apiKey?.slice(0, 5) + "..."); // Avoid printing full key


  const client = new AzureOpenAI({ endpoint, apiKey, apiVersion, deployment });

  const result = await client.chat.completions.create({
    messages: [
      { role: "system", content: "You are an AI assistant that helps people find information." },
      { role: "user", content: "I am going to Paris, what should I see?" },
      { role: "assistant", content: "Paris, the capital of France, is known for its stunning architecture, art museums, historical landmarks, and romantic atmosphere. Here are some of the top attractions to see in Paris:\n\n1. The Eiffel Tower: The iconic Eiffel Tower is one of the most recognizable landmarks in the world and offers breathtaking views of the city.\n2. The Louvre Museum: The Louvre is one of the world's largest and most famous museums, housing an impressive collection of art and artifacts, including the Mona Lisa.\n3. Notre-Dame Cathedral: This beautiful cathedral is one of the most famous landmarks in Paris and is known for its Gothic architecture and stunning stained glass windows.\n\nThese are just a few of the many attractions that Paris has to offer. With so much to see and do, it's no wonder that Paris is one of the most popular tourist destinations in the world." },
      { role: "user", content: "What is so great about #1?" }
    ],
    max_tokens: 800,
      temperature: 0.7,
      top_p: 0.95,
      frequency_penalty: 0,
      presence_penalty: 0,
      stop: null
  });

  console.log(JSON.stringify(result, null, 2));
}

main().catch((err) => {
  console.error("The sample encountered an error:", err);
});
