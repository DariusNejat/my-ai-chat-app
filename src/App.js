import React, { useState } from "react";
import ChatWindow from "./components/ChatWindow";
import ChatInput from "./components/ChatInput";
import { callLLM } from "./ai-agent/llmCore";
import { getFoodNutrition } from "./ai-agent/tools/foodApi";
import FoodDataDisplay from "./components/FoodDataDisplay";
import { detectFood } from "./utils/detectFood";
import "./App.css";

function App() {
  const [messages, setMessages] = useState([]);
  const [foodData, setFoodData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSendMessage = async (messageText) => {
    if (isLoading) return; // Prevent spamming

    // Append user's message
    const userMessage = { text: messageText, sender: "user" };
    setMessages((prev) => [...prev, userMessage]);

    setIsLoading(true);

    // // Detect a food item in the message
    // const detectedFood = detectFood(messageText);
    // let nutritionData = null;
    // if (detectedFood) {
    //   nutritionData = await getFoodNutrition(detectedFood);
    //   setFoodData(nutritionData);
    // }
    // console.log("Nutrition data obtained:", nutritionData);

    // Detect multiple food items
    const detectedFoods = detectFood(messageText);
    let nutritionData = [];

    if (detectedFoods) {
      for (const food of detectedFoods) {
        const data = await getFoodNutrition(food);
        if (data) {
          nutritionData.push({ food, data });
        }
      }
      setFoodData(nutritionData); // Store multiple foods' data
    }

    console.log("Nutrition data obtained:", nutritionData);
    
    // Pass the nutrition data to the LLM prompt; do not add as a separate message
    const aiResponse = await callLLM(messageText, nutritionData);
    const aiMessage = { text: aiResponse, sender: "ai" };
    setMessages((prev) => [...prev, aiMessage]);

    setIsLoading(false);
  };

  return (
    <div className="app-container">
      <div className="chat-container">
        <div className="chat-window">
          <ChatWindow messages={messages} isLoading={isLoading} />
        </div>
        {foodData && <FoodDataDisplay foodData={foodData} />}
        <div className="chat-input-container">
          <ChatInput onSendMessage={handleSendMessage} disabled={isLoading} />
        </div>
      </div>
    </div>
  );
}

export default App;
