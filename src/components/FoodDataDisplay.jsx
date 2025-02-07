// src/components/FoodDataDisplay.jsx
import React from "react";
import "./FoodDataDisplay.css";

const FoodDataDisplay = ({ foodData }) => {
  if (!foodData) return null;

  // Define a list of key nutrition facts to display
  const fields = [
    { key: "energy-kcal_value", label: "Energy (kcal)" },
    { key: "fat_value", label: "Fat (g)" },
    { key: "saturated-fat_value", label: "Saturated Fat (g)" },
    { key: "carbohydrates_value", label: "Carbs (g)" },
    { key: "sugars_value", label: "Sugars (g)" },
    { key: "proteins_value", label: "Proteins (g)" },
    { key: "salt_value", label: "Salt (g)" },
  ];

  const getValue = (field) => {
    if (foodData[field.key] !== undefined) {
      return foodData[field.key];
    }
    // fallback: remove hyphens if necessary
    const altKey = field.key.replace(/-/g, "");
    return foodData[altKey] !== undefined ? foodData[altKey] : "N/A";
  };

  return (
    <div className="food-data">
      <h4>Nutrition Summary</h4>
      <ul>
        {fields.map((field) => (
          <li key={field.key}>
            <strong>{field.label}:</strong> {getValue(field)}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FoodDataDisplay;
