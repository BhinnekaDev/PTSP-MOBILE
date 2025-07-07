// app/data/productList.tsx
import React from 'react';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import Feather from '@expo/vector-icons/Feather';
import { ProductType } from '@/interfaces/productDataProps';

export const allProducts = [
  {
    category: 'Informasi',
    icon: <FontAwesome6 name="mountain" size={60} color="#3498DB" />,
    title: 'Stasiun Meteorologi',
    desc: 'Pemantauan dan pengamatan kondisi\ncuaca dan atmosfer, termasuk suhu,\nkelembapan, dan tekanan udara.',
    pathname: '/screens/productDetailScreen' as const,
    paramCategory: 'Informasi_Meteorologi' as ProductType,
  },
  {
    category: 'Informasi',
    icon: <FontAwesome6 name="cloud-bolt" size={60} color="#3498DB" />,
    title: 'Stasiun Klimatologi',
    desc: 'Penelitian dan analisis perubahan\niklim jangka panjang, pola cuaca, dan dampak lingkungan.',
    pathname: '/screens/productDetailScreen' as const,
    paramCategory: 'Informasi_Klimatologi' as ProductType,
  },
  {
    category: 'Informasi',
    icon: <Feather name="wind" size={60} color="#3498DB" />,
    title: 'Stasiun Geofisika',
    desc: 'Pemantauan dan pengamatan kondisi\ncuaca dan atmosfer, termasuk suhu,\nkelembapan, dan tekanan udara.',
    pathname: '/screens/productDetailScreen' as const,
    paramCategory: 'Informasi_Geofisika' as ProductType,
  },
  {
    category: 'Jasa',
    icon: <FontAwesome6 name="mountain" size={60} color="#3498DB" />,
    title: 'Stasiun Meteorologi',
    desc: 'Pemantauan dan pengamatan kondisi\ncuaca dan atmosfer, termasuk suhu,\nkelembapan, dan tekanan udara.',
    pathname: '/screens/productDetailScreen' as const,
    paramCategory: 'Jasa_Meteorologi' as ProductType,
  },
  {
    category: 'Jasa',
    icon: <FontAwesome6 name="cloud-bolt" size={60} color="#3498DB" />,
    title: 'Stasiun Klimatologi',
    desc: 'Penelitian dan analisis perubahan\niklim jangka panjang, pola cuaca, dan dampak lingkungan.',
    pathname: '/screens/productDetailScreen' as const,
    paramCategory: 'Jasa_Klimatologi' as ProductType,
  },
  {
    category: 'Jasa',
    icon: <Feather name="wind" size={60} color="#3498DB" />,
    title: 'Stasiun Geofisika',
    desc: 'Pemantauan dan pengamatan kondisi\ncuaca dan atmosfer, termasuk suhu,\nkelembapan, dan tekanan udara.',
    pathname: '/screens/productDetailScreen' as const,
    paramCategory: 'Jasa_Geofisika' as ProductType,
  },
];
