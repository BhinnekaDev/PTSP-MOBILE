import { useEffect, useState } from 'react';
import { firebaseAuth, db } from '@/lib/firebase';

// OUR HOOKS
import { useGetUserProfile } from '@/hooks/Backend/useGetUserProfile';

// OUR UTILS
import { showAlertMessage } from '@/utils/showAlertMessage';

export const useEditIndividualProfile = (onClose: () => void) => {
  const { profile, loading } = useGetUserProfile();

  const [identityNumber, setIdentityNumber] = useState('');
  const [fullName, setFullName] = useState('');
  const [selectGender, setSelectGender] = useState('');
  const [job, setJob] = useState('');
  const [lastEducation, setLastEducation] = useState('');
  const [numberPhone, setNumberPhone] = useState('');

  useEffect(() => {
    if (profile?.tipe === 'perorangan') {
      setIdentityNumber(profile.No_Identitas || '');
      setFullName(profile.Nama_Lengkap || '');
      setSelectGender(profile.Jenis_Kelamin || '');
      setJob(profile.Pekerjaan || '');
      setLastEducation(profile.Pendidikan_Terakhir || '');
      setNumberPhone(profile.No_Hp || '');
    }
  }, [profile]);

  const handleSave = async () => {
    if (!profile || profile.tipe !== 'perorangan') return;

    const data = {
      No_Identitas: identityNumber,
      Nama_Lengkap: fullName,
      Jenis_Kelamin: selectGender,
      Pekerjaan: job,
      Pendidikan_Terakhir: lastEducation,
      No_Hp: numberPhone,
    };

    try {
      const uid = firebaseAuth.currentUser?.uid;
      if (!uid) throw new Error('UID tidak ditemukan.');

      await db.collection('perorangan').doc(uid).update(data);

      //  pakai alert utils (sukses)
      await showAlertMessage(
        'Berhasil',
        'Profil perorangan berhasil diperbarui ',
        'success'
      );

      onClose();
    } catch (err) {
      console.error('❌ Gagal memperbarui profil perorangan:', err);

      //  pakai alert utils (gagal)
      await showAlertMessage(
        'Gagal',
        'Terjadi kesalahan saat menyimpan profil.',
        'error'
      );
    }
  };

  return {
    type: 'perorangan' as const,
    profile,
    loading,
    identityNumber,
    setIdentityNumber,
    fullName,
    setFullName,
    selectGender,
    setSelectGender,
    job,
    setJob,
    lastEducation,
    setLastEducation,
    numberPhone,
    setNumberPhone,
    handleSave,
  };
};
