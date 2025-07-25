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
  const getFileFields = () => {
    const match = submissionOptions.find(
      (option) => option.label.trim() === detail.ajukan.Nama_Ajukan.trim()
    );
    return match ? match.files : [];
  };

  return (
    <OrderItem
      icon={<AntDesign name="filetext1" size={24} color="white" />}
      title="Status Pengajuan"
      status={detail.ajukan.Status_Ajukan}
      content={
        <>
          {/* JENIS KEGIATAN */}
          <TextDetail
            label="Jenis Kegiatan"
            value={detail.ajukan.Nama_Ajukan}
          />

          {/* JENIS PENGAJUAN */}
          <TextDetail
            label="Jenis Pengajuan"
            value={detail.ajukan.Jenis_Ajukan}
          />

          {/* STATUS PENGAJUAN */}
          <TextDetail
            label="Status Pengajuan"
            value={detail.ajukan.Status_Ajukan}
          />

          {/* KETERANGAN DITOLAK */}
          {detail.ajukan.Status_Ajukan === 'Ditolak' &&
            detail.ajukan.Keterangan && (
              <TextDetail
                label="Keterangan Ditolak"
                value={detail.ajukan.Keterangan}
              />
            )}

          {/* TANGGAL PENGAJUAN */}
          <TextDetail
            label="Tanggal Pengajuan"
            value={detail.ajukan.Tanggal_Pembuatan_Ajukan.toDate().toLocaleString()}
          />

          {/* PERBAIKI DOKUMEN */}
          {detail.ajukan.Status_Ajukan === 'Ditolak' && (
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
                      ajukanID: detail.ajukan.id,
                      namaAjukan: detail.ajukan.Nama_Ajukan,
                      jenisAjukan: detail.ajukan.Jenis_Ajukan,
                      keterangan: detail.ajukan.Keterangan || '',
                      statusPesanan: detail.ajukan.Status_Ajukan,
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
