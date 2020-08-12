import { Injectable, HttpStatus } from '@nestjs/common';
import { HttpExceptionFilter } from '../filter/http-exception.filter';
import { MyLogger } from '../logger/logger.service';
import { DatetimeService } from '../helper/datetime.service';
const errorMsg = '../helpers/error-message.json';

@Injectable()
export class ResponseController extends HttpExceptionFilter {
  constructor(
    private readonly myLogger: MyLogger,
    private readonly datetime: DatetimeService
  ) {
    super()
  }

  private isEmpty(value: any) {
    if (Object.keys(value).length > 0) {
      return false;
    }
    return true;
  }

  public logData(options: any) {
    options.user = this.myLogger.log('USER ' + JSON.stringify(options.user), 'DataRequest');
    options.body = this.myLogger.log('DATA ' + JSON.stringify(options.data), 'DataRequest');
    options.id = this.myLogger.log('MODULE ' + JSON.stringify(options.id), 'DataRequest');
  }

  private async getErrMessage(code, lang: string = 'EN') {
    const items = await errorMsg['error100'];
    return items[`message${lang}`];
  }

  private async responseData(req, msgCode, status, items, total: any = 0, lang: string = 'EN', state = {}) {
    const message = await this.getErrMessage(msgCode, lang);
    this.myLogger.response(JSON.stringify(items), 'Response', req);
    return {
      status,
      timestamp: this.datetime.datetimeToServer(),
      path: req.path,
      method: req.method,
      message,
      displayTotal: items.length ? items.length : 1,
      total,
      state,
      items
    }
  }

  public async responseFindSuccess(req: any, res: any, items: any = [], total: any = 0, lang: string = 'EN') {
    return await res.status(HttpStatus.OK)
      .json(
        await this.responseData(req, (HttpStatus.OK ? 100 : 888), HttpStatus.OK, items, total, lang)
      )
  }

  public async responseFindOneSuccess(req: any, res: any, items: any, total: number = 0, lang: string = 'EN') {
    return res.status(HttpStatus.OK)
      .json(
        await this.responseData(req, (HttpStatus.OK ? 100 : 888), HttpStatus.OK, items, (!this.isEmpty(items) ? 1 : total))
      )
  }

  public async responseAuthSuccess(req: any, res: any, items: any, total: number = 0, lang: string = 'EN') {
    return res.status(HttpStatus.OK)
      .json(
        await this.responseData(req, (HttpStatus.OK ? 100 : 888), HttpStatus.OK, items, (!this.isEmpty(items) ? 1 : total))
      )
  }

  public async responseCreateSuccess(req: any, res: any, items: any, msgCode: number = 100, lang: string = 'EN') {
    return res.status(HttpStatus.CREATED)
      .json(
        await this.responseData(req, msgCode, HttpStatus.CREATED, items)
      )
  }

  public async responseUpdateSuccess(req: any, res: any, items: any, lang: string = 'EN') {
    return res.status(HttpStatus.OK)
      .json(
        await this.responseData(req, (HttpStatus.OK ? 100 : 300), HttpStatus.OK, items)
      )
  }

  public async responseDeleteSuccess(req: any, res: any, deleted: boolean = false, lang: string = 'EN') {
    return res.status(HttpStatus.NO_CONTENT)
      .json(
        await this.responseData(req, (deleted ? 100 : 400), HttpStatus.NO_CONTENT, deleted)
      )
  }
}
