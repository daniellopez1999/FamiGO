import { useState, ChangeEvent } from 'react';
import { uploadFileToCloudinary } from '../../services/apiCloudinary';

import Logo from '../../assets/logo.png';
import './ActivityForm.css';

const tempImg = Logo;

type FileInfo = {
  secureUrl: string;
  publicId: string;
};

const ActivityForm = () => {
  const [fileInfo, setFileInfo] = useState<FileInfo>({} as FileInfo);
  const [isFileUploading, setIsFileUploading] = useState(false);

  const handleFileChange = async (event: ChangeEvent<HTMLInputElement>) => {
    try {
      event.preventDefault();
      setIsFileUploading(true);

      const file = event.target.files![0];
      const info = (await uploadFileToCloudinary(file)) as FileInfo;

      setFileInfo(info);
      setIsFileUploading(false);
    } catch (error) {
      console.log('Upload file error!');
    }
  };

  // todo: delete file
  // todo: upload multiple files

  return (
    <div className="activity-form">
      <div className="file-upload-container">
        <div className="file-container">
          {isFileUploading ? (
            <img className="spinner" src={tempImg} alt="spinner" />
          ) : (
            <img src={fileInfo.secureUrl || tempImg} alt="uploaded image" />
          )}
        </div>
        <div className="file-input-container">
          <input type="file" onChange={handleFileChange} />
          <label>upload a image</label>
        </div>
      </div>
    </div>
  );
};

export default ActivityForm;
