import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('deputados')
export class Deputado {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  matricula: string;

  @Column()
  deputado: string;

  @Column()
  partido: string;

  @Column()
  legislatura: number;

  @Column()
  periodo: string;
}
