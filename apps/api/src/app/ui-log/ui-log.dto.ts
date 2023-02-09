import { EntityDTO } from '../shared/entity/entity.dto';
import { UILogType } from './ui-log.types';

export class UILogDTO extends EntityDTO {
  message: string;
  stack: string;
  type: UILogType;
}
