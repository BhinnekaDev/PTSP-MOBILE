// hooks/useGenerateInvoicePDF.ts
import * as Print from 'expo-print';
import * as FileSystem from 'expo-file-system';
import type {
  OrderDetail,
  AjukanDetail,
} from '@/interfaces/statusOrderDetailProps';

// OUR HOOKS
import type { UserProfile } from '@/hooks/Backend/useGetUserProfile';

// OUR UTILS
import { getBase64Image } from '@/utils/getBase64Image';

export function useGenerateInvoicePDF() {
  const downloadInvoice = async (
    pemesanan: OrderDetail,
    userData: UserProfile | null,
    ajukanDetail: AjukanDetail | null
  ): Promise<{ uri: string; html: string }> => {
    // Path gambar header (pastikan file ada di assets/images)
    const headerImage = await getBase64Image(
      require('@/assets/images/Faktur-Header.png')
    );
    const tanggalPemesanan = pemesanan.Tanggal_Pemesanan
      ? pemesanan.Tanggal_Pemesanan.toDate().toLocaleString('id-ID')
      : '-';
    const tanggalPengajuan = ajukanDetail?.Tanggal_Pembuatan_Ajukan
      ? ajukanDetail?.Tanggal_Pembuatan_Ajukan.toDate().toLocaleString('id-ID')
      : '-';

    const html = `
      <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; margin: 20px; }
            .header { text-align: center; margin-bottom: 20px; }
            .header img { width: 100%; height: 180px; object-fit: cover; } /* <- diperlebar */
            .title { font-size: 18px; font-weight: bold; margin-top: 10px; text-align: center; }
            .status { font-weight: bold; margin-top: 10px; text-align: right; }
            .status.red { color: red; }
            .status.green { color: green; }
            .status.yellow { color: orange; }
            .status.gray { color: gray; }
            table { width: 100%; border-collapse: collapse; margin-top: 20px; }
            table, th, td { border: 1px solid #ddd; }
            th { background: #0070ff; color: white; padding: 8px; text-align: center; }
            td { padding: 6px; text-align: center; }
            .total { text-align: right; font-weight: bold; margin-top: 20px; }
            .note { margin-top: 30px; font-size: 22px; color: #555;   font-weight: bold;  }
            .info div {
  display: flex;
  margin-bottom: 4px;
}
.label {
  min-width: 150px;   /* sesuaikan panjang label agar rata */
  font-weight: bold;
}
  
.value {
  flex: 1;
}

          </style>
        </head>
        <body>
          <div class="header">
                <img src="${headerImage}" 
                style="display:block; width:100%; max-width:100%; height:auto; margin:0 auto;" 
                alt="Faktur Header" />
          </div>


          <div class="title">Dokumen Pesanan Anda</div>

          <div class="status ${getStatusColor(pemesanan.Status_Pembayaran)}">
            ${getStatusLabel(pemesanan.Status_Pembayaran)}
          </div>

          <div class="info">
  <div><span class="label">Nomor Pesanan</span><span class="value">: #${pemesanan.idPemesanan}</span></div>
  <div><span class="label">Tanggal Pemesanan</span><span class="value">: ${tanggalPemesanan}</span></div>
  <div><span class="label">Nomor Ajukan</span><span class="value">: ${ajukanDetail?.id || '-'}</span></div>
  <div><span class="label">Tanggal Ajuan</span><span class="value">: ${tanggalPengajuan}</span></div>
  <div><span class="label">Nomor Transaksi</span><span class="value">: ${pemesanan?.ID_Transaksi || '-'}</span></div>
  <div><span class="label">Detail Penerima</span>
    <span class="value">: ${
      userData?.tipe === 'perorangan'
        ? userData?.Nama_Lengkap || '-'
        : `${userData?.Nama_Lengkap || '-'} / ${userData?.Nama_Perusahaan || '-'}`
    }</span>
  </div>
  <div><span class="label">Email</span>
    <span class="value">: ${
      userData?.tipe === 'perorangan'
        ? userData?.Email || '-'
        : `${userData?.Email || '-'} / ${userData?.Email_Perusahaan || '-'}`
    }</span>
  </div>
  <div><span class="label">Jenis Pengajuan</span><span class="value"> : ${ajukanDetail?.Jenis_Ajukan || '-'}</span></div>
</div>


          <table>
            <tr>
              <th>Nama Produk</th>
              <th>Instansi</th>
              <th>Jumlah</th>
              <th>Harga</th>
              <th>Total</th>
            </tr>
            ${pemesanan.keranjang
              .map(
                (p) => `
                  <tr>
                    <td>${p.Nama}</td>
                    <td>${p.Pemilik}</td>
                    <td>${p.Kuantitas}</td>
                    <td>${new Intl.NumberFormat('id-ID', {
                      style: 'currency',
                      currency: 'IDR',
                    }).format(p.Harga)}</td>
                    <td>${new Intl.NumberFormat('id-ID', {
                      style: 'currency',
                      currency: 'IDR',
                    }).format(p.Harga * p.Kuantitas)}</td>
                  </tr>
                `
              )
              .join('')}
          </table>
           <div class="total">
            Total Pesanan : ${
              pemesanan.Total_Harga_Pesanan !== undefined
                ? new Intl.NumberFormat('id-ID', {
                    style: 'currency',
                    currency: 'IDR',
                  }).format(pemesanan.Total_Harga_Pesanan)
                : '-'
            }
          </div>


          <div class="note">
            Catatan: Jika ada permasalahan atau kesalahan dalam dokumen ini, 
            silakan hubungi stasiun sesuai pesanan anda.
          </div>
        </body>
      </html>
    `;

    const { uri } = await Print.printToFileAsync({ html });

    // Simpan dengan nama khusus
    const newPath =
      FileSystem.documentDirectory + 'Invoice_Dokumen_Pemesanan_BMKG.pdf';

    const fileExists = await FileSystem.getInfoAsync(newPath);
    if (fileExists.exists) {
      await FileSystem.deleteAsync(newPath, { idempotent: true });
    }

    await FileSystem.moveAsync({
      from: uri,
      to: newPath,
    });

    return { uri: newPath, html };
  };

  return { downloadInvoice };
}

// Helper untuk warna status
function getStatusColor(status: string): string {
  switch (status) {
    case 'Menunggu Pembayaran':
    case 'Ditolak':
      return 'red';
    case 'Sedang Ditinjau':
      return 'yellow';
    case 'Lunas':
      return 'green';
    case 'Menunggu Admin':
      return 'gray';
    default:
      return 'gray';
  }
}

// Helper untuk label status
function getStatusLabel(status: string): string {
  switch (status) {
    case 'Menunggu Pembayaran':
      return 'Belum Bayar';
    case 'Ditolak':
      return 'Ditolak';
    case 'Sedang Ditinjau':
      return 'Sedang Ditinjau';
    case 'Lunas':
      return 'Lunas';
    case 'Menunggu Admin':
      return 'Kadaluwarsa';
    default:
      return 'Status Tidak Diketahui';
  }
}
