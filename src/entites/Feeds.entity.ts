import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('feeds')
export class Feed {

  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'feed_event_id' })
  feedEventId: number;

  @Column({ name: 'ai_title' })
  aiTitle: string;

  @Column({ name: 'ai_summary', type: 'text' })
  aiSummary: string;

  @Column({ name: 'created_at', type: 'timestamp' })
  createdAt: Date;
}
