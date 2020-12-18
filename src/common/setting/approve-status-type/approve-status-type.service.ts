import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Brackets } from 'typeorm';
import { ApproveStatusTypes } from '../entities/approve-status-type.entity';

@Injectable()
export class ApproveStatusTypeService {
  constructor(
    @InjectRepository(ApproveStatusTypes) private readonly mainRepositories: Repository<ApproveStatusTypes>,
  ) { }

  // Method : GET
  async findData(filters: any = null, pages: any = null, actived: boolean = true, lang = '') {
    try {
      let items: any;
      const conditions = await this.condition(filters, pages, actived);

      items = await conditions
        .orderBy({ "A.id": "ASC" })
        .getMany();

      if (lang != '') {
        items = await items ? items.map(element => {
          return {
            id: element.id,
            receiptId: element.receiptId,
            productId: element.productId,
            partnerId: element.partnerId,
            sizeId: element.sizeId,
            unitId: element.unitId,
            weightPerUnit: element.weightPerUnit,
            cost: element.cost,
            price: element.price,
            totalQty: element.totalQty,
            balanceQty: element.balanceQty,
            remark: element.remark,
          }
        }) : []
      }

      const total = await this.countData();

      return { items, total };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async findOneData(filters: any = null, pages: any = null, actived: boolean = true, lang = '') {
    try {
      let items: any;
      const conditions = await this.condition(filters, pages, actived);

      items = await conditions.getOne();

      if (lang != '') {

        items = await items ? {
          id: items.id,
          receiptId: items.receiptId,
          productId: items.productId,
          partnerId: items.partnerId,
          sizeId: items.sizeId,
          unitId: items.unitId,
          weightPerUnit: items.weightPerUnit,
          cost: items.cost,
          price: items.price,
          totalQty: items.totalQty,
          balanceQty: items.balanceQty,
          remark: items.remark,
        } : {};
      }

      const total = await this.countData();

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
      .where("A.isDelete = :isDelete", { isDelete: false });

    if (actived && filters.actived !== 'all') {
      await conditions.andWhere("A.isActive = :isActive", { isActive: actived });
    }

    if (filters.text !== '' && typeof filters.text !== 'undefined') {
      await conditions.andWhere(new Brackets(qb => {
        qb.andWhere(`A.nameTH LIKE '%${filters.text}%'`)
          .orWhere(`A.nameEN LIKE '%${filters.text}%'`)
          .orWhere(`A.nameCN LIKE '%${filters.text}%'`)
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
  async create(payloadId: number, data) {
    try {
      const created = await this.mainRepositories.create({ ...data, createBy: payloadId, modifyBy: payloadId });
      await this.mainRepositories.save(created);
      return await created;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }



  // Method PUT
  async update(payloadId: number, id: number, data) {
    try {
      await this.mainRepositories.update({ id }, { ...data, modifyBy: payloadId });
      const items = await this.mainRepositories.findOne(id);
      return await items;
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
