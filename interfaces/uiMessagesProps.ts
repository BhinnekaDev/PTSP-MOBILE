import { UploadFileProps } from '@/interfaces/uploadFileProps';

export interface UIMessage {
  id: string;
  sender: 'me' | 'other';
  text: string;
  time: Date;
  sudahDibaca: boolean;
  namaFile?: string | null;
  urlFile?: string | null;
  mimeType?: string | null; // ⬅️ Tambahkan ini
  base64?: string | null; // optional kalau kamu mau preview pdf inline
}

export interface ChatMessageProps {
  msg: UIMessage;
  expandedMessageIdRight: string | null;
  expandedMessageIdLeft: string | null;
  toggleExpandedMessageRight: (id: string) => void;
  toggleExpandedMessageLeft: (id: string) => void;
  setSelectedMessage: (msg: UIMessage) => void;
  setShowOptionMessage: (val: boolean) => void;
  setShowEmojiPicker: (val: boolean) => void;
  setShowAttachmentOptions: (val: boolean) => void;
  // ✅ pakai UploadFileProps
  openPreview: (file: UploadFileProps) => void;
}
