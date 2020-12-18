import { Controller, Post, Req, Res, Body, HttpException, HttpStatus, Headers, UsePipes, ValidationPipe, Logger } from '@nestjs/common';
import { ApiHeaders, ApiTags } from '@nestjs/swagger';
import { ClientService } from 'src/common/client/client.service';
import { ClientAuthDTO, ClientRO } from 'src/common/client/dto/client.dto';
import { UserAuthDTO } from 'src/common/user/dto/user-auth.dto';
import { UserService } from 'src/common/user/user/user.service';
import { ResponseController } from 'src/shared/response/response.controller';
import { AuthService } from './auth.service';

@ApiTags('Authentication & Access')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly userService: UserService,
    private readonly clientService: ClientService,
    private readonly resdata: ResponseController
  ) { }

  @ApiHeaders([{ name: 'lang', enum: ["TH", "EN", "ZH"] }])
  @Post('verify')
  @UsePipes(new ValidationPipe())
  async login(@Req() req, @Res() res, @Body() body: UserAuthDTO, @Headers() header) {
    const lang = (typeof header.lang !== 'undefined' ? header.lang : '').toUpperCase();
    const items = await this.userService.userValidate(body, (lang == 'ZH' ? 'CN' : lang))
    return this.resdata.responseAuthSuccess(req, res, items);
  }

  @Post('client')
  @UsePipes(new ValidationPipe())
  async verifyClient(@Req() req, @Res() res, @Body() data: ClientAuthDTO): Promise<ClientRO> {
    try {
      const items = await this.clientService.verify(data);
      return await this.resdata.responseAuthSuccess(req, res, items);
    } catch (error) {
      throw new HttpException(`${error.message}`, HttpStatus.BAD_REQUEST)
    }
  }
}
