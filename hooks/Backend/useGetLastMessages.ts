import { useMemo } from 'react';

interface Room {
  id: string;
  pesanTerakhir?: string | null;
}

export const useGetLastMessages = (rooms: Room[]) => {
  return useMemo(() => {
    return rooms.map((room) => {
      const pesan = room.pesanTerakhir;

      if (!pesan) {
        return {
          ...room,
          lastMsg: 'Belum ada chat di stasiun ini.',
        };
      }

      // 🔎 cek kalau pesan mengandung emoji/file indicator
      if (
        pesan.includes('🖼️') ||
        pesan.includes('📄') ||
        pesan.includes('📎')
      ) {
        return { ...room, lastMsg: pesan };
      }

      // Kalau teks biasa → potong kalau kepanjangan
      const teks =
        pesan.length > 50 ? pesan.slice(0, 50).trim() + '...' : pesan;

      return { ...room, lastMsg: teks };
    });
  }, [rooms]);
};
