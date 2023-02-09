import { INestApplicationContext, Logger } from '@nestjs/common';

export abstract class CliService {
  protected logger = new Logger(this.constructor.name);

  set application(value: INestApplicationContext) {
    this._application = value;
  }

  protected _application: INestApplicationContext;

  abstract run(): Promise<void>;
}
