import { ApiProperty } from "@nestjs/swagger";
import { IsNumber } from "class-validator";

export class EventLogDTO {
  // @ApiProperty({ required: false }) timestamp: Date;
  @ApiProperty({ required: false }) ip: string;
  @ApiProperty({ required: false }) method: string;
  @ApiProperty({ required: false }) path: string;
  @ApiProperty({ required: false }) requestPayload: string;
  @ApiProperty({ required: false }) origin: string;
  @ApiProperty() @IsNumber() userId: number;
}

export class EventLogRO {
  timestamp: Date;
  ip: string;
  method: string;
  path: string;
  requestPayload: string;
  origin: string;
  userId: number;
}