import { Request, Response } from 'express';
import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryInfo } from '../types/cloudinary';

interface MulterRequest extends Request {
  files: Express.Multer.File[];
}

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const uploadToCloudinary = async (req: Request, res: Response) => {
  try {
    const { files } = req as MulterRequest;

    if (!req.files) {
      res.status(400).json({ error: 'No file provided' });
      return;
    }

    const uploadRes = await new Promise((resolve, reject) => {
      const onUploaded = (error: any, result: any) => {
        if (error) {
          reject(error);
        } else {
          resolve(result);
        }
      };

      cloudinary.uploader
        .upload_stream(
          {
            resource_type: 'image',
            use_filename: true,
            unique_filename: true,
          },
          onUploaded
        )
        .end(files[0].buffer);
    });

    const { public_id: publicId, secure_url: secureUrl } =
      uploadRes as CloudinaryInfo;

    res.status(201).send({ publicId, secureUrl });
  } catch (error) {
    console.error('Error uploading to Cloudinary:', error);
    res.status(500).send(error);
  }
};
