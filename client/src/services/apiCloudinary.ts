const BASE_URL = 'http://localhost:3000';

export const uploadFileToCloudinary = async (file: File) => {
  try {
    const formData = new FormData();
    formData.append('file', file);

    const url = `${BASE_URL}/image`;
    const options = {
      method: 'POST',
      body: formData,
    };

    const res = await fetch(url, options);
    const info = await res.json();

    return info;
  } catch (error) {
    console.log('eer-->', error);
    throw error;
  }
};

export const deleteFileFromCloudinary = async (publicId: string) => {
  try {
    const url = `${BASE_URL}/image/${publicId}`;
    const options = {
      method: 'DELETE',
    };

    const res = await fetch(url, options);
    console.log(res.json());
  } catch (error) {
    console.log('eer-->', error);
    throw error;
  }
};
