import { Announcement, Comment } from '../../entities';
import { AppError } from '../../errors/error';
import { announcementRepo, commentRepo } from '../../repositories';
import { commentReadSchema } from '../../schemas/comment.schema';

export const readCommentsByAnnouncementService = async (announcementId: string) => {
  const foundAnnouncement: Announcement | null = await announcementRepo.findOne({
    where: { id: announcementId },
  });

  if (!foundAnnouncement) throw new AppError('Announcement not found', 404);

  const comments: Comment[] | null = await commentRepo.find({
    where: { announcement: { id: announcementId } },
    relations: {
      user: true,
      announcement: true,
    },
  });

  if (!comments || comments.length === 0) throw new AppError('This announcement has no comments', 404);

  return commentReadSchema.parse(comments);
};
