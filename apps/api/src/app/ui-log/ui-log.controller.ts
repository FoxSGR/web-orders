import { Body, Controller, Post } from '@nestjs/common';

import { UILogService } from './ui-log.service';
import { UILogMapper } from './ui-log.mapper';
import { UILogDTO } from './ui-log.dto';
import { CurrentUser } from '../common';
import { IUser } from '../user';

@Controller('/ui-log')
export class UILogController {
  constructor(private service: UILogService, private mapper: UILogMapper) {}

  @Post()
  public async create(
    @CurrentUser() user: IUser,
    @Body() body: UILogDTO,
  ): Promise<any> {
    return ['ok'];
  }
}
