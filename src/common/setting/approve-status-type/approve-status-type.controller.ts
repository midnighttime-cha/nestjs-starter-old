import { Controller, Get, UseGuards, Res, Req, Query, HttpException, HttpStatus, Param, Post, UsePipes, ValidationPipe, Body, Put, Delete, Headers } from '@nestjs/common';
import { ApproveStatusTypeService } from './approve-status-type.service';
import { ApiHeaders, ApiBearerAuth, ApiParam, ApiQuery, ApiTags } from '@nestjs/swagger';
import { AuthGaurd } from 'src/shared/guard/auth.guard';
import { User } from 'src/shared/decorator/user.decorator';
import { ResponseController } from 'src/shared/response/response.controller';

@ApiTags('Setting: Approve Status Type')
@Controller('approve-status-type')
export class ApproveStatusTypeController {
  constructor(
    private readonly mainServices: ApproveStatusTypeService,
    private readonly resdata: ResponseController
  ) { }

  // Method: GET
  @ApiHeaders([{ name: 'lang', enum: ["TH", "EN", "ZH"] }])
  @Get()
  @ApiBearerAuth()
  @UseGuards(new AuthGaurd())
  async findData(@Res() res, @Req() req, @Query() query, @Headers() header) {
    try {
      const lang = (typeof header.lang !== 'undefined' ? header.lang : '').toUpperCase();
      const data = await this.mainServices.findData(query, null, true, (lang == 'ZH' ? 'CN' : lang));
      return this.resdata.responseFindSuccess(req, res, data.items, data.total);
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }

  @ApiHeaders([{ name: 'lang', enum: ["TH", "EN", "ZH"] }])
  @ApiParam({ name: 'start' })
  @ApiParam({ name: 'limit' })
  @ApiQuery({ name: 'text', required: false })
  @Get(':start/:limit/pages')
  @ApiBearerAuth()
  @UseGuards(new AuthGaurd())
  async paginate1(@Res() res, @Req() req, @Query() query, @Param() param, @User() payload, @Headers() header) {
    try {
      const lang = (typeof header.lang !== 'undefined' ? header.lang : '').toUpperCase();
      const data = await this.mainServices.findData(query, param, true, (lang == 'ZH' ? 'CN' : lang));
      return this.resdata.responseFindSuccess(req, res, data.items, data.total);
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }

  @ApiHeaders([{ name: 'lang', enum: ["TH", "EN", "ZH"] }])
  @ApiParam({ name: 'id' })
  @Get(':id')
  @ApiBearerAuth()
  @UseGuards(new AuthGaurd())
  async findOneData(@Res() res, @Req() req, @Param() param, @Headers() header) {
    try {
      const lang = (typeof header.lang !== 'undefined' ? header.lang : '').toUpperCase();
      const data = await this.mainServices.findOneData(param, null, true, (lang == 'ZH' ? 'CN' : lang));
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



  // Method PUT
  @ApiParam({ name: 'id' })
  @Put(':id')
  @ApiBearerAuth()
  @UseGuards(new AuthGaurd())
  @UsePipes(new ValidationPipe())
  async update(@Res() res, @Req() req, @Body() body, @Param('id') id, @User() payload) {
    await this.resdata.logData({ user: payload, body, id: payload.id })
    const items = await this.mainServices.update(payload.id, id, body);
    return await this.resdata.responseUpdateSuccess(req, res, items);
  }

  @ApiParam({ name: 'id' })
  @Put(':id/active')
  @ApiBearerAuth()
  @UseGuards(new AuthGaurd())
  async activeData(@Param('id') id, @Req() req, @Res() res, @User() payload, @Body() body) {
    this.resdata.logData({ id: payload.id, user: payload.username, data: body })
    const set = await this.mainServices.isActive(id, body.status, payload.id);
    if (!set.accepted) {
      throw new HttpException('Not Found', HttpStatus.BAD_REQUEST);
    }
    return this.resdata.responseUpdateSuccess(req, res, set);
  }




  // Method DELETE
  @ApiParam({ name: 'id' })
  @Delete(':id')
  @ApiBearerAuth()
  @UseGuards(new AuthGaurd())
  async deleteData(@Param('id') id, @Req() req, @Res() res, @User() payload) {
    this.resdata.logData({ id: payload.id, user: payload.username, data: payload })
    const del = await this.mainServices.delete(id, payload.id);
    if (!del.deleted) {
      throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
    }
    return this.resdata.responseDeleteSuccess(req, res, true);
  }
}
