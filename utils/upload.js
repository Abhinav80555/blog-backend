import multer from 'multer';
import dotenv from 'dotenv';
import { GridFsStorage } from 'multer-gridfs-storage';

dotenv.config();

const storage = new GridFsStorage({
  url: `mongodb+srv://blog:${process.env.PASS}@cluster0.bumhe60.mongodb.net/?retryWrites=true&w=majority`,
  options: { useNewUrlParser: true },
  file: (request, file) => {
    const match = ["image/png", "image/jpg"];

    if (match.indexOf(file.memeType) === -1)
      return `${Date.now()}-blog-${file.originalname}`;

    return {
      bucketName: "photos",
      filename: `${Date.now()}-blog-${file.originalname}`
    }
  }
});

export default multer({ storage });