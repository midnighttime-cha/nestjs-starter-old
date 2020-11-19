import { Entity, Column, CreateDateColumn, UpdateDateColumn, PrimaryGeneratedColumn, BeforeInsert, getManager, OneToOne, JoinColumn, ManyToOne, OneToMany, BeforeRemove, BeforeUpdate, AfterInsert, AfterUpdate } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
import fs = require("fs");
import CryptoJS = require('crypto-js');
import { UserGroups } from './user-group.entity';
import { UserTitlenames } from './user-titlename.entity';
import { DatetimeService } from 'src/shared/helper/datetime.service';
import { Companies } from 'src/common/company/entities/company.entity';
import { SystemSettings } from 'src/common/setting/entities/setting.entity';
import { UserRO } from '../dto/user.dto';

@Entity({ name: 'users' })
export class Users extends DatetimeService {
  constructor() {
    super();
  }
  @PrimaryGeneratedColumn({ name: 'id' }) id: number;
  @Column({ nullable: true, unique: true, name: 'code' }) code: string;
  @Column({ name: 'type' }) type: string;
  @Column({ name: 'level', default: 4 }) level: number;
  @Column({ name: 'display_name' }) name: string;

  @ManyToOne(type => UserGroups, group => group.id, { cascade: true })
  @JoinColumn({ name: 'group_id' }) userGroups: UserGroups
  @Column({ name: 'group_id', nullable: true }) groupId: number;

  @ManyToOne(type => Companies, comp => comp.id, { cascade: true })
  @JoinColumn({ name: 'company_id' }) companies: Companies
  @Column({ name: 'company_id', nullable: true }) companyId: number;

  /* @ManyToOne(type => BuisnessUnits, bu => bu.id, { cascade: true })
  @JoinColumn({ name: 'business_unit_id' }) businessUnits: BuisnessUnits
  @Column({ name: 'business_unit_id', nullable: true }) businessUnitId: number; */

  @Column({ unique: true, name: 'username' }) username: string;
  @Column({ name: 'password', nullable: true }) password: string;

  @ManyToOne(type => UserTitlenames, title => title.id, { cascade: true })
  @JoinColumn({ name: 'titlename_id' }) titlenames: UserTitlenames
  @Column({ name: 'titlename_id', nullable: true }) titlenameId: number;
  @Column({ nullable: true, name: 'firstname_th' }) firstnameTH: string;
  @Column({ nullable: true, name: 'firstname_en' }) firstnameEN: string;
  @Column({ nullable: true, name: 'firstname_cn' }) firstnameCN: string;
  @Column({ nullable: true, name: 'lastname_th' }) lastnameTH: string;
  @Column({ nullable: true, name: 'lastname_en' }) lastnameEN: string;
  @Column({ nullable: true, name: 'lastname_cn' }) lastnameCN: string;
  @Column({ nullable: true, name: 'idcard' }) idCard: string;
  @Column({ nullable: true, name: 'religion' }) religion: string;
  @Column({ nullable: true, name: 'nationality' }) nationality: string;
  @Column({ nullable: true, name: 'race' }) race: string;
  @Column({ nullable: true, name: 'occupation' }) occupation: string;
  @Column({ type: 'date', nullable: true, name: 'birthday', default: null }) birthDay: Date;
  @Column({ nullable: true, name: 'phone_no' }) mobileNo: string;
  @Column({ unique: true, name: 'email' }) email: string;
  @Column({ nullable: true, name: 'gender', default: 'M' }) gender: string;
  @Column({ name: 'imageUrl', nullable: true }) imageUrl: string;

  @Column({ name: 'access_token', default: 1 }) access_token: string;
  @Column({ name: 'is_active', default: true }) isActive: boolean;
  @Column({ name: 'is_delete', default: false, select: false }) isDelete: boolean;
  @Column({ name: 'create_by', default: 1, select: false }) createBy: number;
  @Column({ name: 'modify_by', default: 1, select: false }) modifyBy: number;
  @CreateDateColumn({ name: 'create_at', select: false }) createAt: Date;
  @UpdateDateColumn({ name: 'modify_at', update: false, select: false }) modifyAt: Date;


