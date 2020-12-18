import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AddressBasketService } from './address-basket/address-basket.service';
import { AddressBaskets } from './entities/address-basket.entity';
import { FileBaskets } from './entities/file-basket.entity';
import { FileBasketService } from './file-basket/file-basket.service';

@Global()
@Module({
  imports: [TypeOrmModule.forFeature([FileBaskets, AddressBaskets])],
  providers: [FileBasketService, AddressBasketService],
  exports: [FileBasketService, AddressBasketService]
})
export class BasketModule { }
