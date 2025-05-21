export interface UploadFileProps {
  uri: string;
  mimeType: string;
  base64: string | null;
  size: number;
  name: string;
}
