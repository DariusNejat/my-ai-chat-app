// src/utils/detectFood.js
const commonFoods = [
    "rice",
    "sandwich",
    "apple",
    "meat",
    "banana",
    "chicken",
    "beef",
    "pasta",
    "bread",
    "salad",
    "yogurt",
    // add more as needed
  ];
  
//   export function detectFood(messageText) {
//     const lowerText = messageText.toLowerCase();
//     for (const food of commonFoods) {
//       if (lowerText.includes(food)) {
//         return food;
//       }
//     }
//     return null;
//   }
  
  export function detectFood(messageText) {
    const lowerText = messageText.toLowerCase();
    const detectedFoods = commonFoods.filter(food => lowerText.includes(food));
    return detectedFoods.length > 0 ? detectedFoods : null;
  }