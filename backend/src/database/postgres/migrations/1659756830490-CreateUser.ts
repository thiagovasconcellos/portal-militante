import { MigrationInterface, QueryRunner, Table } from "typeorm"

export class CreateUser1659756830490 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
          new Table({
            name: 'users',
            columns: [
              {
                name: 'id',
                type: 'uuid',
                isPrimary: true,
                generationStrategy: 'uuid',
                default: 'uuid_generate_v4()',
              },
              {
                name: 'login',
                type: 'varchar',
                length: '50'
              },
              {
                name: 'email',
                type: 'varchar',
                length: '100'
              },
              {
                name: 'password',
                type: 'varchar'
              }
            ],
          })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.dropTable('users');
    }

}
