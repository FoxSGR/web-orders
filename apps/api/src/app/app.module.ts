import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ServeStaticModule } from '@nestjs/serve-static';
import * as path from 'path';

import { environment } from '../environments/environment';

import { CommonModule } from './common/common.module';
import { Address, AddressModule } from './address';
import { Agent, AgentModule } from './agent';
import { AuthModule } from './auth/auth.module';
import { Brand, BrandModule } from './brand';
import { Client, ClientModule } from './client';
import { Color, ColorModule } from './color';
import { ShoeComponent, ShoeComponentModule } from './shoe-component';
import { ShoeOrder, ShoeOrderModule } from './shoe-order';
import { ShoeModel, ShoeModelModule } from './shoe-model';
import { ShoeModelComponent } from './shoe-model/shoe-model-component';
import { ShoeSample, ShoeSampleModule } from './shoe-sample';
import { UILogModule } from './ui-log';
import { User, UserModule } from './user';
import { ResourcesModule } from './resources/resources.module';

import { SeedService } from './shared/service';

import { AppController } from './app.controller';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: path.join('.', 'resources'),
      serveRoot: '/resources',
      renderPath: '/resources',
    }),
    TypeOrmModule.forRoot({
      // eslint-disable-next-line
      ...(environment.database as any),
      synchronize: !environment.production,
      entities: [
        Address,
        Agent,
        Brand,
        Client,
        Color,
        ShoeComponent,
        ShoeOrder,
        ShoeModel,
        ShoeModelComponent,
        ShoeSample,
        User,
      ],
    }),
    CommonModule,
    AddressModule,
    AgentModule,
    AuthModule,
    BrandModule,
    ClientModule,
    ColorModule,
    ShoeComponentModule,
    ShoeOrderModule,
    ShoeModelModule,
    ShoeSampleModule,
    UILogModule,
    UserModule,
    ResourcesModule,
  ],
  controllers: [AppController],
  providers: [SeedService],
})
export class AppModule {}
