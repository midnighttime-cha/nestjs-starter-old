import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ThirstParties } from './entities/thirst-party.entity';
import { ThirstPartyController } from './thirst-party.controller';
import { ThirstPartyService } from './thirst-party.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([ThirstParties])
  ],
  controllers: [ThirstPartyController],
  providers: [ThirstPartyService],
  exports: [ThirstPartyService]
})
export class ThirstPartyModule { }
