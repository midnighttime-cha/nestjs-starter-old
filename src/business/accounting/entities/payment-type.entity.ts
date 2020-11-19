import { Entity, Column, PrimaryColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity({ name: 'payment_type' })
export class PaymentType {
  @PrimaryColumn({ name: 'code' }) code: string;
  @Column({ name: 'name_th' }) nameTH: string;
  @Column({ name: 'name_en', nullable: true }) nameEN: string;
  @Column({ name: 'name_cn', nullable: true }) nameCN: string;
  @Column({ name: 'type', nullable: true }) type: string;
  @Column({ name: 'sort', nullable: true }) sort: number;
  @Column({ name: 'is_active', default: true }) isActive: boolean;
  @Column({ name: 'is_delete', default: false }) isDelete: boolean;
  @Column({ name: 'create_by' }) createBy: number;
  @Column({ name: 'modify_by' }) modifyBy: number;
  @CreateDateColumn({ name: 'create_at' }) createAt: Date;
  @UpdateDateColumn({ name: 'modify_at' }) modifyAt: Date;
}
