import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import axios from 'axios';
import { ThirstPartyService } from 'src/common/thirst-party/thirst-party.service';

@Injectable()
export class HotelService {
  constructor(
    private readonly thirstPartyService: ThirstPartyService,
  ) { }

  private async getThirstParty(isProduction: boolean) {
    try {
      return (await this.thirstPartyService.findData("ONE", { isActive: true, isProduction, type: "FLIGHT" })).items;
    } catch (error) {
      throw new HttpException(`Get thirst party faild: ${error.message}`, HttpStatus.BAD_REQUEST);
    }
  }

  async showHotel(isProduction: boolean = false) {
    try {
      const { url, username, password } = await this.getThirstParty(isProduction);
      Logger.log({ url, username, password }, "getThirstParty");
      const token = await (await axios.post(`${url}/Token`, { username, password, grant_type: "password" })).data;
      Logger.log(token, "token");
      return { url, username, password, token };
    } catch (error) {
      throw new HttpException(`Get token failed: ${error.message}`, HttpStatus.BAD_REQUEST);
    }
  }
}
