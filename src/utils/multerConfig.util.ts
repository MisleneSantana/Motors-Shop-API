import { Request } from 'express';
import path from 'path';
import multer from 'multer';

// Multer (lib) que permite realizar o parse do arquivo enviado pelo Multipart Form.
export const storage = multer.diskStorage({
  destination: (req: Request, file: Express.Multer.File, callback: (error: Error | null, filename: string) => void) => {
    callback(null, path.resolve('uploads'));
  },
  filename: (req, file, callback) => {
    const time = new Date().getTime();

    callback(null, `${time}_${file.originalname}`);
  },
});
