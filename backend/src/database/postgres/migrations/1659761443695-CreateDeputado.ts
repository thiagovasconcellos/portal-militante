import { MigrationInterface, QueryRunner, Table } from "typeorm"

export class CreateDeputado1659761443695 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
          new Table({
            name: 'deputados',
            columns: [
              {
                name: 'id',
                type: 'uuid',
                isPrimary: true,
                generationStrategy: 'uuid',
                default: 'uuid_generate_v4()',
              },
              {
                name: 'matricula',
                type: 'varchar',
                length: '8'
              },
              {
                name: 'deputado',
                type: 'varchar'
              },
              {
                name: 'partido',
                type: 'varchar',
                length: '10'
              },
              {
                name: 'legislatura',
                type: 'int'
              },
              {
                name: 'periodo',
                type: 'varchar',
                length: '11'
              }
            ],
          })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('deputados');
    }

}
