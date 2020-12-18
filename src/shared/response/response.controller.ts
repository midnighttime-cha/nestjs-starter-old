import { Injectable, HttpStatus, Logger } from '@nestjs/common';
import { HttpExceptionFilter } from '../filter/http-exception.filter';
import { MyLogger } from '../logger/logger.service';
import { EventLogService } from 'src/common/setting/event-log/event-log.service';
import * as jwt from 'jsonwebtoken';
import { DatetimeService } from '../helper/datetime.service';

@Injectable()
export class ResponseController extends HttpExceptionFilter {
  constructor(
    private readonly myLogger: MyLogger,
    private readonly datetime: DatetimeService,
    private readonly eventLogService: EventLogService
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
    this.myLogger.log('USER ' + JSON.stringify(options), 'DataRequest');
    this.myLogger.log('DATA ' + JSON.stringify(options.data), 'DataRequest');
    this.myLogger.log('MODULE ' + JSON.stringify(options.id), 'DataRequest');
  }

  private async getErrMessage(code, lang: string = 'EN') {
    const items = this.errorMsg(code);
    if (items) {
      return items[`message${lang}`];
    }
  }

  private async responseData(req, msgCode, status, items, total: any = 0, lang: string = 'EN', state = {}, sumary = null) {
    const message = await this.getErrMessage(msgCode, lang);
    const responseItems = {
      status,
      timestamp: this.datetime.format('YYYY-MM-DD H:i:s'),
      path: req.path,
      method: req.method,
      message,
      displayTotal: items.length ? items.length : 1,
      total,
      state,
      items
    };
    if (sumary) Object.assign(responseItems, { sumary });
    return responseItems;
  }

  public async responseFindSuccess(req: any, res: any, items: any = [], total: any = 0, lang: string = 'EN', sumary = null) {
    return await res.status(HttpStatus.OK)
      .json(
        await this.responseData(req, (HttpStatus.OK ? 100 : 888), HttpStatus.OK, items, total, lang, {}, sumary)
      )
  }

  public async responseFindOneSuccess(req: any, res: any, items: any, total: number = 0, lang: string = 'EN', sumary = null) {
    return res.status(HttpStatus.OK)
      .json(
        await this.responseData(req, (HttpStatus.OK ? 100 : 888), HttpStatus.OK, items, (!this.isEmpty(items) ? 1 : total), lang, {}, sumary)
      )
  }

  public async responseAuthSuccess(req: any, res: any, items: any, total: number = 0, lang: string = 'EN') {
    if (!this.isEmpty(items)) {
      await this.addEventLog(req, items.access_token);
    }
    return res.status(HttpStatus.CREATED)
      .json(
        await this.responseData(req, 100, HttpStatus.CREATED, items, (!this.isEmpty(items) ? 1 : total), lang)
      )
  }

  public async responseCreateSuccess(req: any, res: any, items: any, msgCode: number = 100) {
    if (req.headers.authorization) {
      await this.addEventLog(req);
    }
    return res.status(HttpStatus.CREATED)
      .json(
        await this.responseData(req, msgCode, HttpStatus.CREATED, items)
      )
  }

  public async responseUpdateSuccess(req: any, res: any, items: any) {
    if (req.headers.authorization) {
      await this.addEventLog(req);
    }
    return res.status(HttpStatus.OK)
      .json(
        await this.responseData(req, (HttpStatus.OK ? 100 : 300), HttpStatus.OK, items)
      )
  }

  public async responseDeleteSuccess(req: any, res: any, deleted: boolean = false) {
    if (req.headers.authorization) {
      await this.addEventLog(req);
    }
    return res.status(HttpStatus.NO_CONTENT)
      .json(
        await this.responseData(req, (deleted ? 100 : 400), HttpStatus.NO_CONTENT, deleted)
      )
  }

  private async addEventLog(req, payload = null) {
    const authorization = (`${req.headers.authorization}`.split('Bearer '))[1];
    const authorities: any = jwt.decode(payload ? payload : authorization);
    const userId: number = authorities.id;
    const dataLog = { userId, ip: `${req.ip}`, method: `${req.method}`, path: `${req.path}`, requestPayload: `${JSON.stringify(req.body)}`, origin: `${req.headers.host}` };
    await this.eventLogService.create(authorities.id, dataLog);
  }

