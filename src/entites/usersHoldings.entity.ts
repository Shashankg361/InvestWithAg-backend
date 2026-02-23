import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    JoinColumn,
    UpdateDateColumn,
    Unique,
  } from 'typeorm';
  import { usersEntity } from './users.entity';
  import { Stock } from './stock.entity'; 
   
  @Unique(['user', 'stock']) // prevents duplicate stock for same user
  @Entity('user_holdings')
  export class UserHolding {
  
    @PrimaryGeneratedColumn()
    id: number;
  
    @ManyToOne(() => usersEntity) 
    @JoinColumn({ name: 'user_id' })
    user: usersEntity;
  
    @ManyToOne(() => Stock)
    @JoinColumn({ name: 'stock_id' })
    stock: Stock;
  
    @Column({ type: 'int' })
    quantity: number;
  
    @Column({ name: 'avg_buy_price', type: 'numeric', precision: 15, scale: 2 })
    avgBuyPrice: number;
  
    @UpdateDateColumn({ name: 'last_updated_at' })
    lastUpdatedAt: Date;
  }
   