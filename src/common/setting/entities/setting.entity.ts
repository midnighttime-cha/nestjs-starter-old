import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, JoinColumn, ManyToOne, getManager, OneToOne, OneToMany } from "typeorm";
import { Languages } from "./language.entity";
import { SettingRO } from "../dto/setting.dto";

@Entity({ name: 'settings' })
export class Settings {
  @PrimaryGeneratedColumn({ name: 'id' }) id: number;
  @Column({ name: 'user_id' }) userId: number;

  @ManyToOne(type => Languages, lang => lang.id, { cascade: true })
  @JoinColumn({ name: 'language_id' }) languages: Languages
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

  async countData() {
    return await getManager().getRepository(Settings).count({ isDelete: false });
  }

  async toResponseObject(lang: string = ''): Promise<SettingRO> {
    const total = await this.countData();
    const { id, userId, languageId, logo, iconHeader, titleTH, titleEN, titleCN, orgNameTH, orgNameEN, orgNameCN, orgPrefixnameTH, orgPrefixnameEN, orgPrefixnameCN, emailContact, emailPassword, languages } = this;
    let responseObject: any = { id, userId, languageId, logo, iconHeader, emailContact, emailPassword };
    if (lang != '') {
      Object.assign(responseObject, {
        title: this[`${`title${lang}`}`],
        orgName: this[`${`orgName${lang}`}`],
        orgPrefixname: this[`${`orgPrefixname${lang}`}`],
        // users: users ? `${users[`firstname${lang}`]} ${users[`lastname${lang}`]}` : "",
        lang: languages ? languages.prefixEN.toLocaleUpperCase() : "",
        total
      });
    } else {
      Object.assign(responseObject, { titleTH, titleEN, titleCN, orgNameTH, orgNameEN, orgNameCN, orgPrefixnameTH, orgPrefixnameEN, orgPrefixnameCN, total });
    }
    return await responseObject;
  }
}