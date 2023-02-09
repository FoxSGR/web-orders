import { Injectable } from '@nestjs/common';

import { IUILog } from './ui-log.types';
import { UILogDTO } from './ui-log.dto';
import { EntityMapper } from '../common/entity/entity.mapper';

@Injectable()
export class UILogMapper extends EntityMapper<IUILog, UILogDTO> {
  bodyToEntity(body: UILogDTO): Partial<IUILog> {
    return {
      message: body.message,
      stack: body.stack,
      type: body.type,
    };
  }

  entityToResponse(uiLog: IUILog): Partial<UILogDTO> {
    return {
      ...super.entityToResponse(uiLog),
      message: uiLog.message,
      stack: uiLog.stack,
      type: uiLog.type,
    };
  }
}
