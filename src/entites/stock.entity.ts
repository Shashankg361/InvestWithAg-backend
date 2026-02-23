import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    Unique,
  } from 'typeorm';
  
  @Unique(['symbol', 'exchange']) // same symbol can exist on different exchanges
  @Unique(['isin'])               // ISIN must always be unique
  @Entity('stocks')
  export class Stock {
  
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column({ length: 20 })
    symbol: string;
  
    @Column({ name: 'company_name', length: 150 })
    companyName: string;
  
    @Column({ length: 20 })
    exchange: string; // NSE / BSE etc
  
    @Column({ length: 100, nullable: true })
    sector: string;
  
    @Column({ length: 20 })
    isin: string;
  }
  