import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Headers, Post, Put, Query, Req, Res, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { ApiHeaders, ApiBearerAuth, ApiParam, ApiQuery, ApiTags } from '@nestjs/swagger';
import { User } from 'src/shared/decorator/user.decorator';
import { AuthGaurd } from 'src/shared/guard/auth.guard';
import { ResponseController } from 'src/shared/response/response.controller';
import { EventLogService } from './event-log.service';

@ApiTags('Setting: Event Logs')
@Controller('eventLog')
export class EventLogController {
  constructor(
    private readonly mainServices: EventLogService,
    private readonly resdata: ResponseController
  ) { }

  // Method: GET
  @ApiHeaders([{ name: 'lang', enum: ["TH", "EN", "ZH"] }])
  @ApiBearerAuth()
  @UseGuards(new AuthGaurd())
  @Get()
  async findData(@Res() res, @Req() req, @Query() query, @Headers() header) {
    try {
      const lang = (typeof header.lang !== 'undefined' ? header.lang : '').toUpperCase();
      const data = await this.mainServices.findData('MANY', query, null, (lang == 'ZH' ? 'CN' : lang));
      return this.resdata.responseFindSuccess(req, res, data.items, data.total);
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }

  @ApiHeaders([{ name: 'lang', enum: ["TH", "EN", "ZH"] }])
  @ApiParam({ name: 'start' })
  @ApiParam({ name: 'limit' })
  @ApiQuery({ name: 'text', required: false })
  @ApiBearerAuth()
  @UseGuards(new AuthGaurd())
  @Get(':start/:limit/pages')
  async paginate1(@Res() res, @Req() req, @Query() query, @Param() param, @Headers() header) {
    try {
      const lang = (typeof header.lang !== 'undefined' ? header.lang : '').toUpperCase();
      const data = await this.mainServices.findData('MANY', query, param, (lang == 'ZH' ? 'CN' : lang));
      return this.resdata.responseFindSuccess(req, res, data.items, data.total);
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }


  @ApiHeaders([{ name: 'lang', enum: ["TH", "EN", "ZH"] }])
  @ApiParam({ name: 'id' })
  @ApiBearerAuth()
  @UseGuards(new AuthGaurd())
  @Get(':id')
  async findOneData(@Res() res, @Req() req, @Param() param, @Headers() header) {
    try {
      const lang = (typeof header.lang !== 'undefined' ? header.lang : '').toUpperCase();
      const data = await this.mainServices.findData('ONE', param, null, (lang == 'ZH' ? 'CN' : lang));
      return this.resdata.responseFindOneSuccess(req, res, data.items, data.total);
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }




  // Method POST
  @Post()
  @ApiBearerAuth()
  @UseGuards(new AuthGaurd())
  @UsePipes(new ValidationPipe())
  async createRoom(@Res() res, @User() payload, @Req() req, @Body() body) {
    await this.resdata.logData({ user: payload, data: body, id: payload.id });
    const dataset = await this.mainServices.create(payload.id, body);
    return await this.resdata.responseCreateSuccess(req, res, dataset);
  }
}
