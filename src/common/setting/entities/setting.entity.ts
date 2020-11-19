import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, JoinColumn, ManyToOne, getManager, OneToOne, OneToMany } from "typeorm";
import { Languages } from "./language.entity";
import { Users } from "../user/user.entity";

@Entity({ name: 'system_settings' })
export class SystemSettings {
  @PrimaryGeneratedColumn({ name: 'id' }) id: number;
  @Column({ name: 'user_id' }) userId: number;
  @Column({ name: 'language_id' }) languageId: number;
  @Column({ name: 'default', default: false }) default: boolean;
  @Column({ name: 'logo', nullable: true }) logo: string;
  @Column({ name: 'icon_header', nullable: true }) iconHeader: string;
  @Column({ name: 'title_th', nullable: true }) titleTH: string;
  @Column({ name: 'title_en', nullable: true }) titleEN: string;
  @Column({ name: 'title_cn', nullable: true }) titleCN: string;
  @Column({ name: 'org_name_th', nullable: true }) orgNameTH: string;
  @Column({ name: 'org_name_en', nullable: true }) orgNameEN: string;
  @Column({ name: 'org_name_cn', nullable: true }) orgNameCN: string;
  @Column({ name: 'org_prefixname_th', nullable: true }) orgPrefixnameTH: string;
  @Column({ name: 'org_prefixname_en', nullable: true }) orgPrefixnameEN: string;
  @Column({ name: 'org_prefixname_cn', nullable: true }) orgPrefixnameCN: string;
  @Column({ name: 'email_contact', nullable: true }) emailContact: string;
  @Column({ name: 'email_password', nullable: true }) emailPassword: string;
  @Column({ name: 'is_active', default: true }) isActive: boolean;
  @Column({ name: 'is_delete', default: false, select: false }) isDelete: boolean;
  @Column({ name: 'create_by', default: 1, select: false }) createBy: number;
  @Column({ name: 'modify_by', default: 1, select: false }) modifyBy: number;
  @CreateDateColumn({ name: 'create_at', select: false }) createAt: Date;
  @UpdateDateColumn({ name: 'modify_at', update: false, select: false }) modifyAt: Date;

  @ManyToOne(type => Users, user => user.id, { cascade: true }) @JoinColumn({ name: 'user_id' }) users: Users;
  @ManyToOne(type => Languages, lang => lang.id, { cascade: true }) @JoinColumn({ name: 'language_id' }) languages: Languages;

  async totalRow() {
    const total = await getManager().getRepository(SystemSettings).count({ isDelete: false });
    return total;
  }
}