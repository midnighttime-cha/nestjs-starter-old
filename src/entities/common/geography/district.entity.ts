import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinTable, OneToMany, JoinColumn } from 'typeorm';

@Entity({ name: 'districts' })
export class Districts {
  @PrimaryGeneratedColumn({ name: 'id' }) id: number;
  @Column({ name: 'name_th' }) nameTH: string;
  @Column({ name: 'name_en', nullable: true }) nameEN: string;
  @Column({ name: 'name_cn', nullable: true }) nameCN: string;
  @Column({ name: 'size_area', nullable: true }) sizeArea: number;
  @Column({ name: 'province_id' }) provinceId: number;
  @Column({ name: 'geography_id' }) geographyId: number;
  @Column({ name: 'country_id' }) countryId: number;
  @Column({ name: 'is_active', default: true }) isActive: boolean;
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
