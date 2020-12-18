import { Injectable, HttpException, HttpStatus, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Brackets, Raw, Like } from 'typeorm';
import { AddressBaskets } from 'src/common/basket/entities/address-basket.entity';
import * as bcrypt from 'bcryptjs';
import { AddressBasketService } from 'src/common/basket/address-basket/address-basket.service';
import { Users } from '../entities/user.entity';
import { UserDTO, UserRegisterDTO, UserRO } from '../dto/user.dto';
import { UserAuthDTO } from '../dto/user-auth.dto';
import { DatetimeService } from 'src/shared/helper/datetime.service';
import { Settings } from 'src/common/setting/entities/setting.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(Users) private readonly mainRepositories: Repository<Users>,
    private readonly addressService: AddressBasketService,
    private readonly datetime: DatetimeService
  ) { }

  // Method : GET
  async findData(type: string, filters: any = null, pages: any = null, actived: boolean = true, lang = '', payload = null) {
    try {
      let filterObj = {};
      let where = {};

      if (typeof filters.actived === 'undefined') {
        Object.assign(where, { isActive: true });
      }

      if (filters) {
        for (var key in filters) {
          if (key != 'text' && key != 'actived' && filters[`${key}`] != '') {
            where[`${key}`] = filters[`${key}`];
          }
        }
      }

      if (filters.text !== '' && typeof filters.text !== 'undefined') {
        Object.assign(where, {
          companies: {
            nameTH: Like(`'%${filters.text}%'`),
            nameEN: Like(`'%${filters.text}%'`),
            nameCN: Like(`'%${filters.text}%'`),
          }
        });
      }

      if (pages) {
        Object.assign(filterObj, {
          skip: pages.start,
          take: pages.limit
        })
      }

      const total = await this.mainRepositories.count({ ...filterObj, where });

      let items;
      if (type === 'ONE') {
        const getItems = await this.mainRepositories.findOne({ ...filterObj, where });
        items = await getItems.toResponseObject();
      } else {
        const getItems = await this.mainRepositories.find({ ...filterObj, where, order: { id: "DESC" } });
        items = await getItems.map(element => element.toResponseObject());
      }

      return await { total, items };
    } catch (error) {
      throw new HttpException(`[findData] ${error.message}`, HttpStatus.BAD_REQUEST);
    }
  }

  async userValidate(data: UserAuthDTO, lang: string = ''): Promise<UserRO> {
    try {
      const { username, password } = data;

      const users = await this.mainRepositories.findOne({
        where: { isDelete: false, username }
      })

      if (!users || (!await users.comparePassword(password))) {
        throw new HttpException("Invalid username/password.", HttpStatus.BAD_REQUEST);
      }
      return await users.toResponseObject(true, lang, true);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }




  // Method POST
  async create(payloadId: number, data: UserDTO): Promise<UserRO> {
    try {
      const maindata = await this.mainRepositories.create({ ...data, createBy: payloadId, modifyBy: payloadId });
      await this.mainRepositories.save(maindata);

      return maindata.toResponseObject();
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }

  // Method POST
  async register(data: UserRegisterDTO) {
    try {
      const items = await this.mainRepositories.create(data);
      await this.mainRepositories.save(items);
      return items.toResponseObject(false);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }




  // PUT Menthod
  async update(payloadId: number, id: number, data: UserDTO): Promise<UserRO> {
    try {
      const { password } = data;
      delete data.password;

      if (password) {
        Logger.log(password, "hashpass")
        const hashpass = await bcrypt.hash(password, 10);
        Object.assign(data, { password: hashpass });
      }

      await this.mainRepositories.update({ id }, { ...data, modifyBy: payloadId });

      const items = await this.mainRepositories.findOne({ id });

      return items.toResponseObject(false, "", false);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async isActive(id: number, status: boolean, payloadId: number) {
    try {
      await this.mainRepositories.update({ id }, { isActive: status, modifyBy: payloadId });
      return { accepted: true };
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }

  async delete(id: number, payloadId: number) {
    try {
      await this.mainRepositories.update({ id }, { isDelete: true, modifyBy: payloadId });
      return { deleted: true };
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }
}
