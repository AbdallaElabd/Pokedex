const hectogramsToGrams = (value: number) => value * 100;
const hectogramsToKilograms = (value: number) => value / 10;

export const formatWeight = (valueInHectograms: number): string => {
  const inKilograms = hectogramsToKilograms(valueInHectograms);
  if (inKilograms >= 1) return `${inKilograms} kg`;

  const inGrams = hectogramsToGrams(valueInHectograms);
  return `${inGrams} g`;
};
