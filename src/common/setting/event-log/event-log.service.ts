import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DatetimeService } from 'src/shared/helper/datetime.service';
import { Repository, Brackets } from 'typeorm';
import { EventLogDTO } from '../dto/event-log.dto';
import { EventLogs } from '../entities/event-log.entity';

@Injectable()
export class EventLogService {
  constructor(
    @InjectRepository(EventLogs) private readonly mainRepositories: Repository<EventLogs>,
    private readonly datetime: DatetimeService
  ) { }

  async findData(type: string, filters: any = null, pages: any = null, lang = '') {
    try {
      let result: any;
      const conditions = await this.condition(filters, pages);

      if (type === 'ONE') {
        result = await conditions.getOne();
        if (lang != '') {
          result = await result ? this.dataMapper(result, lang) : {};
        }
      } else {
        result = await conditions
          .orderBy({ "A.id": "DESC" })
          .getMany();

        if (lang != '') {
          result = await result ? result.map(element => this.dataMapper(element, lang)) : []
        }
      }

      const total = await conditions.getCount();

      return { items: result, total };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  private dataMapper(items, lang: string) {
    return {
      id: items.id,
      timestamp: this.datetime.format('YYYY-MM-DD H:i:s', items.timestamp),
      ip: items.ip,
      method: items.method,
      path: items.path,
      requestPayload: items.requestPayload,
      querystring: items.querystring,
      origin: items.origin,
      users: items.users ? `${items.users[`firstname${lang}`]} ${items.users[`lastname${lang}`]}` : "",
    }
  }

  async condition(filters: any = null, pages: any = null) {
    let searchs = "";
    if (filters) {
      for (var key in filters) {
        if (key != 'text' && key != 'actived' && filters[`${key}`] != '' && key != 'code') {
          if (searchs.length > 0) searchs += " AND ";
          searchs += `A.${key} = '${filters[key]}'`;
        }
      }
    }

    const conditions = await this.mainRepositories
      .createQueryBuilder("A")
      .leftJoinAndSelect("A.users", "B")
      .where("A.id <> 0");

    if (filters.text !== '' && typeof filters.text !== 'undefined') {
      await conditions.andWhere(new Brackets(qb => {
        qb.andWhere(`A.ip ILIKE '%${filters.text}%'`)
          .orWhere(`A.path ILIKE '%${filters.text}%'`)
          .orWhere(`A.requestPayload ILIKE '%${filters.text}%'`)
          .orWhere(`A.origin ILIKE '%${filters.text}%'`)
          .orWhere(`B.firstnameTH ILIKE '%${filters.text}%'`)
          .orWhere(`B.lastnameTH ILIKE '%${filters.text}%'`)
          .orWhere(`B.firstnameEN ILIKE '%${filters.text}%'`)
          .orWhere(`B.lastnameEN ILIKE '%${filters.text}%'`)
          .orWhere(`B.firstnameCN ILIKE '%${filters.text}%'`)
          .orWhere(`B.lastnameCN ILIKE '%${filters.text}%'`)
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




  // Method POST
  async create(payloadId: number, data: EventLogDTO) {
    try {
      if (payloadId > 0) {
        data.userId = payloadId;
      }
      const created = await this.mainRepositories.create(data);
      await this.mainRepositories.save(created);
      return await created;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
}
