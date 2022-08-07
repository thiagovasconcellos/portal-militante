import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"

@Entity('usersFavorites')
export class UserFavorites {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column()
    userId: string

    @Column()
    matricula: string

    @Column()
    active: boolean
}