export interface UIMessage {
  id: string;
  sender: 'me' | 'other';
  text: string;
  time: Date;
  sudahDibaca: boolean;
  
}

export interface ChatMessageProps {
  msg: UIMessage;
  expandedIdR: string | null;
  expandedIdL: string | null;
  toggleExpandedR: (id: string) => void;
  toggleExpandedL: (id: string) => void;
  setSelectedMessage: (msg: UIMessage) => void;
  setShowOptionMessage: (val: boolean) => void;
  setShowEmojiPicker: (val: boolean) => void;
  setShowAttachmentOptions: (val: boolean) => void;
}
