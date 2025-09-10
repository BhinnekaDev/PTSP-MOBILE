export interface ChatRoom {
  id: string;
  roomChat: string;
  pesanTerakhir: string;
  peserta: string[];
  instansi?: string;
  terakhirDiperbarui: any;
  tipePeserta?: string[];
  unreadCount?: number;
}

export interface FirestoreMessage {
  id: string;
  roomId: string;
  isi: string;
  idPengirim: string;
  waktu: any;
  sudahDibaca: boolean;
  namaFile?: string | null;
  urlFile?: string | null;
  tipePengirim: string;
  mimeType?: string | null;
  base64?: string | null;
}
