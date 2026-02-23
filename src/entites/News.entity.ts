import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('news')
export class News {

  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'stock_id' })
  stockId: number;

  @Column()
  title: string;

  @Column({ type: 'text' })
  summary: string;

  @Column()
  source: string;

  @Column()
  sentiment: string;

  @Column({ name: 'published_at', type: 'timestamp' })
  publishedAt: Date;
}
