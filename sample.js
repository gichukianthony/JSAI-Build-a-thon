import ModelClient, { isUnexpected } from "@azure-rest/ai-inference";
import { AzureKeyCredential } from "@azure/core-auth";
import path from "path";
import fs from "fs";
import dotenv from "dotenv";
dotenv.config();

const token = process.env["GITHUB_TOKEN"];
const endpoint = "https://models.github.ai/inference";
const model = "microsoft/Phi-3.5-vision-instruct";

export async function main() {

    const imagePath = path.join(process.cwd(), "contoso_layout_sketch.jpg");
    const imageBuffer = fs.readFileSync(imagePath);
    const imageBase64 = imageBuffer.toString("base64");
    const client = ModelClient(endpoint, new AzureKeyCredential(token));

    const response = await client.path("/chat/completions").post({
        body: {
            messages: [
                { role: "system", content: "You are a senior frontend developer" },
                {
                    role: "user", content: [
                        {
                            type: "text",
                            text: "write HTML and CSS code for a simple webpage based on the following sketch:",
                        },
                        {
                            type: "image_url",
                            image_url: {
                                url: `data:image/jpeg;base64,${imageBase64}`,
                            },
                        }
                    ]
                },
            ],
            temperature: 1.0,
            top_p: 1.0,
            model: model,
        },
    });

    if (isUnexpected(response)) {
        throw new Error(response.body?.error?.message || "Unknown error occurred");
    }

    const generatedCode = response.body.choices[0].message.content;
    console.log("Generated HTML/CSS code:");
    console.log(generatedCode);

    // Save the generated code to a file
    const outputPath = path.join(process.cwd(), "generated_webpage.html");
    fs.writeFileSync(outputPath, generatedCode);
    console.log(`\nCode saved to: ${outputPath}`);
}

main().catch((err) => {
    console.error("The sample encountered an error:", err);
});