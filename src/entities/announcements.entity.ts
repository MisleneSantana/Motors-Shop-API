import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import User from './users.entity';
import Image from './images.entity';
import Comment from './comments.entity';

@Entity('announcements')
class Announcement {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ type: 'varchar', length: '15' })
  brand: string;

  @Column({ type: 'varchar', length: '20' })
  model: string;

  @Column({ type: 'integer', length: '4' })
  year: number;

  @Column({ type: 'varchar', length: '15' })
  fuel: string;

  @Column({ type: 'integer', length: '6' })
  mileage: number;

  @Column({ type: 'varchar', length: '15' })
  color: string;

  @Column({ type: 'decimal', precision: 9, scale: 2, default: 0 })
  table_price: number | string;

  @Column({ type: 'decimal', precision: 9, scale: 2, default: 0 })
  price: number | string;

  @Column({ type: 'text', nullable: true })
  description: string | undefined | null;

  // Relacionamento N:1 com user (FK da relação):
  @ManyToOne(() => User, (user) => user.announcement)
  user: User;

  // Relacionamento 1:N com image:
  @OneToMany(() => Image, (image) => image)
  image: Image;

  // Relacionamento 1:N com comments:
  @OneToMany(() => Comment, (comment) => comment.announcement)
  comment: Comment;
}

export default Announcement;
