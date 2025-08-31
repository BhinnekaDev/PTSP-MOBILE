export type Message = {
  id: string;
  text: string;
  time: Date;
  sender: 'me' | 'other';
};

export interface ChatMessageProps {
  msg: Message;
  expandedIdR: string | null;
  expandedIdL: string | null;
  toggleExpandedR: (id: string) => void;
  toggleExpandedL: (id: string) => void;
  setSelectedMessage: (msg: Message) => void;
  setShowOptionMessage: (val: boolean) => void;
  setShowEmojiPicker: (val: boolean) => void;
  setShowAttachmentOptions: (val: boolean) => void;
}
