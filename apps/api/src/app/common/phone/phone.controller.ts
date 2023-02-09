import { Controller, Get } from '@nestjs/common';

import { PhoneService } from './phone.service';
import { AbstractController } from '../../shared';

@Controller('/common/phone')
export class PhoneController extends AbstractController {
  constructor(private phoneService: PhoneService) {
    super();
  }

  @Get('intl-configs')
  getIntlConfigs() {
    return this.toResponse(this.phoneService.getIntlConfigs());
  }
}
