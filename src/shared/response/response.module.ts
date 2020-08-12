import { Module, Global } from '@nestjs/common';
import { ResponseController } from './response.controller';
import { MyLogger } from '../logger/logger.service';

@Global()
@Module({
  imports: [MyLogger],
  controllers: [ResponseController],
  providers: [MyLogger, ResponseController],
  exports: [ResponseController, MyLogger]
})
export class ResponseModule { }
