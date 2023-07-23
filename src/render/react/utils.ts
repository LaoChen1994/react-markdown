export function capitalizeFirstLetter(str: string) {
  if (typeof str !== "string" || str.length === 0) {
    return str; // If the input is not a non-empty string, return as it is
  }

  return str.charAt(0).toUpperCase() + str.slice(1);
}