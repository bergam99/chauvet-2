export function safeParseFloat(value: string | null): number | null {
  if (value === null) return null; // Early return if value is null
  const parsed = parseFloat(value);
  const parsedNoDecimal = parsed / 100;
  return isNaN(parsedNoDecimal) ? null : parsedNoDecimal; // Check for NaN and return null if invalid
}
