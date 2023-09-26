import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import User from './users.entity';
import Announcement from './announcements.entity';

// Pivot:
@Entity('comments')
class Comment {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ type: 'text', nullable: true })
  comment: string | undefined | null;

  // Relacionamento N:1 com user (FK da relação):
  @ManyToOne(() => User, (user) => user.comment)
  user: User;

  // Relacionamento N:1 com announcement (FK da relação):
  @ManyToOne(() => Announcement, (announcement) => announcement.comment)
  announcement: Announcement;
}

export default Comment;
