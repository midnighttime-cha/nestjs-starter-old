import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import axios from 'axios';
import { ThirstPartyService } from 'src/common/thirst-party/thirst-party.service';
import { RegisterDTO } from '../insurance/dto/register.dto';
import { FlightSearchDTO } from './dto/flight-search.dto';

@Injectable()
export class FlightService {
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

  async getToken(isProduction: boolean = false) {
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

  async flightSearch(data: FlightSearchDTO, isProduction: boolean = false) {
    try {
      const { url, token } = await this.getToken(isProduction);
      Logger.log({ url, token }, "token");
      const search = await (await axios.post(`${url}/FlightSearch`, data, { headers: { Authorization: `${token.token_type} ${token.access_token}` } })).data;
      Logger.log(search, "search");
      return await search;
    } catch (error) {
      throw new HttpException(`Flight search failed: ${error.message}`, HttpStatus.BAD_REQUEST);
    }
  }

  async flightPricing(data: FlightSearchDTO, isProduction: boolean = false) {
    try {
      const { url, token } = await this.getToken(isProduction);
      Logger.log({ url, token }, "token");
      const search = await (await axios.post(`${url}/FlightSearch`, data, { headers: { Authorization: `${token.token_type} ${token.access_token}` } })).data;
      Logger.log(search, "search");
      return await search;
    } catch (error) {
      throw new HttpException(`Flight search failed: ${error.message}`, HttpStatus.BAD_REQUEST);
    }
  }
}
