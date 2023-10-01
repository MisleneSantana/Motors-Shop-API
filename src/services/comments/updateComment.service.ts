import { Comment } from '../../entities';
import { AppError } from '../../errors/error';
import { TComment, TCommentUpdate } from '../../interfaces/comment.interfaces';
import { commentRepo } from '../../repositories';

export const updateCommentService = async (commentId: string, commentData: TCommentUpdate): Promise<TComment> => {
  const foundComment: Comment | null = await commentRepo.findOne({ where: { id: commentId } });

  if (!foundComment) throw new AppError('Comment not found', 404);

  const commentUpdated: Comment = commentRepo.create({
    ...foundComment,
    ...commentData,
  });

  await commentRepo.save(commentUpdated);

  return commentUpdated;
};