  private errorMsg(code: string) {
    const message = {
      "error100": {
        "messageTH": "สำเร็จแล้ว",
        "messageEN": "Successfully.",
        "messageCN": "Successfully."
      },
      "error101": {
        "messageTH": "กรุณา Login",
        "messageEN": "Please Login",
        "messageCN": "Please Login"
      },
      "error102": {
        "messageTH": "มีการอนุมัติไปแล้วในการร้องขออื่น",
        "messageEN": "Approve Fail",
        "messageCN": "Approve Fail"
      },
      "error103": {
        "messageTH": "ไม่มีข้อมูล POST",
        "messageEN": "Not send POST Data.",
        "messageCN": "Not send POST Data."
      },
      "error104": {
        "messageTH": "ไม่มีข้อมูล GET",
        "messageEN": "Not send GET data.",
        "messageCN": "Not send GET data."
      },
      "error105": {
        "messageTH": "ระบุ Username และ Password ให้ครบถ้วน",
        "messageEN": "Username or Password in valid.",
        "messageCN": "Username or Password in valid."
      },
      "error106": {
        "messageTH": "ไม่มีอีเมลดังกล่าวในระบบ กรุณาตรวจสอบอีกครั้ง",
        "messageEN": "Email in invalid.",
        "messageCN": "Email in invalid."
      },
      "error107": {
        "messageTH": "คุณได้ทำการ Reset Password เรียบร้อยแล้ว",
        "messageEN": "You reset password successfully.",
        "messageCN": "You reset password successfully."
      },
      "error108": {
        "messageTH": "การ Reset Password ดังกล่าวไม่ถูกต้อง กรุณติดต่อผู้เกี่ยวข้อง",
        "messageEN": "Reset password is invalid. Please contact to support.",
        "messageCN": "Reset password is invalid. Please contact to support."
      },
      "error120": {
        "messageTH": "ไม่สามารถเพิ่มข้อมูลได้",
        "messageEN": "Create data unsuccessful.",
        "messageCN": "Create data unsuccessful."
      },
      "error121": {
        "messageTH": "ไม่สามารถแก้ไขข้อมูลได้",
        "messageEN": "Update data unsuccessful.",
        "messageCN": "Update data unsuccessful."
      },
      "error122": {
        "messageTH": "ไม่สามารถปรับสถานะได้",
        "messageEN": "Update status unsuccessful.",
        "messageCN": "Update status unsuccessful."
      },
      "error123": {
        "messageTH": "ไฟล์เกินขนาด",
        "messageEN": "Over size",
        "messageCN": "Over size"
      },
      "error124": {
        "messageTH": "ประเภทไฟล์ไม่ถูกต้อง",
        "messageEN": "File type invalid.",
        "messageCN": "File type invalid."
      },
      "error125": {
        "messageTH": "ไม่พบไฟล์หรือโฟล์เดอร์",
        "messageEN": "File or folder not exist",
        "messageCN": "File or folder not exist"
      },
      "error126": {
        "messageTH": "อัพโหลดล้มเหลว",
        "messageEN": "Upload Fail.",
        "messageCN": "Upload Fail."
      },
      "error127": {
        "messageTH": "ไม่สามารถปรับสถานะข้อมูลได้",
        "messageEN": "Unable set status.",
        "messageCN": "Unable set status."
      },
      "error128": {
        "messageTH": "Username หรือ Email ดังกล่าวมีผู้ใช้งานแล้ว",
        "messageEN": "Username or Email Duplicate.",
        "messageCN": "Username or Email Duplicate."
      },
      "error130": {
        "messageTH": "ข้อมูลซ้ำซ้อน",
        "messageEN": "Duplicate Data.",
        "messageCN": "Duplicate Data."
      },
      "error131": {
        "messageTH": "ไม่มีข้อมูล",
        "messageEN": "Data Empty.",
        "messageCN": "Data Empty."
      },
      "error132": {
        "messageTH": "สินค้าคงคลังไม่เพียงพอ",
        "messageEN": "Out of stock.",
        "messageCN": "Out of stock."
      },
      "error133": {
        "messageTH": "ไม่พบสินค้าดังกล่าว",
        "messageEN": "Invalid product.",
        "messageCN": "Invalid product."
      },
      "error134": {
        "messageTH": "สินค้าเกินจำนวน",
        "messageEN": "Product Overload.",
        "messageCN": "Product Overload."
      },
      "error135": {
        "messageTH": "สินค้าไม่ตรงกับข้อมูลการจัดส่ง",
        "messageEN": "Product not match on delivery list.",
        "messageCN": "Product not match on delivery list."
      },
      "error136": {
        "messageTH": "นำสินค้าออกจากคลังเรียบร้อยแล้ว",
        "messageEN": "Pick product complete.",
        "messageCN": "Pick product complete."
      },
      "error137": {
        "messageTH": "ไม่สามารถนำเข้าสินค้าได้ เนื่องจากที่ตั้งดังกล่าวเต็ม",
        "messageEN": "Location this full.",
        "messageCN": "Location this full."
      },
      "error999": {
        "messageTH": "ไม่สำเร็จ",
        "messageEN": "Unsuccessful.",
        "messageCN": "Unsuccessful."
      }
    }

    return message[`error${code}`];
  }
}