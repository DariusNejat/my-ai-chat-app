// src/utils/detectFood.js
import { loadFoodTable } from "../ai-agent/tools/foodTable";
import { defaultFoods } from "../ai-agent/tools/defaultFoods";
import { getFoodNutrition } from "../ai-agent/tools/foodApi";

// Extend the stopWords list to ignore common non-food words.
const stopWords = [
  "the", "and", "a", "an", "of", "to", "in", "on", "at", "for", "with",
  "is", "are", "was", "were", "i", "you", "it", "this", "that",
  "my", "we", "us", "eat", "eating", "meal", "dinner", "lunch", "breakfast",
  "want", "wanna", "would", "like", "have", "got"
];

function tokenize(text) {
  return text
    .toLowerCase()
    .split(/[\s,.;!?]+/)
    .filter(word => word.length > 2);
}

export async function detectFood(messageText) {
  const lowerText = messageText.toLowerCase();
  const table = await loadFoodTable(); // local cached table (or loaded from public/foodTable.json)
  const tableFoods = table.map(item => item.food.toLowerCase());

  // Combine default foods and table foods into one set (avoiding duplicates)
  const unionFoods = new Set([
    ...defaultFoods.map(food => food.toLowerCase()),
    ...tableFoods
  ]);

  const detectedFoods = new Set();

  // First, check for known foods (from the union) in the message.
  unionFoods.forEach((food) => {
    const regex = new RegExp(`\\b${food}\\b`, "gi");
    if (regex.test(lowerText)) {
      detectedFoods.add(food);
    }
  });

  // Then, check remaining tokens to see if any might be valid foods via an API check.
  const tokens = tokenize(messageText);
  for (const token of tokens) {
    if (stopWords.includes(token)) continue;
    if (detectedFoods.has(token)) continue;
    // Validate by checking if nutrition data exists (this call will update the table if valid)
    const nutritionData = await getFoodNutrition(token);
    if (nutritionData) {
      detectedFoods.add(token);
    }
  }

  console.log("Detected foods:", Array.from(detectedFoods));
  return Array.from(detectedFoods);
}
