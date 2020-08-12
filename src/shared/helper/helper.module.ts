import { Module, Global } from '@nestjs/common';
import { DatetimeService } from './datetime.service';

@Global()
@Module({
  imports: [DatetimeService],
  providers: [DatetimeService],
  exports: [DatetimeService]
})
export class HelperModule { }
