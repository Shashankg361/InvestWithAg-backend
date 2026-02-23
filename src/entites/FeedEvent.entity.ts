import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('feed_events')
export class FeedEvent {

  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'event_type' })
  eventType: string;

  @Column({ name: 'stock_id' })
  stockId: number;

  @Column({ name: 'news_id', nullable: true })
  newsId: number;

  @Column({ name: 'event_time', type: 'timestamp' })
  eventTime: Date;

  @Column({ type: 'json', nullable: true })
  metadata: any;
}
