import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ResponseModule } from './shared/response/response.module';
import { HelperModule } from './shared/helper/helper.module';

@Module({
  imports: [ResponseModule, HelperModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
