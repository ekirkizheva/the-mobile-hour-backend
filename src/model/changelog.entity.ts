import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Product } from './product.entity';

@Entity({ name: 'changelog' })
export class ChangeLog {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  date_created: Date;

  @Column()
  date_last_modified: Date;

  @ManyToOne(() => Product, { cascade: true })
  @JoinColumn({name: 'product_id'})
  product: Product;
}