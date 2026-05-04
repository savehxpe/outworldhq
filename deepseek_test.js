import "dotenv/config";
import { OpenRouter } from "@openrouter/sdk";

const openrouter = new OpenRouter({
  apiKey: process.env.OPENROUTER_API_KEY
});


async function run() {
  console.log("Connecting to OpenRouter (deepseek/deepseek-v4-pro)...");
  
  const stream = await openrouter.chat.send({
    chatRequest: {
      model: "deepseek/deepseek-v4-pro",

      messages: [
        {
          role: "user",
          content: "How many r's are in the word 'strawberry'?"
        }
      ],
      stream: true
    }
  });

  for await (const chunk of stream) {
    const content = chunk.choices[0]?.delta?.content;
    if (content) {
      process.stdout.write(content);
    }

    if (chunk.usage) {
      console.log("\n\nUsage Stats:");
      console.log("Reasoning tokens:", chunk.usage.reasoningTokens || chunk.usage.reasoning_tokens || 0);
      console.log("Prompt tokens:", chunk.usage.promptTokens || chunk.usage.prompt_tokens || 0);
      console.log("Completion tokens:", chunk.usage.completionTokens || chunk.usage.completion_tokens || 0);
    }
  }
}

run().catch(console.error);
