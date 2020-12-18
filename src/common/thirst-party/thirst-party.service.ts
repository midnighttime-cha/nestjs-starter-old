import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Raw, Repository } from 'typeorm';
import { ThirstPartyDTO } from './dto/thirst-party.dto';
import { ThirstParties } from './entities/thirst-party.entity';

@Injectable()
export class ThirstPartyService {
  constructor(
    @InjectRepository(ThirstParties) private readonly mainRepositories: Repository<ThirstParties>,
  ) { }

  // Method : GET
  async findData(type: string, filters: any = null, pages: any = null, actived: boolean = true, lang = '') {
    try {
      let filterObj = {};
      let where = {};

      if (typeof filters.actived === 'undefined') {
        Object.assign(where, { isActive: true });
      }

      if (filters) {
        for (var key in filters) {
          if (key != 'text' && key != 'actived' && filters[`${key}`] != '' && key != 'monthYear') {
            where[`${key}`] = filters[`${key}`];
          }
        }
      }

      if (typeof filters.monthYear !== 'undefined') {
        Object.assign(where, { date: Raw(alias => `SUBSTR(${alias}, 1, 7) = '${filters.monthYear}'`) });
      }

      if (filters.text !== '' && typeof filters.text !== 'undefined') {
        Object.assign(where, {
          name: Like(`'%${filters.text}%'`),
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




  // Methode POST
  async create(payloadId: number, data: ThirstPartyDTO) {
    try {
      const created = await this.mainRepositories.create({ ...data, createBy: payloadId, modifyBy: payloadId });
      await this.mainRepositories.save(created);
      return await created.toResponseObject();
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }



  // Method PUT
  async update(payloadId: number, id: number, data: ThirstPartyDTO) {
    try {
      await this.mainRepositories.update({ id }, { ...data, modifyBy: payloadId });
      return await (await this.mainRepositories.findOne(id)).toResponseObject();
    } catch (error) {
      throw new HttpException(`[Update data] ${error.message}`, HttpStatus.BAD_REQUEST);
    }
  }

  async isActive(id: number, status: boolean, payloadId: number) {
    try {
      await this.mainRepositories.update({ id }, { isActive: status, modifyBy: payloadId });
      return await { accepted: true };
    } catch (error) {
      throw new HttpException(`[Active data] ${error.message}`, HttpStatus.BAD_REQUEST);
    }
  }




  // Method DELETE
  async delete(id: number, payloadId: number) {
    try {
      await this.mainRepositories.update({ id }, { isDelete: true, modifyBy: payloadId });
      return await { deleted: true };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
}
