import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Countries } from './md-countries.entity';

@Entity({ name: 'md_geographies' })
export class Geographies {
  @PrimaryGeneratedColumn({ name: 'id' }) id: number;
  @Column({ name: 'name_th' }) nameTH: string;
  @Column({ name: 'name_en', nullable: true }) nameEN: string;
  @Column({ name: 'name_cn', nullable: true }) nameCN: string;
  @Column({ name: 'country_id' }) countryId: number;
  @Column({ name: 'is_active', default: true }) isActive: boolean;
  @Column({ name: 'is_delete', default: false }) isDelete: boolean;
  @Column({ name: 'create_by', default: 1 }) createBy: number;
  @Column({ name: 'modify_by', default: 1 }) modifyBy: number;
  @CreateDateColumn({ name: 'create_at' }) createAt: Date;
  @UpdateDateColumn({ name: 'modify_at', update: false }) modifyAt: Date;

  @ManyToOne(type => Countries, country => country.id, { cascade: true }) @JoinColumn({ name: 'country_id' }) countries: Countries;
}
