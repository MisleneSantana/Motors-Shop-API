import { getRounds, hashSync } from 'bcryptjs';
import { BeforeInsert, BeforeUpdate, Column, Entity, OneToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import Address from './address.entity';
import Announcement from './announcements.entity';
import Comment from './comments.entity';

@Entity('users')
class User {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ type: 'varchar', length: 50 })
  name: string;

  @Column({ type: 'varchar', length: 45, unique: true })
  email: string;

  @Column({ type: 'integer', length: 11 })
  cpf: number;

  @Column({ type: 'integer', unique: true })
  phone_number: number;

  @Column({ type: 'date' })
  birth_date: string;

  @Column({ type: 'text', nullable: true })
  description: string | undefined | null;

  @Column({ type: 'varchar', length: '15', default: 'Seller' })
  account_type: string;

  @Column({ type: 'varchar', length: 120 })
  password: string;

  // Relacionamento 1:1 com address:
  @OneToOne(() => Address, (address) => address.user)
  address: Address;

  // Relacionamento 1:N com announcement:
  @OneToMany(() => Announcement, (announcement) => announcement.user)
  announcement: Array<Announcement>;

  // Relacionamento 1:N com comments:
  @OneToMany(() => Comment, (comment) => comment.user)
  comment: Comment;

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
