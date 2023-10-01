import { Request, Response } from 'express';
import { readAnnouncementsBySellerService } from '../../services/announcements/readAnnouncementsBySeller.service';

export const readAnnouncementsBySellerController = async (req: Request, res: Response): Promise<Response> => {
  const userId: string = req.params.id;

  const announcementsBySeller = await readAnnouncementsBySellerService(userId);
  return res.status(200).json(announcementsBySeller);
};
