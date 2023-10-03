import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import Announcement from './announcements.entity';

@Entity('images')
class Image {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: '280' })
  image_url: string;

  // Relacionamento N:1 com announcement (FK da relação):
  @ManyToOne(() => Announcement, (announcement) => announcement.images, { onDelete: 'CASCADE' })
  announcement: Announcement;
}

export default Image;
