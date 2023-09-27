import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import User from './users.entity';

@Entity('address')
class Address {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column({ type: 'varchar', length: 8 })
  zip_code: string;

  @Column({ type: 'varchar', length: 2 })
  state: string;

  @Column({ type: 'varchar', length: 20 })
  city: string;

  @Column({ type: 'varchar', length: 45 })
  street: string;

  @Column({ type: 'varchar', length: 7 })
  number: string;

  @Column({ type: 'varchar', length: 25, nullable: true })
  complement?: string | undefined | null;

  // Relacionamento 1:1 com users - bidirectional:
  @OneToOne(() => User, (user) => user.address)
  user: User;
}

export default Address;
