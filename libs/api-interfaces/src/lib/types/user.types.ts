import { IEntityDTO } from '@web-orders/api-interfaces';

export interface IUserDTO extends IEntityDTO {
  email: string;
  firstName: string;
  lastName: string;
  roles: string[];
}
