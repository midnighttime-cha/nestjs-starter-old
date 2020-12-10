import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ResponseModule } from './shared/response/response.module';
import { HelperModule } from './shared/helper/helper.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      name: "default",
      type: "postgres", //type => '"mysql" | "mariadb" | "postgres" | "cockroachdb" | "sqlite" | "mssql" | "sap" | "oracle" | "cordova" | "nativescript" | "react-native" | "sqljs" | "mongodb" |
      host: process.env.DB_HOST,
      port: 5432,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      schema: process.env.DB_SCHEMA,
      entities: [
        "dist/**/**/**/*.entity{.ts,.js}"
      ],
      synchronize: false,
      logging: true
    }),
    ResponseModule, HelperModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
