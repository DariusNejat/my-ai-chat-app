// src/components/FoodDataDisplay.jsx
import React from "react";
import "./FoodDataDisplay.css";

const FoodDataDisplay = ({ foodData }) => {
  if (!foodData || !Array.isArray(foodData)) return null;

  console.log("inside food data display data is", foodData)
  // تعریف فیلدهای مهم جهت نمایش
  const fields = [
    { key: "energy-kcal_value", label: "Energy (kcal)" },
    { key: "fat_value", label: "Fat (g)" },
    { key: "saturated-fat_value", label: "Saturated Fat (g)" },
    { key: "carbohydrates_value", label: "Carbs (g)" },
    { key: "sugars_value", label: "Sugars (g)" },
    { key: "proteins_value", label: "Proteins (g)" },
    { key: "salt_value", label: "Salt (g)" },
  ];

  // تابعی جهت تجمیع (جمع یا میانگین) مقادیر یک فیلد در بین تمام غذاها
  const aggregateValue = (field) => {
    let sum = 0;
    let count = 0;
    foodData.forEach((item) => {
      let value = item.data[field.key];
      if (value === undefined) {
        const altKey = field.key.replace(/-/g, "");
        value = item.data[altKey];
      }
      if (typeof value === "number") {
        sum += value;
        count++;
      }
    });
    return count > 0 ? sum.toFixed(2) : "N/A";
  };

  return (
    <div className="food-data">
      <h4>Nutrition Summary (Aggregated)</h4>
      <ul>
        {fields.map((field) => (
          <li key={field.key}>
            <strong>{field.label}:</strong> {aggregateValue(field)}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FoodDataDisplay;
