import { Injectable } from '@nestjs/common';

import { Mapper } from '../common';
import { IColor } from './color.types';
import { ColorDTO } from './color.dto';

@Injectable()
export class ColorMapper extends Mapper<IColor, ColorDTO> {
  bodyToEntity(body: ColorDTO): Partial<IColor> {
    return {
      name: body.name,
      red: body.red,
      green: body.green,
      blue: body.green,
    };
  }

  entityToResponse(color: IColor): ColorDTO {
    return {
      id: color.id,
      name: color.name,
      red: color.red,
      green: color.green,
      blue: color.blue,
    };
  }
}
