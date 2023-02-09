import { IEntityDTO } from '.';

export interface IUserDTO extends IEntityDTO {
  email: string;
  firstName: string;
  lastName: string;
  roles: string[];
}
