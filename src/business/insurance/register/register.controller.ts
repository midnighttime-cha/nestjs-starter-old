import { Body, Controller, Logger, Post, Req, Res, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGaurd } from 'src/shared/guard/auth.guard';
import { ResponseController } from 'src/shared/response/response.controller';
import { RegisterDTO } from '../dto/register.dto';
import { RegisterService } from './register.service';

@ApiTags("Insurance Register")
@Controller('register')
export class RegisterController {
  constructor(
    private readonly mainServices: RegisterService,
    private readonly resdata: ResponseController
  ) { }

  // Method POST
  @Post()
  @ApiBearerAuth()
  @UseGuards(new AuthGaurd())
  @UsePipes(new ValidationPipe())
  async create(@Res() res, @Req() req, @Body() body: RegisterDTO) {
    const dataset = await this.mainServices.register(body, true);
    return await this.resdata.responseCreateSuccess(req, res, dataset);
  }

  @Post("uat")
  @ApiBearerAuth()
  @UseGuards(new AuthGaurd())
  @UsePipes(new ValidationPipe())
  async createUAT(@Res() res, @Req() req, @Body() body: RegisterDTO) {
    const dataset = await this.mainServices.register(body, false);
    return await this.resdata.responseCreateSuccess(req, res, dataset);
  }
}
