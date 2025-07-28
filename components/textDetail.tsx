import React from 'react';
import { View, Text } from 'react-native';

interface TextDetailProps {
  label: string;
  value: string | number;
}

export default function TextDetail({ label, value }: TextDetailProps) {
  return (
    <View className="mb-1 flex-row items-center gap-2" style={{ flexWrap: 'wrap' }}>
      <Text style={{ fontFamily: 'LexRegular', flexShrink: 1 }}>{label} :</Text>
      <Text style={{ fontFamily: 'LexRegular', flexShrink: 1 }}>{value}</Text>
    </View>
  );
}
