import React, { useRef, useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Modal,
  ToastAndroid,
  Platform,
} from "react-native";
import { useRouter } from "expo-router";
import * as Clipboard from "expo-clipboard";
// OUR ICONS
import Ionicons from "@expo/vector-icons/Ionicons";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import Entypo from "@expo/vector-icons/Entypo";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

type Message = {
  id: number;
  text: string;
  time: string;
  sender: "me" | "other";
};

export default function RoomChat() {
  const router = useRouter();
  const scrollViewRef = useRef<ScrollView>(null);
  const [expandedIdR, setExpandedIdR] = useState<number | null>(null);
  const [expandedIdL, setExpandedIdL] = useState<number | null>(null);
  const [showAttachmentOptions, setShowAttachmentOptions] = useState(false);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [showOptionMessage, setShowOptionMessage] = useState(false);
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);
  const [messageToDelete, setMessageToDelete] = useState<Message | null>(null);
  const [customAlertVisible, setCustomAlertVisible] = useState(false);

  const confirmDeleteMessage = (message: Message) => {
    setMessageToDelete(message);
    setCustomAlertVisible(true);
  };

  const [messagesToday, setMessagesToday] = useState<Message[]>([
    {
      id: 1,
      text: "Ini adalah pesan pendek.",
      time: "10:00",
      sender: "me",
    },
    {
      id: 2,
      text: "Ini adalah pesan yang lebih panjang untuk melihat apakah box akan mengikuti panjang teks namun tetap memiliki batas maksimal lebar tertentu seperti yang diminta. Ini adalah pesan yang lebih panjang untuk melihat apakah box akan mengikuti panjang teks namun tetap memiliki batas maksimal lebar tertentu seperti yang diminta.",
      time: "10:05",
      sender: "other",
    },
    {
      id: 3,
      text: "Pesan lainnya yang sedang diuji.",
      time: "10:10",
      sender: "me",
    },
  ]);
  const [inputText, setInputText] = useState("");

  const toggleExpandedR = (id: number) => {
    setExpandedIdR((prev: number | null) => (prev === id ? null : id));
  };

  const toggleExpandedL = (id: number) => {
    setExpandedIdL((prev: number | null) => (prev === id ? null : id));
  };

  const handleSendMessage = () => {
    if (!inputText.trim()) return;

    const now = new Date();
    const timeStr = now.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });

    const myMessage: Message = {
      id: Date.now(),
      text: inputText,
      time: timeStr,
      sender: "me",
    };

    const replyMessage: Message = {
      id: Date.now() + 1,
      text: "Terima kasih atas pesan Anda. Kami akan segera menindaklanjuti.",
      time: timeStr,
      sender: "other",
    };

    setMessagesToday((prev) => [...prev, myMessage, replyMessage]);
    setInputText("");
  };

  useEffect(() => {
    scrollViewRef.current?.scrollToEnd({ animated: true });
  }, [messagesToday]);

  return (
    <View className="flex-1">
      <View className="bg-[#1475BA] flex-row w-full items-center px-4 py-4 rounded-b-[10px] shadow-md gap-4">
        <TouchableOpacity
          onPress={() => router.back()}
          className="rounded-full p-1"
        >
          <Ionicons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
        <View className="bg-gray-300 rounded-full p-2">
          <FontAwesome6 name="mountain" size={24} color="#3498DB" />
        </View>
        <View className="flex-1">
          <Text
            style={{ fontFamily: "LexBold" }}
            className="text-lg text-white"
          >
            Stasiun Meteorologi
          </Text>
          <Text style={{ fontFamily: "LexRegular" }} className="text-white">
            Online
          </Text>
        </View>
      </View>
      <ScrollView
        ref={scrollViewRef}
        contentContainerStyle={{ paddingBottom: 10, paddingHorizontal: 10 }}
        showsVerticalScrollIndicator={false}
      >
        <View className="mt-4">
          <Text
            style={{ fontFamily: "LexRegular" }}
            className="bg-gray-300 text-gray-700 px-2 py-1 rounded-lg mb-2 self-center"
          >
            Kemarin
          </Text>

          {messagesToday.map((msg) => {
            const isExpanded =
              msg.sender === "me"
                ? expandedIdR === msg.id
                : expandedIdL === msg.id;
            const isLongText = msg.text.length > 205;
            const previewText = msg.text.slice(0, 205) + "...";

            const messageBg =
              msg.sender === "me" ? "bg-[#72C02C]" : "bg-[#1475BA]";
            const readMoreColor =
              msg.sender === "me" ? "text-[#1475BA]" : "text-[#72C02C]";

            return (
              <View
                key={msg.id}
                className={`w-full flex-row ${msg.sender === "me" ? "justify-end" : "justify-start"}`}
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
                  className={`${messageBg} px-4 py-2 rounded-lg mb-2 max-w-[70%] w-auto my-2`}
                >
                  <Text
                    style={{ fontFamily: "LexRegular" }}
                    className="text-white"
                  >
                    {isExpanded || !isLongText ? msg.text : previewText}
                  </Text>

                  <View
                    className={`w-full ${
                      isLongText
                        ? "flex-row items-center justify-between"
                        : "self-end mt-1"
                    }`}
                  >
                    {isLongText && (
                      <TouchableOpacity
                        onPress={() =>
                          msg.sender === "me"
                            ? toggleExpandedR(msg.id)
                            : toggleExpandedL(msg.id)
                        }
                      >
                        <Text
                          style={{ fontFamily: "LexRegular" }}
                          className={`${readMoreColor} underline text-sm`}
                        >
                          {isExpanded
                            ? "Tampilkan lebih sedikit"
                            : "Baca Selengkapnya"}
                        </Text>
                      </TouchableOpacity>
                    )}
                    <Text
                      style={{ fontFamily: "LexRegular" }}
                      className="text-black bg-white text-xs px-1.5 rounded-full ml-auto"
                    >
                      {msg.time}
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>
            );
          })}
        </View>
      </ScrollView>
      <View className="px-5 pt-2 mb-5">
        <View className="flex-row items-center justify-center p-2 border border-gray-300 rounded-xl">
          <TouchableOpacity
            onPress={() => {
              setShowEmojiPicker((prev) => !prev);
              setShowAttachmentOptions(false);
              setSelectedMessage(null);
            }}
          >
            <Entypo
              name="emoji-happy"
              size={24}
              className="bg-gray-300 rounded-full p-2"
              color="black"
            />
          </TouchableOpacity>

          <TextInput
            className="flex-1 mx-2"
            placeholder="Ketik Pesan"
            placeholderTextColor="#999"
            value={inputText}
            onChangeText={setInputText}
            onSubmitEditing={handleSendMessage}
            style={{
              fontFamily: "LexRegular",
            }}
          />

          <TouchableOpacity
            onPress={() => {
              setShowAttachmentOptions((prev) => !prev);
              setShowEmojiPicker(false);
              setSelectedMessage(null);
            }}
          >
            <Entypo
              name="attachment"
              className="bg-gray-300 rounded-full p-2 mr-4"
              size={20}
              color="black"
            />
          </TouchableOpacity>

          <TouchableOpacity onPress={handleSendMessage}>
            <Ionicons
              name="send"
              className="bg-gray-300 rounded-full p-2"
              size={20}
              color="black"
            />
          </TouchableOpacity>
        </View>
        {showEmojiPicker && (
          <View className="pt-2">
            <ScrollView
              style={{ maxHeight: 205 }}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{
                flexDirection: "row",
                flexWrap: "wrap",
                gap: 12,
              }}
            >
              {[
                "🙂",
                "😊",
                "😉",
                "😌",
                "😅",
                "🤔",
                "😐",
                "🙃",
                "😇",
                "👍",
                "👏",
                "🙏",
                "🤝",
                "🙌",
                "✅",
                "📅",
                "📌",
                "📍",
                "📤",
                "📥",
                "📈",
                "📊",
                "💼",
                "📋",
                "🗂️",
                "📝",
                "📧",
                "💬",
                "📎",
                "🗒️",
                "📁",
                "📂",
                "🗃️",
                "📜",
                "📇",
                "🔒",
                "🔓",
                "🔑",
                "⚙️",
                "🧭",
                "🕒",
                "📞",
                "🔔",
                "🚨",
                "🔍",
                "🛠️",
              ].map((emoji, index) => (
                <TouchableOpacity
                  key={index}
                  onPress={() => {
                    setInputText((prev) => prev + emoji);
                    setShowEmojiPicker(false);
                  }}
                  className="p-2 bg-gray-200 rounded-full"
                >
                  <Text className="text-2xl">{emoji}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        )}
        {showAttachmentOptions && (
          <View className="p-4 flex-row items-center justify-between">
            <TouchableOpacity className="gap-1">
              <View className="items-center bg-gray-200 border border-gray-300 rounded-full p-4">
                <MaterialCommunityIcons
                  name="file-document"
                  size={30}
                  color="#4B0082"
                />
              </View>
              <Text
                className="text-black text-sm text-center"
                style={{ fontFamily: "LexMedium" }}
              >
                Dokumen
              </Text>
            </TouchableOpacity>

            <TouchableOpacity className="gap-1">
              <View className="items-center bg-gray-200 border border-gray-300 rounded-full p-4">
                <MaterialCommunityIcons
                  name="image-multiple"
                  size={30}
                  color="#10B981"
                />
              </View>
              <Text
                className="text-black text-sm text-center"
                style={{ fontFamily: "LexMedium" }}
              >
                Galeri
              </Text>
            </TouchableOpacity>

            <TouchableOpacity className="gap-1">
              <View className="items-center bg-gray-200 border border-gray-300 rounded-full p-4">
                <MaterialCommunityIcons
                  name="camera"
                  size={30}
                  color="#EF4444"
                />
              </View>
              <Text
                className="text-black text-sm text-center"
                style={{ fontFamily: "LexMedium" }}
              >
                Kamera
              </Text>
            </TouchableOpacity>
          </View>
        )}
        {selectedMessage && (
          <View className="p-4 flex-row items-center justify-center gap-12">
            <TouchableOpacity
              className="items-center gap-1"
              onPress={() => {
                Clipboard.setStringAsync(selectedMessage.text);
                setSelectedMessage(null);

                if (Platform.OS === "android") {
                  ToastAndroid.show("Pesan disalin", ToastAndroid.SHORT);
                }
              }}
            >
              <View className="items-center bg-gray-200 border border-gray-300 rounded-full p-4">
                <Ionicons name="copy-outline" size={30} color="#1475BA" />
              </View>
              <Text className="text-sm" style={{ fontFamily: "LexRegular" }}>
                Salin Teks
              </Text>
            </TouchableOpacity>

            {selectedMessage.sender === "me" && (
              <TouchableOpacity
                className="items-center gap-1"
                onPress={() => {
                  setSelectedMessage(null);
                  confirmDeleteMessage(selectedMessage);
                }}
              >
                <View className="items-center bg-gray-200 border border-gray-300 rounded-full p-4">
                  <MaterialCommunityIcons
                    name="delete-outline"
                    size={30}
                    color="#EF4444"
                  />
                </View>
                <Text className="text-sm" style={{ fontFamily: "LexRegular" }}>
                  Hapus Pesan
                </Text>
              </TouchableOpacity>
            )}

            <TouchableOpacity
              onPress={() => setSelectedMessage(null)}
              className="items-center gap-1"
            >
              <View className="items-center bg-gray-200 border border-gray-300 rounded-full p-4">
                <Ionicons name="close" size={30} color="gray" />
              </View>
              <Text className="text-sm" style={{ fontFamily: "LexRegular" }}>
                Batal
              </Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
      <Modal transparent visible={customAlertVisible} animationType="fade">
        <View className="flex-1 bg-black/30 justify-center items-center px-6">
          <View className="bg-white rounded-xl p-5 w-full max-w-md">
            <Text
              className="text-lg mb-2 text-black"
              style={{ fontFamily: "LexBold" }}
            >
              Hapus Pesan?
            </Text>
            <Text
              className="mb-4 text-gray-700"
              style={{ fontFamily: "LexRegular" }}
            >
              Apakah Anda yakin ingin menghapus pesan ini?
            </Text>

            <TouchableOpacity
              onPress={() => {
                if (messageToDelete) {
                  setMessagesToday((prev) =>
                    prev.filter((m) => m.id !== messageToDelete.id)
                  );
                }
                setCustomAlertVisible(false);
                setMessageToDelete(null);
              }}
              className="py-2 rounded-lg px-4 mt-2 bg-red-500"
            >
              <Text
                className="text-center text-white"
                style={{ fontFamily: "LexBold" }}
              >
                Hapus
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => {
                setCustomAlertVisible(false);
                setMessageToDelete(null);
              }}
              className="py-2 rounded-lg px-4 mt-2 bg-gray-300"
            >
              <Text
                className="text-center text-black"
                style={{ fontFamily: "LexBold" }}
              >
                Batal
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      <View className="bg-[#1475BA] w-full h-7 items-center justify-center">
        <View className="bg-white w-32 h-1.5 rounded-full" />
      </View>
    </View>
  );
}
