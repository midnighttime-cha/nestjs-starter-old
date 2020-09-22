import { Entity, Column, PrimaryGeneratedColumn, OneToOne, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinTable, JoinColumn } from 'typeorm';

@Entity({ name: 'sub_districts' })
export class SubDistricts {
  @PrimaryGeneratedColumn({ name: 'id' }) id: number;
  @Column({ name: 'name_th' }) nameTH: string;
  @Column({ name: 'name_en', nullable: true }) nameEN: string;
  @Column({ name: 'name_cn', nullable: true }) nameCN: string;
  @Column({ name: 'lattitude', nullable: true }) lattitude: string;
  @Column({ name: 'longtitude', nullable: true }) longtitude: string;
  @Column({ name: 'size_area', nullable: true }) sizeArea: number;
  @Column({ name: 'district_id', update: false }) districtId: number;
  @Column({ name: 'province_id', update: false }) provinceId: number;
  @Column({ name: 'geography_id', update: false }) geographyId: number;
  @Column({ name: 'country_id', update: false }) countryId: number;
  @Column({ name: 'is_active', default: true, nullable: true }) isActive: boolean;
  @Column({ name: 'is_delete', default: true }) isDelete: boolean;
  @Column({ name: 'create_by', nullable: true }) createBy: number;
  @Column({ name: 'modify_by', nullable: true }) modifyBy: number;
  @CreateDateColumn({ name: 'create_at', nullable: true }) createAt: Date;
  @UpdateDateColumn({ name: 'modify_at', nullable: true }) modifyAt: Date;

  async toResponseObject() {
    const { id, nameTH, nameEN, nameCN } = this;
    const responseObject: any = { id, nameTH, nameEN, nameCN };
    return responseObject;
  }
}
