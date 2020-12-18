import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SystemController } from './system/system.controller';
import { SystemService } from './system/system.service';
import { ApproveStatusController } from './approve-status/approve-status.controller';
import { ApproveStatusService } from './approve-status/approve-status.service';
import { ApproveStatus } from 'src/common/setting/entities/approve-status.entity';
import { ApproveStatusTypeController } from './approve-status-type/approve-status-type.controller';
import { ApproveStatusTypeService } from './approve-status-type/approve-status-type.service';
import { Settings } from './entities/setting.entity';
import { EventLogController } from './event-log/event-log.controller';
import { EventLogService } from './event-log/event-log.service';
import { EventLogs } from './entities/event-log.entity';
import { ApproveStatusTypes } from './entities/approve-status-type.entity';

@Global()
@Module({
  imports: [TypeOrmModule.forFeature([
    Settings,
    ApproveStatus,
    EventLogs,
    ApproveStatusTypes
  ])],
  providers: [
    SystemService,
    ApproveStatusService,
    ApproveStatusTypeService,
    EventLogService
  ],
  controllers: [
    SystemController,
    ApproveStatusController,
    ApproveStatusTypeController,
    EventLogController
  ],
  exports: [
    SystemService,
    EventLogService
  ]
})
export class SettingModule { }
