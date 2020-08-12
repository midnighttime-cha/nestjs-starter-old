import { Entity, PrimaryColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity({ name: 'conf_error_messages' })
export class ConfErrorMessages {
  @PrimaryColumn({ name: 'code' }) code: number;
  @Column({ name: 'message_th', nullable: true }) messageTH: string;
  @Column({ name: 'message_en', nullable: true }) messageEN: string;
  @Column({ name: 'message_cn', nullable: true }) messageCN: string;
  @Column({ name: 'is_active', default: true }) isActive: boolean;
  @Column({ name: 'is_delete', default: false, select: false }) isDelete: boolean;
  @Column({ name: 'create_by', default: 1, select: false }) createBy: number;
  @Column({ name: 'modify_by', default: 1, select: false }) modifyBy: number;
  @CreateDateColumn({ name: 'create_at', select: false }) createAt: Date;
  @UpdateDateColumn({ name: 'modify_at', update: false, select: false }) modifyAt: Date;
}