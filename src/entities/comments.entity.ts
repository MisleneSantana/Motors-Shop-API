import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import User from './users.entity';
import Announcement from './announcements.entity';

// Pivot:
@Entity('comments')
class Comment {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'text' })
  comment: string;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: string;

  // Relacionamento N:1 com user (FK da relação):
  @ManyToOne(() => User, (user) => user.comments)
  user: User;

  // Relacionamento N:1 com announcement (FK da relação):
  @ManyToOne(() => Announcement, (announcement) => announcement.comments)
  announcement: Announcement;
}

export default Comment;
