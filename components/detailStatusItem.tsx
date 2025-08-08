import React from 'react';
import { View, Text } from 'react-native';

interface DetailStatusItemProps {
  icon: React.ReactNode;
  title: string;
  content: React.ReactNode;
  status?: string;
}

const getStatusColor = (status: string) => {
  switch (status) {
    case 'Diterima':
    case 'Lunas':
    case 'Selesai':
    case 'Selesai Pembuatan':
      return '#72C02C'; // Hijau
    case 'Ditolak':
      return '#EB5757'; // Merah
    case 'Sedang Ditinjau':
    case 'Menunggu Pembuatan':
      return '#f9a825'; // Kuning
    default:
      return '#3498db'; // Abu default
  }
};

export default function detailStatusItem({
  icon,
  title,
  content,
  status,
}: DetailStatusItemProps) {
  return (
    <View className="z-10 mb-10 flex flex-row items-start">
      {/* Ikon dengan latar sesuai status */}
      <View
        className="mr-5 rounded-full p-3"
        style={{
          backgroundColor: getStatusColor(status ?? ''),
          width: 48,
          height: 48,
          justifyContent: 'center',
          alignItems: 'center',
          flexShrink: 0,
        }}
      >
        {icon}
      </View>

      {/* Konten */}
      <View className="flex-1">
        <Text
          className="mb-2 text-base font-bold text-black"
          numberOfLines={1}
          ellipsizeMode="tail"
        >
          {title}
        </Text>
        {content}
      </View>
    </View>
  );
}
