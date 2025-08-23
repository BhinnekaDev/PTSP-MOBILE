import * as FileSystem from 'expo-file-system';
import { Asset } from 'expo-asset';

export async function getBase64Image(localImage: any): Promise<string> {
  const asset = Asset.fromModule(localImage);
  await asset.downloadAsync();
  const base64 = await FileSystem.readAsStringAsync(asset.localUri!, {
    encoding: FileSystem.EncodingType.Base64,
  });
  return `data:image/png;base64,${base64}`;
}
