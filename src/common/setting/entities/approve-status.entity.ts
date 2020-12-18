import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity({ name: 'approve_status' })
export class ApproveStatus {
  @PrimaryGeneratedColumn({ name: 'id' }) id: number;
  @Column({ name: 'code', nullable: true }) code: string;
  @Column({ name: 'sort', default: 0 }) sort: number;
  @Column({ name: 'title_th' }) titleTH: string;
  @Column({ name: 'title_en', nullable: true }) titleEN: string;
  @Column({ name: 'title_cn', nullable: true }) titleCN: string;
  @Column({ name: 'css_class', nullable: true }) cssClass: string;
  @Column({ name: 'icon', nullable: true }) icon: string;
  @Column({ name: 'other_button', nullable: true }) otherButton: string;
  @Column({ name: 'user_disabled', default: false }) userDisabled: boolean;
  @Column({ name: 'admin_disabled', default: false }) adminDisabled: boolean;
  @Column({ name: 'user_allow_delete', default: false }) userAllowDelete: boolean;
  @Column({ name: 'admin_allow_delete', default: false }) adminAllowDelete: boolean;
  @Column({ name: 'user_allow_rollback', default: false }) userAllowRollback: boolean;
  @Column({ name: 'admin_allow_rollback', default: false }) adminAllowRollback: boolean;
  @Column({ name: 'is_active', default: true }) isActive: boolean;
  @Column({ name: 'is_delete', default: false, select: false }) isDelete: boolean;
  @Column({ name: 'create_by', default: 1, select: false }) createBy: number;
  @Column({ name: 'modify_by', default: 1, select: false }) modifyBy: number;
  @CreateDateColumn({ name: 'create_at', select: false }) createAt: Date;
  @UpdateDateColumn({ name: 'modify_at', update: false, select: false }) modifyAt: Date;
}
