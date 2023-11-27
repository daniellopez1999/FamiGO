import { CloudinaryInfo } from '../types/cloudinary';

const UPLOAD_ACTION = 'image/upload';
const DESTROY_ACTION = 'image/destroy';

const CLOUDINARY_BASE_URL = import.meta.env.VITE_CLOUDINARY_BASE_URL;
const CLOUDINARY_UPLOAD_PRESETS = import.meta.env
  .VITE_CLOUDINARY_UPLOAD_PRESETS;
const CLOUDINARY_API_KEY = import.meta.env.VITE_CLOUDINARY_API_KEY;

export const uploadFileToCloudinary = async (file: File) => {
  try {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESETS);

    const url = `${CLOUDINARY_BASE_URL}/${UPLOAD_ACTION}`;
    const options = {
      method: 'POST',
      body: formData,
    };

    const res = await fetch(url, options);
    const data = (await res.json()) as CloudinaryInfo;
    const { secure_url: fileUrl, signature, public_id: publicId } = data;

    const info = {
      fileUrl,
      signature,
      publicId,
    };

    console.log(info);

    return info;
  } catch (error) {
    console.log('eer-->', error);
    throw error;
  }
};

// not used
export const deleteFileFromCloudinary = async (info: any) => {
  try {
    const { signature, publicId } = info;

    const formData = new FormData();
    formData.append('public_id', publicId);
    formData.append('signature', signature);
    formData.append('api_key', CLOUDINARY_API_KEY);
    formData.append('timestamp', Date.now().toString());

    const url = `${CLOUDINARY_BASE_URL}/${DESTROY_ACTION}`;
    const options = {
      method: 'POST',
      body: formData,
    };

    const res = await fetch(url, options);
    console.log(res.json());
  } catch (error) {
    console.log('eer-->', error);
    throw error;
  }
};
