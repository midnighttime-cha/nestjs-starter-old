import { Controller, Post, UsePipes, ValidationPipe, Body, Get, UseGuards, Res, HttpStatus, Param, Put, Req, HttpException, Delete } from '@nestjs/common';
import { ClientService } from './client.service';
import { ApiBearerAuth, ApiParam, ApiTags } from '@nestjs/swagger';
import { AuthGaurd } from 'src/shared/guard/auth.guard';
import { User } from 'src/shared/decorator/user.decorator';
import { ClientDTO } from './dto/client.dto';
import { ResponseController } from 'src/shared/response/response.controller';

@ApiTags('Developer: Client')
@Controller('client')
export class ClientController {
  constructor(
    private readonly moduleService: ClientService,
    private readonly resdata: ResponseController
  ) { }

  @Post('register')
  @UsePipes(new ValidationPipe())
  async register(@Body() data: ClientDTO) {
    return this.moduleService.register(data);
  }

  @Get()
  @ApiBearerAuth()
  @UseGuards(new AuthGaurd())
  async showAllData(@Res() res, @Req() req) {
    const items = await this.moduleService.showAll();
    return this.resdata.responseFindSuccess(req, res, items);
  }

  @Post()
  @ApiBearerAuth()
  @UseGuards(new AuthGaurd())
  @UsePipes(new ValidationPipe())
  createData(@Res() res, @User('id') userId, @Req() req, @Body() data: ClientDTO, @User() payload) {
    const dataone = this.moduleService.create(userId, data);
    return this.resdata.responseCreateSuccess(req, res, dataone, payload);
  }

  @ApiParam({ name: 'id' })
  @Get(':id')
  @ApiBearerAuth()
  @UseGuards(new AuthGaurd())
  async readData(@Res() res, @Param('id') id, @Req() req,) {
    const dataone = await this.moduleService.read(id);
    return this.resdata.responseFindOneSuccess(req, res, dataone);
  }

  @ApiParam({ name: 'id' })
  @UsePipes(new ValidationPipe())
  @Put(':id')
  @ApiBearerAuth()
  @UseGuards(new AuthGaurd())
  updateData(@Res() res, @Body() userTitlename: ClientDTO, @Param() param, @Req() req, @User() payload) {
    const dataone = this.moduleService.update(param.id, userTitlename);
    return this.resdata.responseUpdateSuccess(req, res, dataone);
  }

  @ApiParam({ name: 'id' })
  @Put(':id/active')
  @ApiBearerAuth()
  @UseGuards(new AuthGaurd())
  async activeData(@Param('id') id, @Req() req, @Res() res, @User() payload, @Body() body) {
    this.resdata.logData({ id, user: payload.username, body })
    const set = await this.moduleService.isActive(id, body.status, payload.id);
    if (!set.accepted) {
      throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
    }
    return this.resdata.responseUpdateSuccess(req, res, set)
  }

  @ApiParam({ name: 'id' })
  @Delete(':id')
  @ApiBearerAuth()
  @UseGuards(new AuthGaurd())
  async deleteData(@Param('id') id, @Req() req, @Res() res, @User() payload) {
    this.resdata.logData({ id, user: payload.username, body: payload })
    const del = await this.moduleService.delete(id, payload.id);
    if (!del.deleted) {
      throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
    }
    return this.resdata.responseDeleteSuccess(req, res, true);
  }
}