  @OneToMany(type => SystemSettings, setting => setting.users) @JoinColumn({ name: 'id' }) settings: SystemSettings;


  @BeforeInsert()
  async genDisplayname() {
    if (!this.name) {
      this.name = this.firstnameTH + " " + this.lastnameTH;
    }
  }
  @BeforeInsert()
  async genUsernameForSocial() {
    if (this.type == "SOCIAL_AUTH") {
      this.username = Math.random().toString(36).substr(2, 5);
    }
  }
  @BeforeInsert()
  async genName() {
    if (this.type != "SOCIAL_AUTH") {
      this.name = this.firstnameTH + " " + this.lastnameTH
    }
  }
  @BeforeInsert()
  async genFirstname() {
    if (this.type == "SOCIAL_AUTH") {
      this.firstnameTH = Math.random().toString(36).substr(2, 5);
    }
  }
  @BeforeInsert()
  async genImage() {
    this.imageUrl = this.imageUrl == null ? "https://booking-api.emeraldtech.co.th/api/v1/file/showimage/no-user.png" : this.imageUrl
  }

  @BeforeInsert()
  async hashPassword() {
    if (this.type != "SOCIAL_AUTH") {
      const date = this.format('YYMM');
      const countUser = await getManager().getRepository(Users).find({ type: this.type });
      this.code = `${this.type}${date}${`${(countUser.length + 1)}`.padStart(4, '0')}`;
      this.password = await bcrypt.hash(this.password.trim(), 10);
    } else {
      this.password = null
    }
  }

  private strEncrypt(text) {
    const ciphertext = CryptoJS.AES.encrypt(JSON.stringify(text), process.env.SECRET).toString();
    return ciphertext;
  }

  @AfterInsert()
  async GetAccess_token() {
    // PAYLOAD
    const { id, email, code, username, type } = this;
    if (this.type == "PERSONAL_AUTH") {
      const payload = this.strEncrypt({ id, email, code, username });
      // PRIVATE key
      const privateKEY = fs.readFileSync(`${process.env.PRIVATE_KEY}`, 'utf8');
      this.access_token = jwt.sign({ payload }, privateKEY, {
        issuer: `${process.env.ISSUER}`,
        subject: `${process.env.SUBJECT}`,
        audience: `${process.env.AUDIENCE}`,
        expiresIn: "7d",
        algorithm: "RS256"
      });
    }
  }

  async totalRow() {
    const total = await getManager().getRepository(Users).count({ isDelete: false });
    return total;
  }

  async comparePassword(attempt: string) {
    return await bcrypt.compare(attempt, this.password);
  }

  async toResponseObject(showToken: boolean = true, lang = '', showPassword: boolean = false): Promise<UserRO> {
    const { id, name, code, type, level, groupId, companyId, username, password, firstnameTH, firstnameEN, firstnameCN, lastnameTH, lastnameEN, lastnameCN, idCard, birthDay, mobileNo, email, gender, imageUrl, settings, access_token } = this;
    let responseObject: any

    if (lang != '') {
      responseObject = {
        id,
        code,
        type,
        level,
        groupId,
        companyId,
        name,
        username,
        firstname: this[`firstname${lang}`],
        lastname: this[`lastname${lang}`],
        idCard,
        birthDay,
        mobileNo,
        email,
        gender,
        imageUrl,
        settings,
        access_token
      };
    } else {
      responseObject = {
        id,
        code,
        type,
        imageUrl,
        level,
        groupId,
        companyId,
        name,
        username,
        firstnameTH,
        firstnameEN,
        firstnameCN,
        lastnameTH,
        lastnameEN,
        lastnameCN,
        idCard,
        birthDay,
        mobileNo,
        email,
        gender,
        settings,
        access_token
      };
    }

    if (showToken) {
      responseObject.access_token = access_token;
    }

    if (showPassword) {
      responseObject.password = password;
    }

    return responseObject;
  }
}