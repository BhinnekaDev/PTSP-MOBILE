import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Linking,
  Alert,
} from 'react-native';
import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';

// OUR INTERFACES
import { ChatMessageProps } from '@/interfaces/uiMessagesProps';

export default function ChatMessage({
  msg,
  expandedMessageIdRight,
  expandedMessageIdLeft,
  toggleExpandedMessageRight,
  toggleExpandedMessageLeft,
  setSelectedMessage,
  setShowOptionMessage,
  setShowEmojiPicker,
  setShowAttachmentOptions,
  openPreview,
}: ChatMessageProps) {
  const isExpanded =
    msg.sender === 'me' ? expandedMessageIdRight === msg.id : expandedMessageIdLeft === msg.id;
  const isLongText = msg.text?.length > 205;
  const previewText = msg.text?.slice(0, 205) + '...';

  const messageBg = msg.sender === 'me' ? 'bg-[#72C02C]' : 'bg-[#1475BA]';
  const readMoreColor =
    msg.sender === 'me' ? 'text-[#1475BA]' : 'text-[#72C02C]';

  // Tentukan tipe file
  const fileName = msg.namaFile?.toLowerCase() || '';
  const isImage =
    msg.urlFile &&
    (fileName.endsWith('.jpg') ||
      fileName.endsWith('.jpeg') ||
      fileName.endsWith('.png') ||
      fileName.endsWith('.gif'));
  const isDocument =
    msg.urlFile &&
    (fileName.endsWith('.pdf') ||
      fileName.endsWith('.doc') ||
      fileName.endsWith('.docx') ||
      fileName.endsWith('.xls') ||
      fileName.endsWith('.xlsx'));

  return (
    <View
      key={msg.id}
      className={`w-full flex-row ${
        msg.sender === 'me' ? 'justify-end' : 'justify-start'
      }`}
    >
      <TouchableOpacity
        onLongPress={() => {
          setSelectedMessage(msg);
          setShowOptionMessage(true);
          setShowEmojiPicker(false);
          setShowAttachmentOptions(false);
        }}
        delayLongPress={400}
        activeOpacity={0.85}
        className={`${messageBg} my-2 mb-2 w-auto max-w-[70%] rounded-lg px-4 py-2`}
      >
        {msg.text ? (
          <Text
            style={{
              fontFamily: 'LexRegular',
              color: 'white',
              marginBottom: msg.urlFile ? 6 : 0,
            }}
          >
            {isExpanded || !isLongText ? msg.text : previewText}
          </Text>
        ) : null}

        {/* === FILE HANDLER === */}
        {msg.urlFile && (
          <>
            {isImage ? (
              // IMAGE PREVIEW
              <TouchableOpacity
                activeOpacity={0.7}
                onPress={() =>
                  openPreview({
                    uri: msg.urlFile || '',
                    name: msg.namaFile || 'image',
                    type: msg.mimeType || 'image/jpeg',
                    base64: msg.base64 || '',
                    mimeType: msg.mimeType || 'image/jpeg',
                    size: 0,
                    loading: false,
                    progress: 100,
                  })
                }
              >
                <Image
                  source={{ uri: msg.urlFile }}
                  style={{
                    width: 200,
                    height: 200,
                    borderRadius: 8,
                    backgroundColor: '#ddd',
                  }}
                  resizeMode="cover"
                />
              </TouchableOpacity>
            ) : isDocument ? (
              // DOCUMENT PREVIEW
              <TouchableOpacity
                activeOpacity={0.7}
                onPress={() =>
                  openPreview({
                    uri: msg.urlFile || '',
                    name: msg.namaFile || 'document',
                    type:
                      msg.mimeType ||
                      (fileName.endsWith('.pdf')
                        ? 'application/pdf'
                        : 'application/msword'),
                    base64: msg.base64 || '',
                    mimeType:
                      msg.mimeType ||
                      (fileName.endsWith('.pdf')
                        ? 'application/pdf'
                        : 'application/msword'),
                    size: 0,
                    loading: false,
                    progress: 100,
                  })
                }
              >
                <Text
                  style={{
                    fontFamily: 'LexRegular',
                    color: 'white',
                    textDecorationLine: 'underline',
                  }}
                >
                  📄 {msg.namaFile || 'Dokumen'}
                </Text>
              </TouchableOpacity>
            ) : (
              // OTHER FILES (fallback)
              <TouchableOpacity
                activeOpacity={0.7}
                onPress={async () => {
                  try {
                    if (!msg.urlFile) return;

                    const fileUri =
                      FileSystem.documentDirectory + (msg.namaFile || 'file');

                    const { uri } = await FileSystem.downloadAsync(
                      msg.urlFile,
                      fileUri
                    );

                    if (await Sharing.isAvailableAsync()) {
                      await Sharing.shareAsync(uri);
                    } else {
                      await Linking.openURL(msg.urlFile);
                    }
                  } catch (err) {
                    console.error('Gagal buka file:', err);
                    Alert.alert('Error', 'File tidak bisa dibuka');
                  }
                }}
              >
                <Text
                  style={{
                    fontFamily: 'LexRegular',
                    color: 'white',
                    textDecorationLine: 'underline',
                  }}
                >
                  📎 {msg.namaFile || 'File'}
                </Text>
              </TouchableOpacity>
            )}
          </>
        )}

        {/* FOOTER: BACA SELENGKAPNYA / WAKTU + STATUS */}
        <View
          className={`w-full ${
            isLongText
              ? 'flex-row items-center justify-between'
              : 'mt-1 self-end'
          }`}
        >
          {isLongText && (
            <TouchableOpacity
              onPress={() =>
                msg.sender === 'me'
                  ? toggleExpandedMessageRight(msg.id)
                  : toggleExpandedMessageLeft(msg.id)
              }
            >
              <Text
                style={{ fontFamily: 'LexRegular' }}
                className={`${readMoreColor} text-sm underline`}
              >
                {isExpanded ? 'Tampilkan lebih sedikit' : 'Baca Selengkapnya'}
              </Text>
            </TouchableOpacity>
          )}

          {/* Waktu + Status ✔/✔✔ */}
          <View className="ml-auto flex-row items-center">
            <Text
              style={{ fontFamily: 'LexRegular' }}
              className="px-1.5 text-xs text-white"
            >
              {msg.time.toLocaleTimeString([], {
                hour: '2-digit',
                minute: '2-digit',
              })}
            </Text>

            {msg.sender === 'me' && (
              <Text
                className="ml-1 text-xs"
                style={{
                  fontFamily: 'LexRegular',
                  color: msg.sudahDibaca ? '#1475BA' : 'white',
                }}
              >
                {msg.sudahDibaca ? '✔✔' : '✔'}
              </Text>
            )}
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
}
