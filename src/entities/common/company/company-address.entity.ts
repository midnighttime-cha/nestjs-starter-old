import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn, OneToMany, AfterInsert, getConnection } from 'typeorm';
import { IsNumber } from 'class-validator';

@Entity({ name: 'company_address' })
export class CompanyAddress {
  @PrimaryGeneratedColumn({ name: 'id' }) id: number;
  @Column({ name: 'type', nullable: true }) type: number;
  @IsNumber() @Column({ name: 'company_id' }) companyId: number;
  @Column({ name: 'address_th', nullable: true, type: 'text' }) addressTH: string;
  @Column({ name: 'address_en', nullable: true, type: 'text' }) addressEN: string;
  @Column({ name: 'address_cn', nullable: true, type: 'text' }) addressCN: string;
  @IsNumber() @Column({ name: 'subdistrict_id', nullable: true }) subDistictId: number;
  @IsNumber() @Column({ name: 'district_id', nullable: true }) districtId: number;
  @IsNumber() @Column({ name: 'province_id', nullable: true }) provinceId: number;
  @Column({ name: 'zipcode', nullable: true }) zipcode: number;
  @Column({ name: 'country_id', nullable: true }) countryId: number;
  @Column({ name: 'latitude', nullable: true }) latitude: string;
  @Column({ name: 'longitude', nullable: true }) longitude: string;
  @Column({ name: 'is_active', default: true }) isActive: boolean;
  @Column({ name: 'is_delete', default: false }) isDelete: boolean;
  @Column({ name: 'create_by' }) createBy: number;
  @Column({ name: 'modify_by' }) modifyBy: number;
  @CreateDateColumn({ name: 'create_at' }) createAt: Date;
  @UpdateDateColumn({ name: 'modify_at' }) modifyAt: Date;
}
