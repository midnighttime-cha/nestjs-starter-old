import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity({ name: 'package_types' })
export class PackageTypes {
  @PrimaryGeneratedColumn({ name: 'id' }) id: number;
  @Column({ name: 'code', nullable: true }) code: string;
  @Column({ name: 'name_th' }) nameTH: string;
  @Column({ name: 'name_en', nullable: true }) nameEN: string;
  @Column({ name: 'name_cn', nullable: true }) nameCN: string;
  @Column({ name: 'is_active', default: true }) isActive: boolean;
  @Column({ name: 'is_delete', default: false }) isDelete: boolean;
  @Column({ name: 'create_by' }) createBy: number;
  @Column({ name: 'modify_by' }) modifyBy: number;
  @CreateDateColumn({ name: 'create_at' }) createAt: Date;
  @UpdateDateColumn({ name: 'modify_at' }) modifyAt: Date;
}