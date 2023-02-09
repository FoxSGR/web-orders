import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppController } from './app.controller';
import { AppService } from './app.service';

import { environment } from '../environments/environment';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      // eslint-disable-next-line
      ...(environment.database as any),
      synchronize: !!environment.production,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
