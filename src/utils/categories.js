export const categories = [
  { name: "Food", icon: "🍔" },
  { name: "Transport", icon: "🚗" },
  { name: "Housing", icon: "🏠" },
  { name: "Entertainment", icon: "🎬" },
  { name: "Shopping", icon: "🛍️" },
  { name: "Health", icon: "🏥" },
  { name: "Travel", icon: "✈️" },
  { name: "Education", icon: "📚" },
  { name: "Other", icon: "💳" },
];

export function getCategoryIcon(category, type) {
  if (type === "income") return "💼";

  return (
    categories.find((item) => item.name === category)?.icon || "💳"
  );
}