// src/ai-agent/tools/foodCache.js
const LOCAL_STORAGE_KEY = 'foodCache';

export function loadFoodCache() {
  const cache = localStorage.getItem(LOCAL_STORAGE_KEY);
  if (cache) {
    try {
      return JSON.parse(cache);
    } catch (e) {
      console.error("Error parsing food cache", e);
      return {};
    }
  }
  return {};
}

export function saveFoodCache(cache) {
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(cache));
}

export function getCachedFoodData(food) {
  const cache = loadFoodCache();
  return cache[food] || null;
}

export function setCachedFoodData(food, data) {
  const cache = loadFoodCache();
  cache[food] = data;
  saveFoodCache(cache);
}
