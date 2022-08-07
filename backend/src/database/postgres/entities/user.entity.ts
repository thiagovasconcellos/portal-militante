import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"

@Entity('users')
export class User {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column()
    login: string

    @Column()
    email: string

    @Column({ select: false })
    password: string
}