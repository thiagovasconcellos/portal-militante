import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('deputadoPerfil')
export class DeputadoPerfil {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  matricula: string;

  @Column()
  avatar: string;

  @Column()
  email: string;

  @Column()
  telefone: string;

  @Column()
  biografia: string;
}
