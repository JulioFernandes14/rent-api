import { DataSource } from 'typeorm';
import { RentEntity } from './rent/entities/rent.entity';
import { RentItemEntity } from './rent/entities/rent-item.entity';
import { UserEntity } from './users/entities/user.entity';

export default new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'root1',
  database: 'rentdb',
  entities: [RentEntity, RentItemEntity, UserEntity],
  migrations: ['src/migrations/*.ts'],
});
