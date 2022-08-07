import { DataSource } from 'typeorm';
import Path from 'path';
import { entities } from './entities';

const path = Path.resolve(__dirname, '..', '..', '..', '..', 'rpa', 'src', 'database', 'default.sqlite');

console.log(path);

const SqliteDataSource = new DataSource({
  type: 'better-sqlite3',
  database: path,
  entities
});

SqliteDataSource.initialize()
  .then(() => {
    console.log('SQLite Data Source has been initialized!');
  })
  .catch((err) => {
    console.error('Error loading SQLite Data Source', err);
  })

export { SqliteDataSource };
