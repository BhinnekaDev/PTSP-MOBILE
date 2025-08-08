import React from 'react';
import { View } from 'react-native';
import AntDesign from '@expo/vector-icons/AntDesign';
import { router } from 'expo-router';

// OUR COMPONENTS
import OrderItem from '@/components/detailStatusItem';
import TextDetail from '@/components/textDetail';
import ButtonCustom from '@/components/buttonCustom';

// CONSTANTS
import { submissionOptions } from '@/constants/submissionOptions';

// OUR PROPS
import type { StatusOrderDetail } from '@/interfaces/statusOrderDetailProps';

export default function SubmissionStatusSection({ detail }: StatusOrderDetail) {
  const ajukanDetail = detail?.ajukan;

  const getFileFields = () => {
    const match = submissionOptions.find(
      (option) => option.label.trim() === ajukanDetail?.Nama_Ajukan?.trim()
    );
    return match ? match.files : [];
  };

  // Early return kalau ajukan null
  if (!ajukanDetail) {
    return null;
  }

  return (
    <OrderItem
      icon={<AntDesign name="filetext1" size={24} color="white" />}
      title="Status Pengajuan"
      status={ajukanDetail.Status_Ajukan}
      content={
        <>
          <TextDetail label="Jenis Kegiatan" value={ajukanDetail.Nama_Ajukan} />
          <TextDetail
            label="Jenis Pengajuan"
            value={ajukanDetail.Jenis_Ajukan}
          />
          <TextDetail
            label="Status Pengajuan"
            value={ajukanDetail.Status_Ajukan}
          />

          {ajukanDetail.Status_Ajukan === 'Ditolak' &&
            ajukanDetail.Keterangan && (
              <TextDetail
                label="Keterangan Ditolak"
                value={ajukanDetail.Keterangan}
              />
            )}

          <TextDetail
            label="Tanggal Pengajuan"
            value={ajukanDetail.Tanggal_Pembuatan_Ajukan.toDate().toLocaleString()}
          />

          {ajukanDetail.Status_Ajukan === 'Ditolak' && (
            <View className="mt-1">
              <ButtonCustom
                text="Perbaiki Dokumen"
                classNameContainer="bg-[#EB5757] py-2 rounded-[10px]"
                textClassName="text-white text-center text-[14px]"
                textStyle={{ fontFamily: 'LexSemiBold' }}
                isTouchable
                onPress={() => {
                  router.push({
                    pathname: '/screens/fixSubmissionScreen',
                    params: {
                      ajukanID: ajukanDetail.id,
                      namaAjukan: ajukanDetail.Nama_Ajukan,
                      jenisAjukan: ajukanDetail.Jenis_Ajukan,
                      keterangan: ajukanDetail.Keterangan || '',
                      statusPesanan: ajukanDetail.Status_Ajukan,
                      files: JSON.stringify(getFileFields()),
                    },
                  });
                }}
              />
            </View>
          )}
        </>
      }
    />
  );
}
