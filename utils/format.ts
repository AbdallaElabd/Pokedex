const hectogramsToGrams = (value: number) => value * 100;
const hectogramsToKilograms = (value: number) => value / 10;

export const formatWeight = (valueInHectograms: number): string => {
  const inKilograms = hectogramsToKilograms(valueInHectograms);
  if (inKilograms >= 1) return `${inKilograms} kg`;

  const inGrams = hectogramsToGrams(valueInHectograms);
  return `${inGrams} g`;
};

const decimetersToCentimeters = (value: number) => value * 10;
const decimetersToMeters = (value: number) => value / 10;

export const formatHeight = (valueInDecimeters: number): string => {
  const inMeters = decimetersToMeters(valueInDecimeters);
  if (inMeters >= 1) return `${inMeters} m`;

  const inCentimeters = decimetersToCentimeters(valueInDecimeters);
  return `${inCentimeters} cm`;
};
