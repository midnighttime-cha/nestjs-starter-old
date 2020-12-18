import { Body, Controller, Post, Req, Res, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGaurd } from 'src/shared/guard/auth.guard';
import { ResponseController } from 'src/shared/response/response.controller';
import { RegisterDTO } from '../insurance/dto/register.dto';
import { FlightSearchDTO } from './dto/flight-search.dto';
import { FlightService } from './flight.service';

@ApiTags("Flight")
@Controller('flight')
export class FlightController {
  constructor(
    private readonly mainServices: FlightService,
    private readonly resdata: ResponseController
  ) { }

  // Method POST
  @Post("getToken")
  @ApiBearerAuth()
  @UseGuards(new AuthGaurd())
  @UsePipes(new ValidationPipe())
  async getToken(@Res() res, @Req() req) {
    const dataset = await this.mainServices.getToken(false);
    return await this.resdata.responseCreateSuccess(req, res, dataset);
  }

  @Post()
  @ApiBearerAuth()
  @UseGuards(new AuthGaurd())
  @UsePipes(new ValidationPipe())
  async flightSearch(@Res() res, @Req() req, @Body() body: FlightSearchDTO) {
    const dataset = await this.mainServices.flightSearch(body, true);
    return await this.resdata.responseCreateSuccess(req, res, dataset);
  }

  @Post("uat")
  @ApiBearerAuth()
  @UseGuards(new AuthGaurd())
  @UsePipes(new ValidationPipe())
  async flightSearchUAT(@Res() res, @Req() req, @Body() body: FlightSearchDTO) {
    const dataset = await this.mainServices.flightSearch(body, false);
    return await this.resdata.responseCreateSuccess(req, res, dataset);
  }
}
