import { EntityDTO } from '../common/entity/entity.dto';

export class UserDTO extends EntityDTO {
  email: string;
  firstName: string;
  lastName: string;
  roles: string[];
}
