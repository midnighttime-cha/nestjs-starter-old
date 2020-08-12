import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, UpdateDateColumn, JoinColumn } from 'typeorm';
import { type } from 'os';
import { Users } from './user.entity';
import { Countries } from './md-countries.entity';
import { Provinces } from './md-province.entity';
import { Districts } from './md-district.entity';
import { SubDistricts } from './md-sub-district.entity';

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
  @Column({ name: 'latitude', nullable: true }) latitude: string;
  @Column({ name: 'longitude', nullable: true }) longitude: string;

  @ManyToOne(type => Users, user => user.id, { cascade: true }) @JoinColumn({ name: 'user_id' }) users: Users;
  @ManyToOne(type => Countries, country => country.id, { cascade: true }) @JoinColumn({ name: 'country_id' }) countries: Countries;
  @ManyToOne(type => Provinces, province => province.id, { cascade: true }) @JoinColumn({ name: 'province_id' }) provinces: Provinces;
  @ManyToOne(type => Districts, district => district.id, { cascade: true }) @JoinColumn({ name: 'district_id' }) districts: Districts;
  @ManyToOne(type => SubDistricts, subDistricts => subDistricts.id, { cascade: true }) @JoinColumn({ name: 'subdistrict_id' }) subDisticts: SubDistricts;
}
