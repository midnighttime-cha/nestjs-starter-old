import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, BeforeInsert, PrimaryColumn } from 'typeorm';
import { UserRO } from './dto/user.dto';
import * as jwt from 'jsonwebtoken';
import fs = require("fs");
import CryptoJS = require('crypto-js');

@Entity({ name: 'dev_clients' })
export class DevClients {
  @PrimaryGeneratedColumn({ name: 'id' }) id: number;
  @Column({ name: 'client_id', unique: true, default: 'uuid_generate_v4()' }) clientId: string;
  @Column({ name: 'type', nullable: true }) type: string;
  @Column({ name: 'name', nullable: true }) name: string;
  @Column({ name: 'host', nullable: true }) host: string;
  @Column({ name: 'email', unique: true }) email: string;
  @Column({ name: 'secret', nullable: true }) secret: string;
  @Column({ name: 'private_key_file', nullable: true, type: 'text' }) privateKeyFile: string;
  @Column({ name: 'public_key_file', nullable: true, type: 'text' }) publicKeyFile: string;
  @Column({ name: 'last_token', type: 'text', nullable: true }) lastToken: string;
  @Column({ name: 'is_active', default: true }) isActive: boolean;
  @Column({ name: 'is_delete', default: false, select: false }) isDelete: boolean;
  @Column({ name: 'create_by', default: 1, select: false }) createBy: number;
  @Column({ name: 'modify_by', default: 1, select: false }) modifyBy: number;
  @CreateDateColumn({ name: 'create_at', select: false }) createAt: Date;
  @UpdateDateColumn({ name: 'modify_at', update: false, select: false }) modifyAt: Date;

  private makeid(length) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    let result = '';
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }

  private generatePubPriKey() {
    const { generateKeyPairSync } = require('crypto');
    const { privateKey, publicKey } = generateKeyPairSync('rsa', {
      modulusLength: 2048,
      publicKeyEncoding: {
        type: 'spki',
        format: 'pem',
        secret: `${this.secret}`
      },
      privateKeyEncoding: {
        type: 'pkcs8',
        format: 'pem',
        secret: `${this.secret}`
      }
    });
    const file = `${this.name.split(' ').join('')}-${this.makeid(10)}`;
    const filePrivate = `./key/pri-${file}.key`;
    const filePublic = `./key/pub-${file}.key`;

    fs.writeFileSync(`${filePrivate}`, `${privateKey}`);
    fs.writeFileSync(`${filePublic}`, `${publicKey}`);

    return { filePrivate, filePublic };
  }

  @BeforeInsert()
  async hashPassword() {
    const key = this.generatePubPriKey();
    this.secret = this.makeid(10);
    this.privateKeyFile = key.filePrivate;
    this.publicKeyFile = key.filePublic;
  }

  private strEncrypt(text) {
    const ciphertext = CryptoJS.AES.encrypt(JSON.stringify(text), process.env.SECRET).toString();
    return ciphertext;
  }

  private get access_token() {
    // PAYLOAD
    const { id, clientId, type, name, host, email, secret, lastToken } = this;
    const payload = this.strEncrypt({ id, clientId, type, name, host, email });

    // PRIVATE key
    const privateKEY = fs.readFileSync(`${process.env.PRIVATE_KEY}`, 'utf8');
    return jwt.sign({ payload }, privateKEY, {
      issuer: `${this.name}`,
      subject: `${this.email}`,
      audience: `${this.host}`,
      expiresIn: "7d",
      algorithm: "RS256"
    });
  }

  async toResponseObject(showToken: boolean = true, showSecret: boolean = false): Promise<UserRO> {
    const { id, clientId, type, name, host, email, secret, access_token } = this;
    let responseObject: any = { id, clientId, type, name, host, email, secret, access_token };

    if (showToken) {
      responseObject.access_token = access_token;
    }

    if (showSecret) {
      responseObject.secret = secret;
    }

    return responseObject;
  }
}