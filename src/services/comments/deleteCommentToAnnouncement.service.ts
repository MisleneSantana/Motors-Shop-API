import { AppError } from '../../errors/error';
import { commentRepo } from '../../repositories';

export const deleteCommentToAnnouncementService = async (commentId: string): Promise<void> => {
  const comment = await commentRepo.findOne({ where: { id: commentId } });
  if (!comment) throw new AppError('Comment not found', 404);

  await commentRepo.remove(comment);
};
