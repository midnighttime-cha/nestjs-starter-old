import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from 'src/common/user/entities/user.entity';
import { UserTitlenames } from 'src/common/user/entities/user-titlename.entity';
import { UserGroups } from './entities/user-group.entity';
import { Settings } from '../setting/entities/setting.entity';
import { BasketModule } from '../basket/basket.module';
import { AddressBaskets } from '../basket/entities/address-basket.entity';
import { UserController } from './user/user.controller';
import { UserService } from './user/user.service';

@Module({
  imports: [TypeOrmModule.forFeature([Users, UserTitlenames, AddressBaskets, UserGroups, Settings]), BasketModule],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService]
})
export class UserModule { }
