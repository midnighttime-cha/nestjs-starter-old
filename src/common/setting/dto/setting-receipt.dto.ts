import { ApiProperty } from "@nestjs/swagger";

export class SettingReceiptDTO {
  @ApiProperty() receiptDays: number;
}