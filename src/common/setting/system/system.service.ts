import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Brackets } from 'typeorm';
import { SettingRO, SettingDTO } from 'src/common/setting/dto/setting.dto';
import { Settings } from '../entities/setting.entity';

@Injectable()
export class SystemService {
  constructor(
    @InjectRepository(Settings) private readonly mainRepositories: Repository<Settings>
  ) { }

  async findData(type: string, filters: any = null, pages: any = null, actived: boolean = true, lang = '') {
    try {
      let items: any;
      const conditions = await this.condition(filters, pages, actived);

      items = await conditions.getOne();
      items = await items.toResponseObject(lang);

      const total = await conditions.getCount();

      return { items, total };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async condition(filters: any = null, pages: any = null, actived: boolean = true) {
    let searchs = "";

    if (typeof filters.actived === 'undefined') Object.assign(filters, { actived: '' })

    if (filters) {
      for (var key in filters) {
        if (key != 'text' && key != 'actived' && filters[`${key}`] != '') {
          if (searchs.length > 0) searchs += " AND ";
          searchs += `A.${key} = '${filters[key]}'`;
        }
      }
    }

    const conditions = await this.mainRepositories
      .createQueryBuilder("A")
      .leftJoinAndSelect("A.languages", "C")
      .where("A.isDelete = :isDelete", { isDelete: false });

    if (actived && filters.actived !== 'all') {
      await conditions.andWhere("A.isActive = :isActive", { isActive: actived });
    }

    if (filters.text !== '' && typeof filters.text !== 'undefined') {
      await conditions.andWhere(new Brackets(qb => {
        qb.andWhere(`A.titleTH LIKE '%${filters.text}%'`)
          .orWhere(`A.titleEN LIKE '%${filters.text}%'`)
          .orWhere(`A.titleCN LIKE '%${filters.text}%'`)
          .orWhere(`A.orgNameTH LIKE '%${filters.text}%'`)
          .orWhere(`A.orgNameEN LIKE '%${filters.text}%'`)
          .orWhere(`A.orgNameCN LIKE '%${filters.text}%'`)
          .orWhere(`A.orgPrefixnameTH LIKE '%${filters.text}%'`)
          .orWhere(`A.orgPrefixnameEN LIKE '%${filters.text}%'`)
          .orWhere(`A.orgPrefixnameCN LIKE '%${filters.text}%'`);
      }))
    }

    if (searchs !== '') {
      await conditions.andWhere(searchs);
    }

    if (pages) {
      await conditions.skip(pages.start).take(pages.limit);
    }

    return await conditions;
  }

  async countData() {
    return await this.mainRepositories.count();
  }

  // Methode POST
  async create(payloadId: number, data: SettingDTO): Promise<SettingRO> {
    try {
      const created = await this.mainRepositories.create({ ...data, createBy: payloadId, modifyBy: payloadId });
      await this.mainRepositories.save(created);
      return await created.toResponseObject();
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }



  // Method PUT
  async update(payloadId: number, id: number, data: SettingDTO): Promise<SettingRO> {
    try {
      await this.mainRepositories.update({ id }, { ...data, modifyBy: payloadId });
      const items = await this.mainRepositories.findOne(id);
      return await items.toResponseObject();
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async isActive(id: number, status: boolean, payloadId: number) {
    try {
      await this.mainRepositories.update({ id }, { isActive: status, modifyBy: payloadId });
      return await { accepted: true };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
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
