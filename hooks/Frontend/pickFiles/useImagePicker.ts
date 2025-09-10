import * as ImagePicker from 'expo-image-picker';
import { useState } from 'react';

// OUR INTERFACES
import { UploadFileProps } from '@/interfaces/uploadFileProps';

export const useImagePicker = () => {
  const [image, setImage] = useState<UploadFileProps | null>(null);

  const pickImage = async () => {
    try {
      const res = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        base64: true,
        quality: 0.8,
      });

      if (res.canceled || !res.assets?.[0]) return null;

      const img = res.assets[0];

      const pickedImage: UploadFileProps = {
        uri: img.uri,
        name: img.fileName || 'image.jpg',
        type: img.mimeType || 'image/jpeg',
        base64: img.base64 ?? '',
        mimeType: img.mimeType || 'image/jpeg',
        size: img.fileSize || 0,
        loading: false,
        progress: 0,
      };

      setImage(pickedImage);
      return pickedImage;
    } catch (err) {
      console.error('Error pick image:', err);
      return null;
    }
  };

  return { image, setImage, pickImage };
};
