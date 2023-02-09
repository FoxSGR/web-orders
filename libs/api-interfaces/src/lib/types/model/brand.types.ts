import { IEntityDTO } from './entity.types';

export const brandScopes = ['universal', 'client'] as const;

export type BrandScope = typeof brandScopes[number];

export interface IBrandDTO extends IEntityDTO {
  name: string;
  scope: BrandScope;
  notes?: string;
}
