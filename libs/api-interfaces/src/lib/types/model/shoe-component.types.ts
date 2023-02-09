import { IEntityDTO } from './entity.types';

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

export interface ComponentTypeConfig {
  unit?: 'ft' | 'm' | 'cm' | 'amount' | 'size';
}
export const componentTypeConfigs: {
  [key in ComponentType]: ComponentTypeConfig;
} = {
  last: {
    unit: 'amount',
  },
  leather: {
    unit: 'ft',
  },
  sole: {
    unit: 'amount',
  },
  productionInsole: {},
  finishInsole: {},
  backCounter: {},
  laces: {
    unit: 'cm',
  },
  frontlet: {},
  lining: {},
  heel: {
    unit: 'size',
  },
  ornament: {
    unit: 'amount',
  },
};

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
