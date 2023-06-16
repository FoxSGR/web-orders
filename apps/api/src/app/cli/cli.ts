import { NestFactory } from '@nestjs/core';
import { INestApplicationContext, Logger } from '@nestjs/common';

import { AppModule } from '../app.module';
import { SeedService } from '../shared/service';
import { CliRegister } from './cli.register';
import { CliService } from './cli.service';

const runCommand = async (
  application: INestApplicationContext,
  logger: Logger,
  args: string[],
) => {
  const clazz = CliRegister.get(args[0]);
  if (!clazz) {
    logger.error('Command not found');
    process.exit(1);
  }

  const service: CliService = application.get(SeedService);
  service.application = application;
  await service.run();
};

const bootstrap = async () => {
  const application = await NestFactory.createApplicationContext(AppModule);
  const logger = new Logger('CLI');

  try {
    await runCommand(
      application,
      logger,
      process.argv.slice(2, process.argv.length),
    );
    await application.close();
    process.exit(0);
  } catch (e) {
    logger.error('Error while executing command', e.stack);
    await application.close();
    process.exit(-1);
  }
};

bootstrap();
