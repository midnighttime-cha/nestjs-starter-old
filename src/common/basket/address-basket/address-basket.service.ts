import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AddressBasketDTO, AddressBasketRO } from '../dto/address-basket.dto';
import { AddressBaskets } from '../entities/address-basket.entity';

@Injectable()
export class AddressBasketService {
  constructor(
    @InjectRepository(AddressBaskets) private readonly mainRepositories: Repository<AddressBaskets>,
  ) {
  }

  // Methode POST
  async create(module: string, moduleId: number, data: AddressBasketDTO): Promise<AddressBasketRO> {
    try {
      await this.mainRepositories.delete({ moduleId, module });
      const created = await this.mainRepositories.create({ ...data, moduleId, module });
      await this.mainRepositories.save(created);
      return await created;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
}
