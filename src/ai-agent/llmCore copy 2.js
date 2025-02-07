// llmCor.js

 export async function callLLM(userMessage, nutritionData = null) {
    // Replace with your valid OpenAI API key
    const API_KEY = "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";
    const API_URL = "https://openrouter.ai/api/v1/chat/completions";
    const MODEL_NAME = "deepseek/deepseek-r1:free";
    // Contextual Priming: Provide a structured prompt with medical context
    let prompt = `You are a diabetes management assistant. Your job is to provide accurate and medically appropriate guidance based on user queries.

    Guidelines:
    - Always prioritize medically accurate and safe responses.
    - If food information is provided, consider its impact on blood sugar levels.
    - Offer actionable advice for managing diabetes, including diet, exercise, and lifestyle tips.
    - Do not make diagnoses—recommend consulting a healthcare professional when necessary.

    Conversation:
    User: "${userMessage}"`;

    // Chain of Thought Prompting: If food data is available, integrate it into the prompt
    if (nutritionData) {
        prompt += `

    Additional Data:
    The user mentioned a food item. Here is its nutritional profile:
    ${JSON.stringify(nutritionData, null, 2)}

    Consider how this food might impact a person with diabetes and provide tailored advice.`;
    }

  prompt += "\nAssistant:";

    // Build the JSON body with the required "messages" array
    const requestBody = {
        model: MODEL_NAME, // Use appropriate DeepSeek model name
        prompt: prompt,
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
  