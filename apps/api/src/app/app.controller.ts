import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
  @Get('status')
  getData(): object {
    return { message: 'Hello!' };
  }
}
