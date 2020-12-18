import { HttpException, HttpService, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { ThirstPartyService } from 'src/common/thirst-party/thirst-party.service';
import { RegisterDTO } from '../dto/register.dto';
const axios = require('axios');

@Injectable()
export class RegisterService {

  constructor(
    private readonly thirstPartyService: ThirstPartyService,
  ) { }

  async register(data: RegisterDTO, isProduction: boolean = false) {
    try {
      const thirstPaties = (await this.thirstPartyService.findData("ONE", { isActive: true, isProduction, type: "REGISTER_INSURANCE" })).items;
      const credentials = Buffer.from(`${thirstPaties.username}:${thirstPaties.password}`).toString('base64');
      const basicAuth = `Basic ${credentials}`;
      const res = await axios.post(`${thirstPaties.url}`, data, {
        headers: {
          Authorization: basicAuth
        }
      });
      return res.data;
    } catch (error) {
      throw new HttpException(`Register failed: ${error.message}`, HttpStatus.BAD_REQUEST);
    }
  }
}
