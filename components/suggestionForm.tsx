import React from 'react';
import { ScrollView, View, Text, TouchableOpacity } from 'react-native';
import * as Animatable from 'react-native-animatable';
import { Ionicons } from '@expo/vector-icons';

// OUR COMPONENTS
import InputField from '@/components/formInput';
import ButtonCustom from '@/components/buttonCustom';

// OUR UTILS
import getFileIcon from '@/utils/getFileIcon';
import { validationFullString } from '@/utils/validationFullString';

// OUR INTERFACES
import { SuggestionFormProps } from '@/interfaces/suggestionFormProps';


export default function SuggestionForm({
  fullName,
  setFullName,
  email,
  setEmail,
  text,
  setText,
  file,
  handlePickFile,
  handleRemoveFile,
  openPreview,
  onSubmit,
}: SuggestionFormProps) {
  return (
    <ScrollView contentContainerStyle={{ paddingVertical: 24 }}>
      <Text className="text-[24px]" style={{ fontFamily: 'LexBold' }}>
        Saran
      </Text>

      <InputField
        label="Nama Lengkap"
        textClassName="border border-[#3498DB]"
        value={fullName}
        onChangeText={(input) => setFullName(validationFullString(input, 50))}
        placeholder="Nama lengkap"
      />
      <InputField
        label="Email"
        textClassName="border border-[#3498DB]"
        value={email}
        onChangeText={(input) => setEmail(validationFullString(input, 50))}
        placeholder="Email"
      />
      <InputField
        label="Saran"
        textClassName="border border-[#3498DB] p-1 h-24"
        value={text}
        onChangeText={(input) => setText(validationFullString(input, 150))}
        placeholder="Tulis saran kamu di sini"
        multiline
      />

      <View className="px-4 pb-4 pt-6">
        <Text style={{ fontFamily: 'LexSemiBold', marginBottom: 12 }}>
          Upload Lampiran (Jika Ada)
        </Text>
        {!file ? (
          <TouchableOpacity
            onPress={handlePickFile}
            className="mb-4 rounded-[8px] bg-[#1475BA] py-3"
            style={{ alignItems: 'center' }}
          >
            <Text style={{ color: 'white', fontFamily: 'LexSemiBold' }}>
              Upload File
            </Text>
          </TouchableOpacity>
        ) : (
          <View className="my-4 rounded-[8px] border border-[#6BBC3F] bg-[#E6F4EA] p-[12px]">
            <View className="mb-1 flex-row items-center gap-2">
              {getFileIcon(file.name)}
              <Text style={{ fontFamily: 'LexRegular', flexShrink: 1 }}>
                {file.name}
              </Text>
            </View>

            <Text style={{ fontFamily: 'LexRegular' }}>
              <Text style={{ fontWeight: 'bold' }}>Ukuran:</Text>{' '}
              {(file.size / 1024).toFixed(2)} KB
            </Text>

            <View className="mb-3 mt-2 h-[8px] w-full overflow-hidden rounded-md bg-gray-300">
              <View
                className="h-full bg-green-500"
                style={{ width: `${file.progress}%` }}
              />
            </View>

            <View className="mt-2 flex-row justify-between">
              {file.progress >= 100 ? (
                <View className="flex-row items-center gap-1">
                  <Animatable.View
                    animation="bounceIn"
                    duration={2000}
                    useNativeDriver
                  >
                    <Ionicons
                      name="checkmark-circle-sharp"
                      size={18}
                      color="green"
                    />
                  </Animatable.View>

                  <Animatable.Text
                    animation={{
                      from: { opacity: 0, translateX: -10 },
                      to: { opacity: 1, translateX: 0 },
                    }}
                    delay={500}
                    duration={600}
                    style={{ fontFamily: 'LexMedium' }}
                    className="text-[11px]"
                  >
                    Upload Berhasil !
                  </Animatable.Text>
                </View>
              ) : (
                <View />
              )}

              <View className="mt-1 flex-row gap-2">
                <TouchableOpacity
                  onPress={handleRemoveFile}
                  disabled={file.progress < 100}
                  className={`items-center justify-center rounded-[5px] px-3 py-2 ${
                    file.progress < 100 ? 'bg-gray-400' : 'bg-red-500'
                  }`}
                >
                  <Ionicons name="trash" size={18} color="white" />
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={openPreview}
                  disabled={file.progress < 100}
                  className={`items-center justify-center rounded-[5px] px-3 py-2 ${
                    file.progress < 100 ? 'bg-gray-400' : 'bg-[#1475BA]'
                  }`}
                >
                  <Ionicons name="eye" size={18} color="white" />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        )}
      </View>

      <ButtonCustom
        classNameContainer="bg-[#72C02C] rounded-[10px] py-1 w-[160px] self-end"
        text="Kirim"
        textClassName="text-[20px] text-center text-white"
        textStyle={{ fontFamily: 'LexSemiBold' }}
        onPress={onSubmit}
        isTouchable={true}
      />
    </ScrollView>
  );
}
