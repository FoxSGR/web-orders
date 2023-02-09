export const seasonTypes = ['fall_winter', 'spring_summer'] as const;

export type SeasonType = typeof seasonTypes[number];

export interface IPhoto {
  path: string;
  mimeType: string;
}
