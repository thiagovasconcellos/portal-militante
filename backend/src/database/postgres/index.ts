import { DataSource } from 'typeorm';
import { entities } from './entities';
import { migrations } from './migrations';

const PostgresDataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'Thiago@123',
  database: 'portalMilitante',
  logging: true,
  entities,
  migrations,
});

PostgresDataSource.initialize()
  .then(() => {
    console.log('Postgres Data Source has been initialized!');
  })
  .catch((err) => {
    console.error('Error loading Postgres Data Source', err);
  })

export { PostgresDataSource };