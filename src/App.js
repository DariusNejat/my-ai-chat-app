// src/App.js
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
  // foodData: آرایه‌ای از اشیاء به صورت { food, data }
  const [foodData, setFoodData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSendMessage = async (messageText) => {
    if (isLoading) return; // جلوگیری از ارسال پیام‌های اضافی

    const userMessage = { text: messageText, sender: "user" };
    setMessages((prev) => [...prev, userMessage]);

    setIsLoading(true);

    // Detect foods in the message
    const detectedFoods = await detectFood(messageText);
    let nutritionDataArr = [];
    if (detectedFoods && detectedFoods.length > 0) {
      // For each detected food, get nutrition data (cached or via API)
      for (const food of detectedFoods) {
        const data = await getFoodNutrition(food);
        if (data) {
          nutritionDataArr.push({ food, data });
        }
      }
      setFoodData(nutritionDataArr);
    }
    console.log("Nutrition data obtained:", nutritionDataArr);
    
    // ارسال داده‌های تغذیه‌ای (به صورت آرایه) به مدل LLM برای بهبود پاسخ
    const aiResponse = await callLLM(messageText, nutritionDataArr);
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
