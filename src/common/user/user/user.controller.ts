import { Controller, Get, UseGuards, Res, Req, Query, HttpException, HttpStatus, Param, Headers, Post, Body, UsePipes, ValidationPipe, Put, Delete } from '@nestjs/common';
import { ApiHeaders, ApiBearerAuth, ApiParam, ApiQuery, ApiTags } from '@nestjs/swagger';
import { AuthGaurd } from 'src/shared/guard/auth.guard';
import { User } from 'src/shared/decorator/user.decorator';
import { UserService } from './user.service';
import { UserDTO, UserRegisterDTO, } from '../dto/user.dto';
import { ResponseController } from 'src/shared/response/response.controller';

@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(
    private readonly mainServices: UserService,
    private readonly resdata: ResponseController
  ) { }

  // Method: GET
  @ApiHeaders([{ name: 'lang', enum: ["TH", "EN", "ZH"] }])
  @Get()
  @ApiBearerAuth()
  @UseGuards(new AuthGaurd())
  async findData(@Res() res, @Req() req, @Query() query, @Headers() header) {
    const lang = (typeof header.lang !== 'undefined' ? header.lang : '').toUpperCase();
    const resdata = await this.mainServices.findData('MANY', query, null, true, (lang == 'ZH' ? 'CN' : lang));
    return this.resdata.responseFindSuccess(req, res, resdata.items, resdata.total);
  }

  @ApiHeaders([{ name: 'lang', enum: ["TH", "EN", "ZH"] }])
  @ApiParam({ name: 'start' })
  @ApiParam({ name: 'limit' })
  @ApiQuery({ name: 'text', required: false })
  @Get(':start/:limit/pages')
  @ApiBearerAuth()
  @UseGuards(new AuthGaurd())
  async paginate1(@Res() res, @Req() req, @Query() query, @Param() param, @User() payload, @Headers() header) {
    this.resdata.logData({ id: payload.id, user: payload.username, body: param })
    try {
      const lang = (typeof header.lang !== 'undefined' ? header.lang : '').toUpperCase();
      const resdata = await this.mainServices.findData('MANY', query, param, true, (lang == 'ZH' ? 'CN' : lang));
      return this.resdata.responseFindSuccess(req, res, resdata.items, resdata.total);
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
      const resdata = await this.mainServices.findData('ONE', param, null, true, (lang == 'ZH' ? 'CN' : lang));
      return this.resdata.responseFindOneSuccess(req, res, resdata.items, resdata.total);
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }




  // Method POST
  @Post()
  @ApiBearerAuth()
  @UseGuards(new AuthGaurd())
  @UsePipes(new ValidationPipe())
  async createRoom(@Res() res, @User() payload, @Req() req, @Body() body: UserDTO) {
    await this.resdata.logData({ user: payload, data: body, id: payload.id });
    const dataset = await this.mainServices.create(payload.id, body);
    return await this.resdata.responseCreateSuccess(req, res, dataset);
  }

  @Post('register')
  @UsePipes(new ValidationPipe())
  async register(@Body() data: UserRegisterDTO) {
    return this.mainServices.register(data);
  }




  // PUT Method
  @Put(':id')
  @ApiParam({ name: 'id' })
  @UsePipes(new ValidationPipe())
  @ApiBearerAuth()
  @UseGuards(new AuthGaurd())
  updateData(@Res() res, @Body() body, @User() payload, @Req() req, @Param('id') id) {
    this.resdata.logData({ id: payload.id, user: payload, body });
    const dataset = this.mainServices.update(payload.id, id, body);
    return this.resdata.responseUpdateSuccess(req, res, dataset);
  }

  @ApiParam({ name: 'id' })
  @Put(':id/active')
  @ApiBearerAuth()
  @UseGuards(new AuthGaurd())
  async activeData(@Param('id') id, @Req() req, @Res() res, @User() payload, @Body() body) {
    this.resdata.logData({ id, user: payload.username, body })
    const set = await this.mainServices.isActive(id, body.status, payload.id);
    if (!set.accepted) {
      throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
    }
    return this.resdata.responseUpdateSuccess(req, res, set)
  }




  // DELETE Method
  @ApiParam({ name: 'id' })
  @Delete(':id')
  @ApiBearerAuth()
  @UseGuards(new AuthGaurd())
  async deleteData(@Param('id') id, @Req() req, @Res() res, @User() payload) {
    this.resdata.logData({ id, user: payload.username, body: payload })
    const del = await this.mainServices.delete(id, payload.id);
    if (!del.deleted) {
      throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
    }
    return this.resdata.responseDeleteSuccess(req, res, true);
  }
}
