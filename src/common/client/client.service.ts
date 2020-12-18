import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ClientRO, ClientAuthDTO, ClientDTO } from './dto/client.dto';
import { Client } from './entities/client.entity';

@Injectable()
export class ClientService {
  constructor(
    @InjectRepository(Client) private mainRepositories: Repository<Client>,
  ) { }

  async showAll(): Promise<ClientRO[]> {
    const dataset = await this.mainRepositories.find({
      where: { isActive: true, isDelete: false },
      order: {
        id: 'DESC',
      },
    });
    return dataset;
  }

  async verify(data: ClientAuthDTO): Promise<ClientRO> {
    try {
      const { clientId, email, password } = data;
      const client = await this.mainRepositories.findOne({ where: { clientId, email, isActive: true, isDelete: false } });
      if (!client && (await client.comparePassword(password))) {
        throw new HttpException(
          'Invalid Client',
          HttpStatus.BAD_REQUEST,
        );
      }
      return client.toResponseObject();
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async register(data: ClientDTO): Promise<ClientRO> {
    const { type, email, host } = data;
    if (host === "localhost" && (type !== "UAT")) {
      throw new HttpException("Host is 'localhost' require 'UAT' type only.", HttpStatus.BAD_REQUEST);
    }
    const user = await this.mainRepositories.findOne({ where: { type, email, isDelete: false } });
    if (typeof user !== 'undefined' || user) {
      throw new HttpException('Client already exists', HttpStatus.BAD_REQUEST);
    }

    const datasave = await this.mainRepositories.create(data);
    await this.mainRepositories.save(datasave);
    const tores = datasave.toResponseObject(false);
    return tores;
  }

  async nextval() {
    return await this.mainRepositories.count();
  }

  async countAll(where: object) {
    return await this.mainRepositories.count(where);
  }

  async create(userId, data: ClientDTO): Promise<ClientRO> {
    const dataset = await this.mainRepositories.create({ ...data, createBy: userId, modifyBy: userId });
    await this.mainRepositories.save(dataset);
    return dataset.toResponseObject(true);
  }

  async update(id: number, data: ClientDTO) {
    await this.mainRepositories.update({ id }, data);
    return await this.mainRepositories.findOne({ id, isDelete: false });
  }

  async read(id: number) {
    const dataone = await this.mainRepositories.findOne({ where: { id, isDelete: false } });
    if (!dataone) {
      throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
    }
    return dataone;
  }

  async isActive(id: number, status: boolean, payloadId: number) {
    try {
      await this.mainRepositories.update({ id }, { isActive: status, modifyBy: payloadId });
      return { accepted: true };
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }

  async delete(id: number, payloadId: number) {
    await this.mainRepositories.update({ id }, { isDelete: true, modifyBy: payloadId });
    return { deleted: true };
  }
}
