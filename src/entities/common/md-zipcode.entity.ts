import { Entity, Column, PrimaryGeneratedColumn, OneToOne, CreateDateColumn, UpdateDateColumn, JoinTable, JoinColumn, ManyToOne } from 'typeorm';
import { SubDistricts } from './md-sub-district.entity';

@Entity({ name: 'md_zipcodes' })
export class Zipcode {
  @PrimaryGeneratedColumn({ name: 'id' }) id: number;
  @Column({ name: 'sd_id' }) subDistrictId: number;
  @Column({ name: 'zipcode' }) zipcode: number;
  @Column({ name: 'is_active', default: true }) isActive: boolean;
  @Column({ name: 'is_delete', default: false, select: false }) isDelete: boolean;
  @Column({ name: 'create_by', default: 1, select: false }) createBy: number;
  @Column({ name: 'modify_by', default: 1, select: false }) modifyBy: number;
  @CreateDateColumn({ name: 'create_at', select: false }) createAt: Date;
  @UpdateDateColumn({ name: 'modify_at', update: false, select: false }) modifyAt: Date;

  @ManyToOne(type => SubDistricts, subDistricts => subDistricts.id, { cascade: true }) @JoinColumn({ name: 'sd_id' }) subDistricts: SubDistricts;
}
