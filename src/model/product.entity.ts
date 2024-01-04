import { Entity, Column, PrimaryGeneratedColumn, OneToMany, JoinColumn, ManyToOne, JoinTable, ManyToMany } from 'typeorm';
import { Feature } from './feature.entity';

@Entity({ name: 'product' })
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  product_name: string;

  @Column()
  product_model: string;

  @Column()
  manufacturer: string;

  @Column()
  price: number;

  @Column()
  stock_on_hand: number;

  @ManyToMany(() => Feature, { cascade: true })
  @JoinTable()
  features: Feature[];
}