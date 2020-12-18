import { HttpModule, Module } from '@nestjs/common';
import { ThirstPartyModule } from 'src/common/thirst-party/thirst-party.module';
import { RegisterController } from './register/register.controller';
import { RegisterService } from './register/register.service';

@Module({
  imports: [
    HttpModule.registerAsync({
      useFactory: () => ({
        timeout: 5000,
        maxRedirects: 5,
      })
    }),
    ThirstPartyModule
  ],
  controllers: [RegisterController],
  providers: [RegisterService]
})
export class InsuranceModule { }
