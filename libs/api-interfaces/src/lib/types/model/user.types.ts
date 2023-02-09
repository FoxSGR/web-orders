import { IEntityDTO } from './entity.types';

export interface IUserDTO extends IEntityDTO {
  email: string;
  firstName: string;
  lastName: string;
  roles: string[];
  resourcesFolder: string;
}
