<template>
  <div class="container">
    <h1>Form Pendaftaran Bantuan Sosial</h1>
    <form @submit.prevent="submitForm">
      <input
        v-model="formData.nama"
        type="text"
        id="nama"
        placeholder="Nama"
        required
      />

      <input
        v-model="formData.nik"
        type="number"
        id="nik"
        placeholder="NIK"
        required
      />

      <input
        v-model="formData.nomorKk"
        type="number"
        id="nomorKk"
        placeholder="Nomor Kartu Keluarga"
        required
      />

      <label for="fotoKtp"
        >Upload Foto KTP (Maksimal 2MB, format JPG/JPEG/PNG/BMP):</label
      >
      <input
        type="file"
        id="fotoKtp"
        @change="handleFileUpload('fotoKtp')"
        accept="image/*"
        required
      />

      <label for="fotoKk"
        >Upload Foto Kartu Keluarga (Maksimal 2MB, format
        JPG/JPEG/PNG/BMP):</label
      >
      <input
        type="file"
        id="fotoKk"
        @change="handleFileUpload('fotoKk')"
        accept="image/*"
        required
      />

      <input
        v-model="formData.umur"
        type="number"
        id="umur"
        placeholder="Umur"
        required
      />

      <label for="jenisKelamin">Jenis Kelamin:</label>
      <select id="jenisKelamin" v-model="formData.jenisKelamin" required>
        <option value="" disabled>Pilih Jenis Kelamin</option>
        <option value="Laki-laki">Laki-laki</option>
        <option value="Perempuan">Perempuan</option>
      </select>

      <label for="provinsi">Provinsi:</label>
      <select
        id="provinsi"
        @change="setProvinsi(provinsiList[$event.target.selectedIndex])"
      >
        <option value="" disabled>Pilih Provinsi</option>
        <option
          v-for="provinsi in provinsiList"
          :key="provinsi.id"
          :value="provinsi.id"
        >
          {{ provinsi.name }}
        </option>
      </select>

      <label for="kabKota">Kabupaten/Kota:</label>
      <select
        id="kabKota"
        @change="setKabKota(kabKotaList[$event.target.selectedIndex])"
      >
        <option value="" disabled>Pilih Kabupaten/Kota</option>
        <option
          v-for="kabKota in kabKotaList"
          :key="kabKota.id"
          :value="kabKota.id"
        >
          {{ kabKota.name }}
        </option>
      </select>

      <label for="kecamatan">Kecamatan:</label>
      <select
        id="kecamatan"
        @change="setKecamatan(kecamatanList[$event.target.selectedIndex])"
      >
        <option value="" disabled>Pilih Kecamatan</option>
        <option
          v-for="kecamatan in kecamatanList"
          :key="kecamatan.id"
          :value="kecamatan.id"
        >
          {{ kecamatan.name }}
        </option>
      </select>

      <label for="kelurahan">Kelurahan/Desa:</label>
      <select
        id="kelurahan"
        @change="setKelurahan(kelurahanList[$event.target.selectedIndex])"
      >
        <option value="" disabled>Pilih Kelurahan</option>
        <option
          v-for="kelurahan in kelurahanList"
          :key="kelurahan.id"
          :value="kelurahan.id"
        >
          {{ kelurahan.name }}
        </option>
      </select>

      <input
        v-model="formData.alamat"
        type="text"
        id="alamat"
        placeholder="Alamat"
        required
      />

      <input
        v-model="formData.rt"
        type="text"
        id="rt"
        placeholder="RT"
        required
      />
      <input
        v-model="formData.rw"
        type="text"
        id="rw"
        placeholder="RW"
        required
      />

      <input
        v-model="formData.penghasilanSebelumPandemi"
        type="number"
        id="penghasilanSebelumPandemi"
        placeholder="Penghasilan Sebelum Pandemi"
        required
      />

      <input
        v-model="formData.penghasilanSetelahPandemi"
        type="number"
        id="penghasilanSetelahPandemi"
        placeholder="Penghasilan Setelah Pandemi"
        required
      />

      <label for="alasanBantuan">Alasan Membutuhkan Bantuan:</label>
      <select id="alasanBantuan" v-model="formData.alasanBantuan" required>
        <option value="" disabled>Pilih Alasan</option>
        <option value="Kehilangan pekerjaan">Kehilangan pekerjaan</option>
        <option value="Kepala keluarga">Kepala keluarga</option>
        <option value="Tergolong fakir/miskin">Tergolong fakir/miskin</option>
        <option value="Lainnya">Lainnya</option>
      </select>

      <div class="confirmation-container">
        <input type="checkbox" id="confirm" v-model="isConfirmed" required />
        <label for="confirm">
          Saya menyatakan bahwa data yang diisikan adalah benar dan siap
          mempertanggungjawabkan apabila ditemukan ketidaksesuaian dalam data
          tersebut.
        </label>
      </div>

      <button type="submit" :disabled="!isConfirmed">Kirim</button>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      formData: {
        nama: "",
        nik: "",
        nomorKk: "",
        umur: "",
        jenisKelamin: "",
        provinsi: "",
        kabKota: "",
        kecamatan: "",
        kelurahan: "",
        alamat: "",
        rt: "",
        rw: "",
        penghasilanSebelumPandemi: "",
        penghasilanSetelahPandemi: "",
        alasanBantuan: "",
      },
      fotoKtpUrl: null,
      fotoKkUrl: null,
      provinsiList: [],
      kabKotaList: [],
      kecamatanList: [],
      kelurahanList: [],
      isConfirmed: false,
    };
  },

  mounted() {
    this.fetchProvinsi();
  },
  methods: {
    fetchProvinsi() {
      fetch("https://www.emsifa.com/api-wilayah-indonesia/api/provinces.json") // Use HTTPS
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json();
        })
        .then((data) => {
          this.provinsiList = data; // Set the provinces list
        })
        .catch((error) => {
          console.error("Error fetching provinces:", error);
        });
    },

    fetchKabKota() {
      const selectedProvinsiId = this.formData.provinsi?.id; // Extract ID from selected province
      if (selectedProvinsiId) {
        fetch(
          `https://www.emsifa.com/api-wilayah-indonesia/api/regencies/${selectedProvinsiId}.json`
        ) // Use HTTPS
          .then((response) => {
            if (!response.ok) {
              throw new Error("Network response was not ok");
            }
            return response.json();
          })
          .then((data) => {
            this.kabKotaList = data; // Set the kabupaten/kota list
          })
          .catch((error) => {
            console.error("Error fetching kabupaten/kota:", error);
          });
      }
    },

    fetchKecamatan() {
      const selectedKabKotaId = this.formData.kabKota?.id; // Extract ID from selected kabupaten/kota
      if (selectedKabKotaId) {
        fetch(
          `https://www.emsifa.com/api-wilayah-indonesia/api/districts/${selectedKabKotaId}.json`
        ) // Use HTTPS
          .then((response) => {
            if (!response.ok) {
              throw new Error("Network response was not ok");
            }
            return response.json();
          })
          .then((data) => {
            this.kecamatanList = data; // Set the kecamatan list
          })
          .catch((error) => {
            console.error("Error fetching kecamatan:", error);
          });
      }
    },

    fetchKelurahan() {
      const selectedKecamatanId = this.formData.kecamatan?.id; // Extract ID from selected kecamatan
      if (selectedKecamatanId) {
        fetch(
          `https://www.emsifa.com/api-wilayah-indonesia/api/villages/${selectedKecamatanId}.json`
        ) // Use HTTPS
          .then((response) => {
            if (!response.ok) {
              throw new Error("Network response was not ok");
            }
            return response.json();
          })
          .then((data) => {
            this.kelurahanList = data; // Set the kelurahan list
          })
          .catch((error) => {
            console.error("Error fetching kelurahan:", error);
          });
      }
    },

    // Set selected provinsi
    setProvinsi(selectedProvinsi) {
      this.formData.provinsi = selectedProvinsi; // Update the selected province
      this.fetchKabKota(); // Fetch kabupaten/kota based on the selected province
    },

    // Set selected kabKota
    setKabKota(selectedKabKota) {
      this.formData.kabKota = selectedKabKota; // Update the selected kabupaten/kota
      this.fetchKecamatan(); // Fetch kecamatan based on the selected kabupaten/kota
    },

    // Set selected kecamatan
    setKecamatan(selectedKecamatan) {
      this.formData.kecamatan = selectedKecamatan; // Update the selected kecamatan
      this.fetchKelurahan(); // Fetch kelurahan based on the selected kecamatan
    },

    // Set selected kelurahan
    setKelurahan(selectedKelurahan) {
      this.formData.kelurahan = selectedKelurahan; // Update the selected kelurahan
    },
    handleFileUpload(type) {
      const fileInput = document.querySelector(`#${type}`);
      const file = fileInput.files[0];

      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          if (type === "fotoKk") {
            this.fotoKkUrl = e.target.result; // Set fotoKkUrl to the file's URL
          }
          // Handle other file types...
        };
        reader.readAsDataURL(file);
      }
    },
    submitForm() {
      const simulatedResponseTime = 1500;

      setTimeout(() => {
        const success = Math.random() > 0.5;
        if (success) {
          this.$router.push({
            name: "PreviewPage",
            query: { formData: JSON.stringify(this.formData) },
          });
        } else {
          alert("Pengiriman gagal. Silakan coba lagi.");
        }
      }, simulatedResponseTime);
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
