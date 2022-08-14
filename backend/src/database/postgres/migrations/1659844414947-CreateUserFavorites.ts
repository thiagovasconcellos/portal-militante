import { MigrationInterface, QueryRunner, Table } from "typeorm"

export class CreateUserFavorites1659844414947 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
         await queryRunner.createTable(
          new Table({
            name: 'usersFavorites',
            columns: [
              {
                name: 'id',
                type: 'uuid',
                isPrimary: true,
                generationStrategy: 'uuid',
                default: 'uuid_generate_v4()',
              },
              {
                name: 'userId',
                type: 'uuid'
              },
              {
                name: 'matricula',
                type: 'varchar',
                length: '8'
              },
              {
                name: 'active',
                type: 'boolean',
                default: true
              }
            ],
          })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('usersFavorites');
    }

}
