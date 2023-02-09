import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { environment } from '../environments/environment';

import { CommonModule } from './common/common.module';
import { Address, AddressModule } from './address';
import { Agent, AgentModule } from './agent';
import { AuthModule } from './auth/auth.module';
import { Brand, BrandModule } from './brand';
import { Client, ClientModule } from './client';
import { Color, ColorModule } from './color';
import { ShoeComponent, ShoeComponentModule } from './shoe-component';
import { ShoeModel, ShoeModelModule } from './shoe-model';
import { ShoeModelComponent } from './shoe-model/shoe-model-component';
import { ShoeOrder, ShoeOrderModule } from './shoe-order';
import { ShoeSample, ShoeSampleModule } from './shoe-sample';
import { UILogModule } from './ui-log';
import { User, UserModule } from './user';

import { SeedService } from './shared/service';

import { AppController } from './app.controller';

@Module({
  imports: [
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
  ],
  controllers: [AppController],
  providers: [SeedService],
})
export class AppModule {}
