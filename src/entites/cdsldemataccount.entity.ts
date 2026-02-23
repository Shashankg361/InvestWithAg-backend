import {Column, Entity, PrimaryGeneratedColumn} from 'typeorm';

@Entity('cdsl_demat_accounts')
export class cdslDematAccountEntity{
    @PrimaryGeneratedColumn() 
    id:number;

    @Column()
    email:string;

    @Column()
    mobile:string;

    @Column()
    demat_account_no:string;

    @Column()
    broker_name:string;

    @Column()
    created_at:Date;

    @Column()
    pan:string;
    
    @Column()
    name:string;
}