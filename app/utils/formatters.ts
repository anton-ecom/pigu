export function formatPrice(value: unknown, decimal: number = 2): string {
  if (typeof value === "number") {
    return `$${value.toFixed(decimal)}`;
  } else if (typeof value === "string") {
    const parsedValue = parseFloat(value);
    return !isNaN(parsedValue)
      ? `$${parsedValue.toFixed(decimal)}`
      : "Invalid price";
  }
  return "N/A"; // Handle cases where value is null, undefined, or an unexpected type
}

export function formatNumber(value: unknown, decimal: number = 2): string {
  if (typeof value === "number") {
    return value.toFixed(decimal);
  } else if (typeof value === "string") {
    const parsedValue = parseFloat(value);
    return !isNaN(parsedValue)
      ? parsedValue.toFixed(decimal)
      : "Invalid number";
  }
  return "N/A"; // Handle cases where value is null, undefined, or an unexpected type
}
