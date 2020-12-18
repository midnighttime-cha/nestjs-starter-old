import { Module } from '@nestjs/common';
import { FlightService } from './flight.service';
import { FlightController } from './flight.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ThirstPartyModule } from 'src/common/thirst-party/thirst-party.module';

@Module({
  imports: [ThirstPartyModule],
  providers: [FlightService],
  controllers: [FlightController]
})
export class FlightModule { }
