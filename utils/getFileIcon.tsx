import { AntDesign, FontAwesome5, Ionicons } from '@expo/vector-icons';

const getFileIcon = (fileName: string) => {
  const extension = fileName.split('.').pop()?.toLowerCase();

  switch (extension) {
    case 'pdf':
      return <AntDesign name="pdffile1" size={40} color="#1475BA" />;
    case 'doc':
    case 'docx':
      return <FontAwesome5 name="file-word" size={40} color="black" />;
    case 'xls':
    case 'xlsx':
      return <FontAwesome5 name="file-excel" size={40} color="black" />;
    case 'jpg':
    case 'jpeg':
    case 'png':
    case 'gif':
      return <FontAwesome5 name="file-image" size={40} color="black" />;
    case 'mp4':
    case 'mov':
    case 'avi':
    case 'mkv':
      return <FontAwesome5 name="file-video" size={24} color="black" />;
    default:
      return <Ionicons name="document" size={40} color="#1475BA" />;
  }
};

export default getFileIcon;
