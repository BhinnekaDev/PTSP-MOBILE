export const getStatusColor = (
  status: string,
  context?: { pembayaran?: string }
) => {
  // OVERRIDE untuk status pembuatan
  if (status === 'Status Pembuatan' && context?.pembayaran === 'Lunas') {
    return '#f9a825'; // Kuning override karena status pembayaran Lunas
  }

  switch (status) {
    case 'Diterima':
    case 'Lunas':
    case 'Selesai Pembuatan':
    case 'Selesai':
      return '#72C02C'; // Hijau
    case 'Ditolak':
      return '#EB5757'; // Merah
    case 'Sedang Ditinjau':
      return '#f9a825'; // Kuning
    default:
      return '#3498db'; // Default biru
  }
};
