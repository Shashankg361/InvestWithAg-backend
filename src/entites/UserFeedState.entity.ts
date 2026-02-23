import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('user_feed_state')
export class UserFeedState {

  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'user_id' })
  userId: number;

  @Column({ name: 'feed_id' })
  feedId: number;

  @Column({ name: 'is_read', default: false })
  isRead: boolean;

  @Column({ name: 'delivered_at', type: 'timestamp' })
  deliveredAt: Date;
}
