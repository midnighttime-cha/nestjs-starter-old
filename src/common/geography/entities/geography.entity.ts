import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn, OneToMany } from 'typeorm';

@Entity({ name: 'geographies' })
export class Geographies {
  @PrimaryGeneratedColumn({ name: 'id' }) id: number;
  @Column({ name: 'name_th' }) nameTH: string;
  @Column({ name: 'name_en', nullable: true }) nameEN: string;
  @Column({ name: 'name_cn', nullable: true }) nameCN: string;
  @Column({ name: 'country_id' }) countryId: number;
  @Column({ name: 'is_active', default: true, nullable: true }) isActive: boolean;
  @Column({ name: 'is_delete', default: true }) isDelete: boolean;
  @Column({ name: 'create_by', nullable: true }) createBy: number;
  @Column({ name: 'modify_by', nullable: true }) modifyBy: number;
  @CreateDateColumn({ name: 'create_at', nullable: true }) createAt: Date;
  @UpdateDateColumn({ name: 'modify_at', nullable: true }) modifyAt: Date;

  async toResponseObject() {
    const { id, createBy } = this;
    const responseObject: any = { id, createBy };
    return responseObject;
  }
}
