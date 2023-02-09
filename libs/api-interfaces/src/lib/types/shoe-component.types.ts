import { IEntityDTO } from '@web-orders/api-interfaces';

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
  'zip',
  'leather',
  'ornament',
] as const;

export type ComponentType = typeof componentTypes[number];

export interface IShoeComponentDTO extends IEntityDTO {
  name: string;
  type: ComponentType;
}
