import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('users')
export class usersEntity{
    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    name:string;

    @Column()
    email:string;

    @CreateDateColumn({name:'created_at'})
    createdDate:Date;

    @UpdateDateColumn({name:'updated_at'})
    updatedDate:Date;

    @Column({unique:true})
    pan:string;
}