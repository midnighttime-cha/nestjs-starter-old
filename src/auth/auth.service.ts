import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { UserService } from '../common/user/user/user.service';
import { UserAuthDTO } from 'src/common/user/dto/user-auth.dto';
import { SystemService } from 'src/common/setting/system/system.service';
import { UserRO } from 'src/common/user/dto/user.dto';
import bcrypt = require('bcryptjs');
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from 'src/common/user/entities/user.entity';
import { Repository } from 'typeorm';
import { error } from 'console';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Users) private readonly mainRepositories: Repository<Users>,
    private readonly usersService: UserService,
    private readonly settingService: SystemService
  ) { }

  async validateUser(username: string, pass: string): Promise<any> {
    const { items } = await this.usersService.findData('ONE', { username }, null, true, 'TH');
    if (username && (await items.comparePassword(pass))) {
      const { password, ...result } = items;
      return result;
    }
    return null;
  }

  async login(data: UserAuthDTO, lang: string = ''): Promise<UserRO> {
    try {
      const { items } = await this.usersService.findData('ONE', { username: data.username }, null, true, 'TH');
      Logger.log(items, "items");
      if (items || (this.comparePassword(data.password, items.password))) {
        Logger.log(items, "items");
        delete items.password;
        if (!items.settings) {
          items.settings = await this.settingService.findData('ONE', { default: true }, null, true, lang);
        }
        return items;
      }
      return null;
    } catch (error) {
      throw new HttpException(`${error.message}`, HttpStatus.BAD_REQUEST);
    }
  }

  private comparePassword(attempt: string, password: string) {
    return bcrypt.compare(attempt, password);
  }
}