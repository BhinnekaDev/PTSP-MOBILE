// components/ChatMessage.tsx
import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

// OUR INTERFACES
import { ChatMessageProps } from '@/interfaces/uiMessagesProps';

export default function ChatMessage({
  msg,
  expandedIdR,
  expandedIdL,
  toggleExpandedR,
  toggleExpandedL,
  setSelectedMessage,
  setShowOptionMessage,
  setShowEmojiPicker,
  setShowAttachmentOptions,
}: ChatMessageProps) {
  const isExpanded =
    msg.sender === 'me' ? expandedIdR === msg.id : expandedIdL === msg.id;
  const isLongText = msg.text.length > 205;
  const previewText = msg.text.slice(0, 205) + '...';

  const messageBg = msg.sender === 'me' ? 'bg-[#72C02C]' : 'bg-[#1475BA]';
  const readMoreColor =
    msg.sender === 'me' ? 'text-[#1475BA]' : 'text-[#72C02C]';

  return (
    <View
      key={msg.id}
      className={`w-full flex-row ${msg.sender === 'me' ? 'justify-end' : 'justify-start'}`}
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
        {/* TEXT PESAN */}
        <Text style={{ fontFamily: 'LexRegular' }} className="text-white">
          {isExpanded || !isLongText ? msg.text : previewText}
        </Text>

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
                  ? toggleExpandedR(msg.id)
                  : toggleExpandedL(msg.id)
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
