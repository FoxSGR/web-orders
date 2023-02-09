import { Module } from '@nestjs/common';

import { UILogController } from './ui-log.controller';
import { UILogMapper } from './ui-log.mapper';
import { UILogService } from './ui-log.service';

@Module({
  controllers: [UILogController],
  exports: [UILogMapper, UILogService],
  providers: [UILogMapper, UILogService],
})
export class UILogModule {}
