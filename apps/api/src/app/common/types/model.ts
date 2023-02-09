export const seasonTypes = ['fall_winter', 'spring_summer'] as const;

export type SeasonType = typeof seasonTypes[number];

export interface ISeason {
  year: number;
  seasons: SeasonType;
}

export interface IPhoto {
  path: string;
  mimeType: string;
}
