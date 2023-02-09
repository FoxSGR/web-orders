import { IEntityDTO } from '.';

/**
 * Types of component.
 */
export const componentTypes = [
  'last',
  'heel',
  'sole',
  'productionInsole',
  'finishInsole',
  'backCounter',
  'laces',
  'frontlet',
  'lining',
  'leather',
  'ornament',
] as const;

/**
 * Type of component.
 */
export type ComponentType = typeof componentTypes[number];

/**
 * Type of ornament component.
 */
export const ornamentTypes = ['buckle', 'zip'] as const;

export type OrnamentType = typeof ornamentTypes[number];

/**
 * Shoe component DTO.
 */
export interface IShoeComponentDTO extends IEntityDTO {
  reference: string;
  name?: string;
  type: ComponentType;
  ornamentType?: OrnamentType;
}
