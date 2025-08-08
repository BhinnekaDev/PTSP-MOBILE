import React from 'react';
import { View, Text } from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import OrderItem from '@/components/detailStatusItem';
import TextDetail from '@/components/textDetail';
import ButtonCustom from '@/components/buttonCustom';

export default function PaymentStatusSection({ detail }: { detail: any }) {
  return (
    <OrderItem
      icon={<FontAwesome name="dollar" size={24} color="white" />}
      title="Status Pembayaran"
      status={detail.Status_Pembayaran}
      content={
        <>
          <TextDetail
            label="Status Pembayaran"
            value={detail.Status_Pembayaran}
          />

          {/* TANGGAL MASUK & KADALUWARSA */}
          {detail.ajukan?.Status_Ajukan === 'Diterima' && (
            <View>
              {/* TANGGAL MASUK */}
              {detail.ajukan?.Tanggal_Masuk && (
                <View className="mb-1 flex-row items-center gap-2">
                  <Text
                    style={{
                      fontFamily: 'LexRegular',
                      flexShrink: 1,
                    }}
                  >
                    Tanggal Billing:
                  </Text>
                  <Text
                    style={{
                      fontFamily: 'LexRegular',
                      flexShrink: 1,
                    }}
                  >
                    {new Date(detail.ajukan.Tanggal_Masuk).toLocaleString(
                      'id-ID'
                    )}
                  </Text>
                </View>
              )}

              {/* TANGGAL KADALUWARSA */}
              {detail.ajukan?.Tanggal_Kadaluwarsa && (
                <View className="mb-1 flex-row items-center gap-2">
                  <Text
                    style={{
                      fontFamily: 'LexRegular',
                      flexShrink: 1,
                    }}
                  >
                    Tanggal Kadaluwarsa:
                  </Text>
                  <Text
                    style={{
                      fontFamily: 'LexRegular',
                      flexShrink: 1,
                    }}
                  >
                    {new Date(detail.ajukan.Tanggal_Kadaluwarsa).toLocaleString(
                      'id-ID'
                    )}
                  </Text>
                </View>
              )}

              {/* TOMBOL UPLOAD BUKTI PEMBAYARAN (Hanya jika bukan Gratis) */}
              {detail.ajukan?.Jenis_Ajukan !== 'Gratis' && (
                <View className="mt-3">
                  <ButtonCustom
                    text="Upload Bukti Pembayaran"
                    classNameContainer="bg-[#72C02C] py-2 rounded-[10px]"
                    textClassName="text-white text-center text-[14px]"
                    textStyle={{ fontFamily: 'LexSemiBold' }}
                    isTouchable
                    onPress={() => {
                      alert('Upload Bukti Pembayaran');
                    }}
                  />
                </View>
              )}
            </View>
          )}
        </>
      }
    />
  );
}
