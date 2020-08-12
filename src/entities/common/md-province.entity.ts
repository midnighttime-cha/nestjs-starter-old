import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinTable, OneToMany, JoinColumn } from 'typeorm';
import { Countries } from './md-countries.entity';
import { Geographies } from './md-geography.entity';

@Entity({ name: 'md_provinces' })
export class Provinces {
  @PrimaryGeneratedColumn({ name: 'id' }) id: number;
  @Column({ name: 'name_th' }) nameTH: string;
  @Column({ name: 'name_en', nullable: true }) nameEN: string;
  @Column({ name: 'name_cn', nullable: true }) nameCN: string;
  @Column({ name: 'size_area', nullable: true }) sizeArea: number;
  @Column({ name: 'country_id' }) countryId: number;
  @Column({ name: 'geography_id' }) geographyId: number;
  @Column({ name: 'is_active', default: true }) isActive: boolean;
  @Column({ name: 'is_delete', default: false, select: false }) isDelete: boolean;
  @Column({ name: 'create_by', default: 1, select: false }) createBy: number;
  @Column({ name: 'modify_by', default: 1, select: false }) modifyBy: number;
  @CreateDateColumn({ name: 'create_at', select: false }) createAt: Date;
  @UpdateDateColumn({ name: 'modify_at', update: false, select: false }) modifyAt: Date;

  @ManyToOne(type => Countries, country => country.id, { cascade: true }) @JoinColumn({ name: 'country_id' }) countries: Countries;
  @ManyToOne(type => Geographies, geography => geography.id, { cascade: true }) @JoinColumn({ name: 'geography_id' }) geographies: Geographies;
}
