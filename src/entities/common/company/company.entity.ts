import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToOne, JoinColumn, ManyToOne, OneToMany, AfterInsert, getConnection, BeforeInsert, getManager } from 'typeorm';

@Entity({ name: 'companies' })
export class Companies {
  @PrimaryGeneratedColumn({ name: 'id' }) id: number;
  @Column({ name: 'code', nullable: true }) code: string;
  @Column({ name: 'type_id' }) typeId: number;
  @Column({ name: 'branch_type' }) branchType: string;
  @Column({ name: 'name_th' }) nameTH: string;
  @Column({ name: 'name_en', nullable: true }) nameEN: string;
  @Column({ name: 'name_cn', nullable: true }) nameCN: string;
  @Column({ name: 'contact_phone1', nullable: true }) contactPhone1: string;
  @Column({ name: 'contact_phone1_ext', nullable: true }) contactPhone1Ext: string;
  @Column({ name: 'contact_phone2', nullable: true }) contactPhone2: string;
  @Column({ name: 'contact_phone2_ext', nullable: true }) contactPhone2Ext: string;
  @Column({ name: 'contact_mobile1', nullable: true }) contactMobile1: string;
  @Column({ name: 'contact_mobile2', nullable: true }) contactMobile2: string;
  @Column({ name: 'contact_fax1', nullable: true }) contactFax1: string;
  @Column({ name: 'contact_fax1_ext', nullable: true }) contactFax1Ext: string;
  @Column({ name: 'contact_fax2', nullable: true }) contactFax2: string;
  @Column({ name: 'contact_fax2_ext', nullable: true }) contactFax2Ext: string;
  @Column({ name: 'website', nullable: true }) website: string;
  @Column({ name: 'email1', nullable: true }) email1: string;
  @Column({ name: 'email2', nullable: true }) email2: string;
  @Column({ name: 'lineid', nullable: true }) lineid: string;
  @Column({ name: 'registered_capital', nullable: true }) registeredCapital: number;
  @Column({ name: 'shareholders_domestic', nullable: true }) shareholdersDomestic: number;
  @Column({ name: 'shareholders_foreign', nullable: true }) shareholdersForeign: number;
  @Column({ name: 'total_employee', nullable: true }) totalEmployee: number;
  @Column({ name: 'year_established', nullable: true }) yearEstablished: number;
  @Column({ name: 'industrygroup_id', nullable: true }) industrygroupId: number;
  @Column({ name: 'businesstype_id', nullable: true }) businesstypeId: number;
  @Column({ name: 'products', nullable: true }) products: string;
  @Column({ name: 'user_contact', nullable: true }) userContact: string;
  @Column({ name: 'logo_filename', nullable: true }) logoFilename: string;
  @Column({ name: 'logo_thumbname', nullable: true }) logoThumbName: string;
  @Column({ name: 'logo_filemodule', nullable: true }) logoFileModule: string;
  @Column({ name: 'certified', nullable: true }) certified: string;
  @Column({ name: 'system_owner', default: false }) systemOwner: boolean;
  @Column({ name: 'is_active', default: true }) isActive: boolean;
  @Column({ name: 'is_delete', default: false, select: false }) isDelete: boolean;
  @Column({ name: 'create_by', select: false }) createBy: number;
  @Column({ name: 'modify_by', select: false }) modifyBy: number;
  @CreateDateColumn({ name: 'create_at', select: false }) createAt: Date;
  @UpdateDateColumn({ name: 'modify_at', select: false }) modifyAt: Date;

  @BeforeInsert()
  async generateCode() {
    const countData = await getManager().getRepository(Companies).count();
    this.code = `CP${`${(countData + 1)}`.padStart(5, '0')}`
  }

  @AfterInsert()
  async toInsertData() {
    const selectLast = await getManager().getRepository(Companies).findOne({ where: { code: this.code } })
    return selectLast;
  }

  async toResponseObject() {
    const { id, code, createBy } = this;
    const responseObject: any = { id, code, createBy };
    return responseObject;
  }
}
