import { Request, Response } from 'express';
import { updateCommentService } from '../../services/comments/updateComment.service';
import { TComment, TCommentUpdate } from '../../interfaces/comment.interfaces';

export const updateCommentController = async (req: Request, res: Response): Promise<Response> => {
  const commentId: string = req.params.id;
  const commentData: TCommentUpdate = req.body;

  const comment: TComment = await updateCommentService(commentId, commentData);
  return res.status(200).json(comment);
};
