// src/ai-agent/tools/foodTable.js
const LOCAL_STORAGE_KEY = "foodTable";
let foodTable = null;

export async function loadFoodTable() {
  if (foodTable) return foodTable;
  const cached = localStorage.getItem(LOCAL_STORAGE_KEY);
  if (cached) {
    try {
      foodTable = JSON.parse(cached);
      return foodTable;
    } catch (e) {
      console.error("Error parsing food table from localStorage", e);
    }
  }
  // If no valid data in localStorage, fetch it from public/foodTable.json.
  try {
    const response = await fetch('/foodTable.json');
    if (!response.ok) {
      throw new Error(`Failed to fetch food table: ${response.statusText}`);
    }
    const data = await response.json();
    foodTable = data;
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(foodTable));
    return foodTable;
  } catch (error) {
    console.error("Error fetching food table:", error);
    foodTable = [];
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(foodTable));
    return foodTable;
  }
}

export function saveFoodTable() {
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(foodTable));
}

export async function getFoodFromTable(foodName) {
  const table = await loadFoodTable();
  return table.find(item => item.food.toLowerCase() === foodName.toLowerCase()) || null;
}

export async function updateFoodTableEntry(newFoodObj) {
  const table = await loadFoodTable();
  // Only add if the food is not already in the table.
  const exists = table.find(item => item.food.toLowerCase() === newFoodObj.food.toLowerCase());
  if (!exists) {
    table.push(newFoodObj);
    foodTable = table;
    saveFoodTable();
  }
}
