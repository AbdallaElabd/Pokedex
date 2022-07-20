const decimetersToCentimeters = (value: number) => value * 10;
const decimetersToMeters = (value: number) => value / 10;

export const formatHeight = (valueInDecimeters: number): string => {
  const inMeters = decimetersToMeters(valueInDecimeters);
  if (inMeters >= 1) return `${inMeters} m`;

  const inCentimeters = decimetersToCentimeters(valueInDecimeters);
  return `${inCentimeters} cm`;
};
