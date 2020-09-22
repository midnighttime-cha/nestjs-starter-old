import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from 'typeorm';

@Entity('user_favorites')
export class UserFavorites {
  @PrimaryGeneratedColumn({ name: 'id' }) id: number;
  @Column({ name: 'user_id' }) userId: number;
  @Column({ name: 'type' }) type: string;
  @Column({ name: 'favorite_id' }) favoriteId: number;
}