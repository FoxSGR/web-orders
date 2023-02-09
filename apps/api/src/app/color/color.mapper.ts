import { Injectable } from '@nestjs/common';

import { IColor } from './color.types';
import { ColorDTO } from './color.dto';
import { EntityMapper } from '../shared/entity/entity.mapper';

@Injectable()
export class ColorMapper extends EntityMapper<IColor, ColorDTO> {
  bodyToEntity(body: ColorDTO): Partial<IColor> {
    return {
      name: body.name,
      color: body.color,
    };
  }

  entityToResponse(color: IColor): Partial<ColorDTO> {
    return {
      ...super.entityToResponse(color),
      name: color.name,
      color: color.color,
    };
  }
}
