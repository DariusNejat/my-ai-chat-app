// src/ai-agent/tools/foodApi.js
import { getFoodFromTable, updateFoodTableEntry } from "./foodTable";

export async function getFoodNutrition(foodName) {
  // Check if nutrition data is cached.
  const cached = await getFoodFromTable(foodName);
  if (cached) {
    console.log(`Returning cached data for ${foodName}`);
    return cached.data;
  }
  
  // Call the API from Open Food Facts.
  const url = `https://world.openfoodfacts.org/cgi/search.pl?search_terms=${encodeURIComponent(foodName)}&search_simple=1&action=process&json=1`;
  
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`API error: ${response.statusText}`);
    }
    const data = await response.json();
    if (data && data.products && data.products.length > 0) {
      const product = data.products[0];
      const nutritionData = product.nutriments;
      // Update the food table with the new food data.
      await updateFoodTableEntry({ food: foodName, data: nutritionData });
      return nutritionData;
    }
    return null;
  } catch (error) {
    console.error("Error fetching nutrition data:", error);
    return null;
  }
}
