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
  label: string;
  icon: string;
  unit?: 'ft' | 'm' | 'cm' | 'amount' | 'size';
}

export const componentTypeConfigs: {
  [key in ComponentType]: ComponentTypeConfig;
} = {
  leather: {
    label: 'str.shoeComponent.types.leather.label',
    icon: 'layers',
    unit: 'ft',
  },
  last: {
    label: 'str.shoeComponent.types.last.label',
    icon: 'file-tray',
    unit: 'amount',
  },
  sole: {
    label: 'str.shoeComponent.types.sole.label',
    icon: 'footsteps',
    unit: 'amount',
  },
  productionInsole: {
    label: 'str.shoeComponent.types.productionInsole.label',
    icon: 'phone-landscape',
  },
  finishInsole: {
    label: 'str.shoeComponent.types.finishInsole.label',
    icon: 'phone-portrait',
  },
  backCounter: {
    label: 'str.shoeComponent.types.backCounter.label',
    icon: 'chevron-back',
  },
  laces: {
    label: 'str.shoeComponent.types.laces.label',
    icon: 'options',
    unit: 'cm',
  },
  frontlet: {
    label: 'str.shoeComponent.types.frontlet.label',
    icon: 'chevron-forward',
  },
  lining: {
    label: 'str.shoeComponent.types.lining.label',
    icon: 'unlink-outline',
  },
  heel: {
    label: 'str.shoeComponent.types.heel.label',
    icon: 'swap-vertical',
    unit: 'size',
  },
  ornament: {
    label: 'str.shoeComponent.types.ornament.label',
    icon: 'add',
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
