import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ResponseModule } from './shared/response/response.module';
import { HelperModule } from './shared/helper/helper.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InsuranceModule } from './business/insurance/insurance.module';
import { AuthModule } from './auth/auth.module';
import { FlightModule } from './business/flight/flight.module';
import { ThirstPartyModule } from './common/thirst-party/thirst-party.module';
import { HotelModule } from './business/hotel/hotel.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      name: "default",
      type: "postgres",
      host: process.env.DB_HOST,
      port: 5432,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      schema: process.env.DB_SCHEMA,
      entities: [
        "dist/**/**/**/*.entity{.ts,.js}"
      ],
      synchronize: true,
      logging: true
    }),
    AuthModule,
    ResponseModule,
    HelperModule,
    InsuranceModule,
    FlightModule,
    ThirstPartyModule,
    HotelModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
