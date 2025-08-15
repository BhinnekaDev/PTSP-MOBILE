import React from 'react';
import { View } from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { router } from 'expo-router';

// OUR COMPONENTS
import OrderItem from '@/components/detailStatusItem';
import TextDetail from '@/components/textDetail';
import ButtonCustom from '@/components/buttonCustom';

// OUR PROPS
import type { StatusOrderDetail } from '@/interfaces/statusOrderDetailProps';

// HOOKS
import { useDownloadDocument } from '@/hooks/Backend/useDownloadDocument';

export default function OrderCompletionStatusSection({
  detail,
}: StatusOrderDetail) {
  const { downloadAllFromKeranjang, loading } = useDownloadDocument();

  const isCompleted =
    detail.Status_Pengisian_IKM === 'Telah Diisi' &&
    detail.Status_Pesanan === 'Selesai';

  return (
    <OrderItem
      icon={<FontAwesome name="send" size={24} color="white" />}
      title="Pesanan Selesai"
      status={detail.Status_Pesanan}
      content={
        <>
          <TextDetail
            label="Status Pengisian IKM"
            value={detail.Status_Pengisian_IKM || 'IKM Belum Diisi'}
          />
          <TextDetail label="Status Pesanan" value={detail.Status_Pesanan} />

          <View className="mt-3">
            {isCompleted ? (
              <ButtonCustom
                text={loading ? 'Sedang Mengunduh...' : 'Unduh Dokumen'}
                classNameContainer="bg-[#72C02C] py-2 rounded-[10px]"
                textClassName="text-white text-center text-[14px]"
                textStyle={{ fontFamily: 'LexSemiBold' }}
                isTouchable
                onPress={() => downloadAllFromKeranjang(detail.keranjang)}
              />
            ) : detail.Status_Pembuatan === 'Selesai Pembuatan' ? (
              <ButtonCustom
                text="Pengisian IKM"
                classNameContainer="bg-[#1475BA] py-2 rounded-[10px]"
                textClassName="text-white text-center text-[14px]"
                textStyle={{ fontFamily: 'LexSemiBold' }}
                isTouchable
                onPress={() => router.push('/screens/ikmScreen')}
              />
            ) : null}
          </View>
        </>
      }
    />
  );
}
