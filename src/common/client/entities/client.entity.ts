import { PrimaryGeneratedColumn, Column, Entity, CreateDateColumn, UpdateDateColumn, BeforeInsert, AfterInsert } from 'typeorm';
import * as bcryptjs from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
import CryptoJS = require('crypto-js');
import fs = require("fs");
import { ClientRO } from '../dto/client.dto';
import { DatetimeService } from 'src/shared/helper/datetime.service';

@Entity('clients')
export class Client extends DatetimeService {
  @PrimaryGeneratedColumn({ name: 'id' }) id: number;
  @Column({ name: 'client_id', nullable: true }) clientId: string;
  @Column({ name: 'type', enum: ["WEBAPP", "UAT", "MOBILE", "OTHER"] }) type: string;
  @Column({ name: 'name' }) name: string;
  @Column({ name: 'host' }) host: string;
  @Column({ name: 'email' }) email: string;
  @Column({ name: 'password' }) password: string;
  @Column({ name: 'register_date', type: 'date' }) registerDate: Date;
  @Column({ name: 'expire_date', type: 'date' }) expireDate: Date;
  @Column({ name: 'last_token', nullable: true, type: 'text' }) lastToken: string;
  @Column({ name: 'is_active', default: true, nullable: true }) isActive: boolean;
  @Column({ name: 'is_delete', default: false }) isDelete: boolean;
  @Column({ name: 'create_by', nullable: true, default: 2 }) createBy: number;
  @Column({ name: 'modify_by', nullable: true, default: 2 }) modifyBy: number;
  @CreateDateColumn({ name: 'create_at', nullable: true }) createAt: Date;
  @UpdateDateColumn({ name: 'modify_at', nullable: true }) modifyAt: Date;

  @BeforeInsert()
  async hashPassword() {
    const { type, name, host, email } = this;
    let days = 0;
    if (type === 'UAT') days = 30;
    else days = 365;

    this.clientId = await this.strClienID({ type, name, host, email });
    this.password = await bcryptjs.hash(this.password, 10);
    this.registerDate = new Date(this.format('YYYY-MM-DD'));
    this.expireDate = new Date(this.addDate(this.registerDate, days));
  }

  @AfterInsert()
  async updateCreateBy() {
    this.createBy = this.id;
    this.modifyBy = this.id;
  }

  private strClienID(text) {
    var wordArray = CryptoJS.enc.Utf8.parse(JSON.stringify(text));
    let ciphertext = CryptoJS.enc.Base64.stringify(wordArray);
    return ciphertext
  }

  private strEncrypt(text) {
    const ciphertext = CryptoJS.AES.encrypt(JSON.stringify(text), process.env.SECRET).toString();
    return ciphertext;
  }

  private get token() {
    // PAYLOAD
    const { id, email } = this;
    const payload = this.strEncrypt({ id, email });

    // PRIVATE key
    const privateKEY = fs.readFileSync(`${process.env.PRIVATE_KEY}`, 'utf8');

    return jwt.sign({ payload }, privateKEY, {
      issuer: `${process.env.ISSUER}`,
      subject: `${process.env.SUBJECT}`,
      audience: `${process.env.AUDIENCE}`,
      expiresIn: "7d",
      algorithm: "RS256"
    });
  }

  async comparePassword(attempt: string) {
    return await bcryptjs.compare(attempt, this.password);
  }

  async toResponseObject(showToken: boolean = true): Promise<ClientRO> {
    const { id, clientId, host, email, token } = this;
    const responseObject: any = { clientId, host, email };
    if (showToken) {
      responseObject.access_token = token;
    }
    return responseObject;
  }
}
