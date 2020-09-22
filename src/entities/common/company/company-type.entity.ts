import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany, JoinColumn } from 'typeorm';

@Entity({ name: 'company_type' })
export class CompanyTypes {
  @PrimaryGeneratedColumn({ name: 'id' }) id: number;
  @Column({ name: 'code' }) code: string;
  @Column({ name: 'titlename_th' }) titleNameTH: string;
  @Column({ name: 'titlename_en', nullable: true }) titleNameEN: string;
  @Column({ name: 'titlename_cn', nullable: true }) titleNameCN: string;
  @Column({ name: 'name_th', nullable: true }) nameTH: string;
  @Column({ name: 'name_en', nullable: true }) nameEN: string;
  @Column({ name: 'name_cn', nullable: true }) nameCN: string;
  @Column({ name: 'is_active', default: true }) isActive: boolean;
  @Column({ name: 'is_delete', default: false }) isDelete: boolean;
  @Column({ name: 'create_by' }) createBy: number;
  @Column({ name: 'modify_by' }) modifyBy: number;
  @CreateDateColumn({ name: 'create_at' }) createAt: Date;
  @UpdateDateColumn({ name: 'modify_at' }) modifyAt: Date;

  async toResponseObject() {
    const { id, code, createBy } = this;
    const responseObject: any = { id, code, createBy };
    return responseObject;
  }
}
