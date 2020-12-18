import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { LocalStrategy } from './local.strategy';
import { JwtStrategy } from './jwt.strategy';
import { AuthController } from './auth.controller';
import * as fs from 'fs';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from 'src/common/user/entities/user.entity';
import { SettingModule } from 'src/common/setting/setting.module';
import { ClientModule } from 'src/common/client/client.module';
import { UserModule } from 'src/common/user/user.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Users]),
    UserModule,
    SettingModule,
    ClientModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: fs.readFileSync(`${process.env.PRIVATE_KEY}`, 'utf8'),
      signOptions: {
        issuer: `${process.env.ISSUER}`,
        subject: `${process.env.SUBJECT}`,
        audience: `${process.env.AUDIENCE}`,
        expiresIn: "7d",
        algorithm: "RS256"
      },
    }),
  ],
  providers: [AuthService, LocalStrategy, JwtStrategy],
  exports: [AuthService],
  controllers: [AuthController]
})
export class AuthModule { }
