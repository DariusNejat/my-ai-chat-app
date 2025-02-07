// src/ai-agent/tools/foodApi.js

// export async function getFoodNutrition(foodName) {
//     // Replace the URL and parameters below with your actual API endpoint and key
//     const apiKey = process.env.REACT_APP_NUTRITION_API_KEY;
//     const url = `https://api.example.com/nutrition?query=${encodeURIComponent(foodName)}&api_key=${apiKey}`;
  
//     try {
//       const response = await fetch(url);
//       if (!response.ok) {
//         throw new Error(`API error: ${response.statusText}`);
//       }
//       const data = await response.json();
//       // Assume data has properties like sugar, fat, calories, etc.
//       return data;
//     } catch (error) {
//       console.error("Error fetching nutrition data:", error);
//       return null;
//     }
//   }
  
// src/ai-agent/tools/foodApi.js
export async function getFoodNutrition(foodName) {
    // Use Open Food Facts search endpoint
    const url = `https://world.openfoodfacts.org/cgi/search.pl?search_terms=${encodeURIComponent(foodName)}&search_simple=1&action=process&json=1`;
  
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`API error: ${response.statusText}`);
      }
      const data = await response.json();
      // If there are products returned, pick the first one.
      if (data && data.products && data.products.length > 0) {
        const product = data.products[0];
        // Return the nutrition data (usually in the 'nutriments' field)
        return product.nutriments;
      }
      return null;
    } catch (error) {
      console.error("Error fetching nutrition data:", error);
      return null;
    }
  }
  