import { Announcement, User } from '../../entities';
import { AppError } from '../../errors/error';
import { TComment, TCommentCreate } from '../../interfaces/comment.interfaces';
import { announcementRepo, commentRepo, userRepo } from '../../repositories';
import { commentReturnSchema } from '../../schemas/comment.schema';

export const createCommentToAnnouncementService = async (
  userId: string,
  announcementId: string,
  commentData: TCommentCreate
): Promise<TComment> => {
  const announcement: Announcement | null = await announcementRepo.findOne({
    where: { id: announcementId },
  });
  if (!announcement) throw new AppError('Announcement not found', 404);

  const ownerComment: User | null = await userRepo.findOne({
    where: { id: userId },
  });
  if (!ownerComment) throw new AppError('User not found', 404);

  const newComment = commentRepo.create({
    ...commentData,
    announcement: announcement,
    user: ownerComment,
  });

  await commentRepo.save(newComment);

  return commentReturnSchema.parse(newComment);
};
