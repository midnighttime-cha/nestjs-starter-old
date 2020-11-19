import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity({ name: 'user_address' })
export class UserAddress {
  @PrimaryGeneratedColumn({ name: 'id' }) id: number;
  @Column({ name: 'type', nullable: true }) type: number;
  @Column({ name: 'user_id' }) userId: number;
  @Column({ name: 'address_th', nullable: true, type: 'text' }) addressTH: string;
  @Column({ name: 'address_en', nullable: true, type: 'text' }) addressEN: string;
  @Column({ name: 'address_cn', nullable: true, type: 'text' }) addressCN: string;
  @Column({ name: 'subdistrict_id', nullable: true }) subDistictId: number;
  @Column({ name: 'district_id', nullable: true }) districtId: number;
  @Column({ name: 'province_id', nullable: true }) provinceId: number;
  @Column({ name: 'zipcode', nullable: true }) zipcode: number;
  @Column({ name: 'country_id', nullable: true }) countryId: number;
  @Column({ name: 'is_active', default: true }) isActive: boolean;
  @Column({ name: 'create_by' }) createBy: number;
  @Column({ name: 'modify_by' }) modifyBy: number;
  @CreateDateColumn({ name: 'create_at' }) createAt: Date;
  @UpdateDateColumn({ name: 'modify_at' }) modifyAt: Date;
}
