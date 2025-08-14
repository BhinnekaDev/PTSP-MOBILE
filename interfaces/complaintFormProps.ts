import { UploadFileProps } from '@/interfaces/uploadFileProps';

export interface ComplaintFormProps {
  fullName: string;
  setFullName: (val: string) => void;
  email: string;
  setEmail: (val: string) => void;
  text: string;
  setText: (val: string) => void;
  file?: UploadFileProps | null;
  handlePickFile: () => void;
  handleRemoveFile: () => void;
  openPreview: () => void;
  onSubmit: () => void;
}
