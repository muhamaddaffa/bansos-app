<template>
  <div class="container">
    <h1>Preview Data</h1>
    <h2>Nama: {{ formData.nama }}</h2>
    <p>NIK: {{ formData.nik }}</p>
    <p>Nomor Kartu Keluarga: {{ formData.nomorKk }}</p>
    <h3>Preview Foto KTP:</h3>
    <img :src="fotoKtpUrl" alt="Preview KTP" style="max-width: 300px" />
    <h3>Preview Foto Kartu Keluarga:</h3>
    <img :src="fotoKkUrl" alt="Preview KK" style="max-width: 300px" />
    <p>Umur: {{ formData.umur }}</p>
    <p>Jenis Kelamin: {{ formData.jenisKelamin }}</p>
    <p>Provinsi: {{ formData.provinsi?.name }}</p>
    <p>Kab/Kota: {{ formData.kabKota?.name }}</p>
    <p>Kecamatan: {{ formData.kecamatan?.name }}</p>
    <p>Kelurahan/Desa: {{ formData.kelurahan?.name }}</p>
    <p>Alamat: {{ formData.alamat }}</p>
    <p>RT: {{ formData.rt }}</p>
    <p>RW: {{ formData.rw }}</p>
    <p>Penghasilan Sebelum Pandemi: {{ formData.penghasilanSebelumPandemi }}</p>
    <p>Penghasilan Setelah Pandemi: {{ formData.penghasilanSetelahPandemi }}</p>
    <p>Alasan Membutuhkan Bantuan: {{ formData.alasanBantuan }}</p>
  </div>
  <button @click="goBack">Kembali</button>
</template>

<script>
export default {
  data() {
    return {
      formData: JSON.parse(this.$route.query.formData),
    };
  },
  methods: {
    goBack() {
      this.$router.push({ name: "FormPage" });
    },
  },
};
</script>

<style scoped>
.container {
  max-width: 800px;
  margin: 20px auto;
  padding: 20px;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}
</style>
