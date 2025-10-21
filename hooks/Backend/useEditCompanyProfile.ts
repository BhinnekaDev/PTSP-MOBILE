import { useEffect, useState } from 'react';
import { firebaseAuth, db } from '@/lib/firebase';

// OUR HOOKS
import { useGetUserProfile } from '@/hooks/Backend/useGetUserProfile';

// OUR UTILS
import { showAlertMessage } from '@/utils/showAlertMessage';

export const useEditCompanyProfile = (onClose: () => void) => {
  const { profile, loading } = useGetUserProfile();

  const [identityNumber, setIdentityNumber] = useState('');
  const [fullName, setFullName] = useState('');
  const [selectGender, setSelectGender] = useState('');
  const [job, setJob] = useState('');
  const [lastEducation, setLastEducation] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [companyPhone, setCompanyPhone] = useState('');
  const [companyEmail, setCompanyEmail] = useState('');
  const [npwpCompany, setNpwpCompany] = useState('');
  const [companyAddress, setCompanyAddress] = useState('');
  const [numberPhone, setNumberPhone] = useState('');
  const [districtCityCompany, setDistrictCityCompany] = useState('');
  const [provinceCompany, setProvinceCompany] = useState('');

  useEffect(() => {
    if (profile?.tipe === 'perusahaan') {
      setIdentityNumber(profile.No_Identitas || '');
      setFullName(profile.Nama_Lengkap || '');
      setSelectGender(profile.Jenis_Kelamin || '');
      setJob(profile.Pekerjaan || '');
      setLastEducation(profile.Pendidikan_Terakhir || '');
      setCompanyName(profile.Nama_Perusahaan || '');
      setCompanyPhone(profile.No_Hp_Perusahaan || '');
      setCompanyEmail(profile.Email_Perusahaan || '');
      setNpwpCompany(profile.NPWP_Perusahaan || '');
      setCompanyAddress(profile.Alamat_Perusahaan || '');
      setNumberPhone(profile.No_Hp || '');
      setDistrictCityCompany(profile.Kabupaten_Kota_Perusahaan || '');
      setProvinceCompany(profile.Provinsi_Perusahaan || '');
    }
  }, [profile]);

  const handleSave = async () => {
    if (!profile || profile.tipe !== 'perusahaan') return;

    const data = {
      No_Identitas: identityNumber,
      Nama_Lengkap: fullName,
      Jenis_Kelamin: selectGender,
      Pekerjaan: job,
      Pendidikan_Terakhir: lastEducation,
      Nama_Perusahaan: companyName,
      No_Hp_Perusahaan: companyPhone,
      Email_Perusahaan: companyEmail,
      NPWP_Perusahaan: npwpCompany,
      Alamat_Perusahaan: companyAddress,
      No_Hp: numberPhone,
      Kabupaten_Kota_Perusahaan: districtCityCompany,
      Provinsi_Perusahaan: provinceCompany,
    };

    try {
      const uid = firebaseAuth.currentUser?.uid;
      if (!uid) throw new Error('UID tidak ditemukan.');

      await db.collection('perusahaan').doc(uid).update(data);

      //  alert sukses
      await showAlertMessage(
        'Berhasil br',
        'Profil perusahaan berhasil diperbarui ',
        'success'
      );

      onClose();
    } catch (err) {
      console.error('❌ Gagal memperbarui profil perusahaan:', err);

      //  alert gagal
      await showAlertMessage(
        'Gagal',
        'Terjadi kesalahan saat menyimpan profil.',
        'error'
      );
    }
  };

  return {
    type: 'perusahaan' as const,
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
    companyName,
    setCompanyName,
    companyPhone,
    setCompanyPhone,
    companyEmail,
    setCompanyEmail,
    npwpCompany,
    setNpwpCompany,
    companyAddress,
    setCompanyAddress,
    numberPhone,
    setNumberPhone,
    districtCityCompany,
    setDistrictCityCompany,
    provinceCompany,
    setProvinceCompany,
    handleSave,
  };
};
