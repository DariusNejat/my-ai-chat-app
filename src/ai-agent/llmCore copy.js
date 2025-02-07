// llmCor.js

 export async function callLLM(prompt, toolData = null) {
    // If toolData is provided, append it to the prompt
    let finalPrompt = prompt;
    if (toolData) {
        finalPrompt += `\n\nAdditional Nutrition Data:\n${JSON.stringify(toolData)}`;
    }
    // Replace with your valid OpenAI API key
    const API_KEY = "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";
    const API_URL = "https://openrouter.ai/api/v1/chat/completions";
    const MODEL_NAME = "deepseek/deepseek-r1:free";
    // Build the JSON body with the required "messages" array
    const requestBody = {
        model: MODEL_NAME, // Use appropriate DeepSeek model name
        messages: [
          { role: "system", content: "You are an AI assistant." },
          { role: "user", content: finalPrompt }
        ],
      };

    try {
      // Make sure to use the full URL exactly as specified
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${API_KEY}`
        },
        body: JSON.stringify(requestBody)
      });
  
      if (!response.ok) {
        // Log error details to help troubleshoot URL or header issues
        const errorData = await response.text();
        console.error("Error from DeepSeek API:", response.status, errorData);
        return "Sorry, something went wrong.";
      }
  
      const data = await response.json();
      console.log("data is", data);
      // Extract the response content
      const generatedText = data.choices?.[0]?.message?.content;

      return generatedText || "No response generated.";

    } catch (error) {
      console.error("Error in callLLM:", error);
      return "Sorry, something went wrong.";
    }
  }
  