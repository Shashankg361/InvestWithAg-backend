import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity('price_snapshots')
export class PriceSnapshot {

  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'stock_id' })
  stockId: number;

  @Column('decimal')
  price: number;

  @Column({ name: 'snapshot_time', type: 'timestamp' })
  snapshotTime: Date;

  @Column({ name: 'change_percent', type: 'decimal', nullable: true })
  changePercent: number;
  
  @Column({ type: 'bigint', nullable: true })
  volume: number;
}
