import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ThirstParties } from 'src/common/thirst-party/entities/thirst-party.entity';
import { ThirstPartyService } from 'src/common/thirst-party/thirst-party.service';
import { HotelController } from './hotel.controller';
import { HotelService } from './hotel.service';

@Module({
  imports: [TypeOrmModule.forFeature([ThirstParties])],
  controllers: [HotelController],
  providers: [HotelService, ThirstPartyService],
  exports: [ThirstPartyService]
})
export class HotelModule { }
