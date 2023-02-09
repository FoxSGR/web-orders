import { IUserDTO } from '@web-orders/api-interfaces';
import { EntityDTO } from '../shared/entity/entity.dto';

export class UserDTO extends EntityDTO implements IUserDTO {
  email: string;
  firstName: string;
  lastName: string;
  roles: string[];
  resourcesFolder: string;
}
