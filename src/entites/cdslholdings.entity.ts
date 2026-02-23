import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

@Entity('cdsl_holdings')

export class cdslHoldingsEntity{
    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    demat_account_id:number;

    @Column()
    isin:string;

    @Column()
    quantity:number;

    @Column()
    avg_price:number;

    @Column()
    updated_at:Date;
}