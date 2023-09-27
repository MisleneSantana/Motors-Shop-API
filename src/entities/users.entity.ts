import { getRounds, hashSync } from 'bcryptjs';
import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import Address from './address.entity';
import Announcement from './announcements.entity';
import Comment from './comments.entity';

@Entity('users')
class User {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column({ type: 'varchar', length: 50 })
  name: string;

  @Column({ type: 'varchar', length: 45, unique: true })
  email: string;

  @Column({ type: 'varchar', length: '11', unique: true })
  cpf: string;

  @Column({ type: 'varchar', length: '12'})
  phone_number: string;

  @Column({ type: 'date' })
  birth_date: string;

  @Column({ type: 'text', nullable: true })
  description?: string | undefined | null;

  @Column({ type: 'varchar', length: '15' })
  account_type: string;

  @Column({ type: 'varchar', length: 120 })
  password: string;

  // Relacionamento 1:1 com address (contém a FK):
  @OneToOne(() => Address, (address) => address.user)
  @JoinColumn()
  address: Address;

  // Relacionamento 1:N com announcement:
  @OneToMany(() => Announcement, (announcement) => announcement.user)
  announcements: Array<Announcement>;

  // Relacionamento 1:N com comments:
  @OneToMany(() => Comment, (comment) => comment.user)
  comments: Array<Comment>;

  @BeforeInsert()
  @BeforeUpdate()
  hashPassword() {
    const isEncrypted: number = getRounds(this.password);
    if (!isEncrypted) {
      this.password = hashSync(this.password, 10);
    }
  }
}

export default User;
