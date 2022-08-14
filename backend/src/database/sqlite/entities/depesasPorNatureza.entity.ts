import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('despesasPorNatureza')
export class DespesasPorNatureza {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  matricula: string;

  @Column()
  naturezaDespesas: string;

  @Column()
  valor: number;
}
