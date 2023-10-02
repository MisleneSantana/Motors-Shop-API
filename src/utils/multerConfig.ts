import { Request } from 'express';
import multer from 'multer';

export const upload = multer({
  storage: multer.diskStorage({
    destination: 'upload',
    filename: (
      request: Request,
      file: Express.Multer.File,
      callback: (error: Error | null, filename: string) => void
    ) => {
      const filename = `${file.originalname}`;

      return callback(null, filename);
    },
  }),
});

// Definição do middleware 'upload' indicando como destino
// dos arquivos o diretório 'uploads/'.

// Se o diretório não existir, é criado no momento de
// salvar o primeiro arquivo.
// filename é uma função utilizada para definir o nome
// do arquivo recebido, nesse caso estamos mantendo o nome original
