import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, Timestamp, UpdateDateColumn } from 'typeorm';

@Entity({ name: 'positions' })
export class Position {
  @PrimaryGeneratedColumn({ name: 'id' }) id: number;
  @Column({ name: 'title_th' }) titleTH: string;
  @Column({ name: 'title_en', nullable: true }) titleEN: string;
  @Column({ name: 'title_cn', nullable: true }) titleCN: string;
  @Column({ name: 'is_active', default: true }) isActive: boolean;
  @Column({ name: 'is_delete', default: true }) isDelete: boolean;
  @Column({ name: 'create_by' }) createBy: number;
  @Column({ name: 'modify_by' }) modifyBy: number;
  @CreateDateColumn({ name: 'create_at' }) createAt: Date;
  @UpdateDateColumn({ name: 'modify_at' }) modifyAt: Date;
}
