import { Injectable } from '@nestjs/common';

import { IColor } from './color.types';
import { ColorDTO } from './color.dto';
import { EntityMapper } from '../common/entity/entity.mapper';

@Injectable()
export class ColorMapper extends EntityMapper<IColor, ColorDTO> {
  bodyToEntity(body: ColorDTO): Partial<IColor> {
    return {
      name: body.name,
      red: body.red,
      green: body.green,
      blue: body.green,
    };
  }

  entityToResponse(color: IColor): Partial<ColorDTO> {
    return {
      ...super.entityToResponse(color),
      name: color.name,
      red: color.red,
      green: color.green,
      blue: color.blue,
    };
  }
}
