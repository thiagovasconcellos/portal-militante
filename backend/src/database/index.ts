import { DataSource, DataSourceOptions } from 'typeorm';
import Path from 'path';
import { entities as sqlLiteEntities } from './sqlite/entities';
import { entities as mssqlEntities } from './mssql/entities';

const path = Path.resolve(__dirname, '..', '..', '..', 'rpa', 'src', 'database', 'default.sqlite');

console.log(path);

const SqliteDataSource = new DataSource({
  type: 'better-sqlite3',
  database: path,
  entities: sqlLiteEntities
});

SqliteDataSource.initialize()
  .then(() => {
    console.log('SQLite Data Source has been initialized!');
  })
  .catch((err) => {
    console.error('Error loading SQLite Data Source', err);
  })

const MssqlDataSource = new DataSource({
  type: 'mssql',
  host: 'localhost',
  port: 1443,
  username: 'sa',
  password: 'Thiago@123',
  database: 'portalMilitante',
  entities: mssqlEntities,
});

MssqlDataSource.initialize()
  .then(() => {
    console.log('MSSQL Data Source has been initialized!');
  })
  .catch((err) => {
    console.error('Error loading MSSQL Data Source', err);
  })

export { SqliteDataSource, MssqlDataSource };
