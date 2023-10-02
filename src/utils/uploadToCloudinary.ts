import { v2 as cloudinary } from 'cloudinary';
// import { Express } from 'express';

export const uploadToCloudinary = async (file: Express.Multer.File) => {
  try {
    const upload = await cloudinary.uploader.upload(file.path);
    return upload.secure_url;
  } catch (error) {
    console.log(error);
  }
};

// cloudinary.uploader.upload é o método que utilizamos para o upload.
// req.file!.path é o caminho da nossa imagem salva pelo multer na pasta upload.
//fs é uma lib nativa do node.js para manipulação do sistema operacional.
//fs.unlink esta apagando o arquivo da pasta upload após o envio ao cloudinary.
// O valor de public_id foi gerado automaticamente e será a chave para recuperar essa imagem posteriormente. Note que a url gerada .para a imagem no servidor procura pelo arquivo kgnd2p0ne5xiypyqhw6c.png, isto é, o public_id acrescido da extensão .png.
