import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import User from './users.entity';
import Image from './images.entity';
import Comment from './comments.entity';

@Entity('announcements')
class Announcement {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: '15' })
  brand: string;

  @Column({ type: 'varchar', length: '20' })
  model: string;

  @Column({ type: 'varchar' })
  year: string;

  @Column({ type: 'varchar', length: '15' })
  fuel: string;

  @Column({ type: 'integer' })
  km: number;

  @Column({ type: 'varchar', length: '15' })
  color: string;

  @Column({ type: 'decimal', precision: 9, scale: 2, default: 0 })
  table_price: number | string;

  @Column({ type: 'decimal', precision: 9, scale: 2, default: 0 })
  price: number | string;

  @Column({ type: 'text', nullable: true, default: null })
  description?: string | undefined | null;

  @Column({ type: 'varchar', length: '280' })
  cover_image_url: string;

  @Column({ default: true })
  announcement_is_active: boolean;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: string;

  // Relacionamento N:1 com user (FK da relação):
  @ManyToOne(() => User, (user) => user.announcements, { onDelete: 'CASCADE' })
  user: User;

  // Relacionamento 1:N com image:
  @OneToMany(() => Image, (image) => image.announcement)
  images: Array<Image>;

  // Relacionamento 1:N com comments:
  @OneToMany(() => Comment, (comment) => comment.announcement)
  comments: Array<Comment>;
}

export default Announcement;
