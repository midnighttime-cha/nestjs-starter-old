import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToMany, JoinTable, JoinColumn } from 'typeorm';

@Entity({ name: 'countries' })
export class Countries {
  @PrimaryGeneratedColumn({ name: 'id' }) id: number;
  @Column({ name: 'name_th' }) nameTH: string;
  @Column({ name: 'name_en', nullable: true }) nameEN: string;
  @Column({ name: 'name_cn', nullable: true }) nameCN: string;
  @Column({ name: 'prefix2', nullable: true }) prefix2: string;
  @Column({ name: 'prefix3', nullable: true }) prefix3: string;
  @Column({ name: 'is_active', default: true }) isActive: boolean;
  @Column({ name: 'is_delete', default: true }) isDelete: boolean;
  @Column({ name: 'create_by', nullable: true }) createBy: number;
  @Column({ name: 'modify_by', nullable: true }) modifyBy: number;
  @CreateDateColumn({ name: 'create_at', nullable: true }) createAt: Date;
  @UpdateDateColumn({ name: 'modify_at', nullable: true }) modifyAt: Date;

  async toResponseObject() {
    const { id, nameTH, nameEN, nameCN, prefix2, prefix3 } = this;
    const responseObject: any = { id, nameTH, nameEN, nameCN, prefix2, prefix3 };
    return responseObject;
  }
}
