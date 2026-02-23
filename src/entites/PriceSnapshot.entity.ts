import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity('price_snapshot')
export class PriceSnapshot {

  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'stock_id' })
  stockId: number;

  @Column('decimal')
  price: number;

  @Column({ name: 'snapshot_time', type: 'timestamp' })
  snapshotTime: Date;
}
