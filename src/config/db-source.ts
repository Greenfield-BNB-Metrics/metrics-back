import { DataSource, DataSourceOptions } from 'typeorm';
import * as dotenv from 'dotenv';

dotenv.config({ path: `.${process.env.NODE_ENV}.env` });
export const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  host: process.env.POSTGRES_HOST,
  port: Number(process.env.POSTGRES_PORT),
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
  entities: ['dist/**/*.model.js'],
  migrations: ['dist/migrations/*.js'],
  synchronize: true,
};

const dataSource = new DataSource(dataSourceOptions);
export default dataSource;
