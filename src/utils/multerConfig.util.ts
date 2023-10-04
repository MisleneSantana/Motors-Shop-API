import { Request } from 'express';
import path from 'path';
import multer from 'multer';

// 1. Multer (lib) que permite realizar o parse do arquivo(image) enviado pelo Multipart Form.
// 1.1 No momento está função não está sendo utilizada.
export const storage = multer.diskStorage({
  destination: (req: Request, file: Express.Multer.File, callback: (error: Error | null, filename: string) => void) => {
    callback(null, path.resolve('uploads'));
  },
  filename: (req, file, callback) => {
    const time = new Date().getTime();

    callback(null, `${time}_${file.originalname}`);
  },
});
