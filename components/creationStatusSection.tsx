import React from 'react';
import AntDesign from '@expo/vector-icons/AntDesign';

// OUR COMPONENTS
import OrderItem from '@/components/detailStatusItem';
import TextDetail from '@/components/textDetail';

// OUR PROPS
import type { StatusOrderDetail } from '@/interfaces/statusOrderDetailProps';

export default function CreationStatusSection({ detail }: StatusOrderDetail) {
  const isPaid = detail.Status_Pembayaran === 'Lunas';

  return (
    <OrderItem
      icon={<AntDesign name="inbox" size={24} color="white" />}
      title="Status Pembuatan"
      status={isPaid ? detail.Status_Pembuatan : ''}
      content={
        <>
          <TextDetail
            label="Status Pembuatan"
            value={isPaid ? detail.Status_Pembuatan : ''}
          />
        </>
      }
    />
  );
}
