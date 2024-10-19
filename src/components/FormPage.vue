<template>
  <div class="container">
    <h1>Form Pendaftaran Bantuan Sosial</h1>
    <form @submit.prevent="submitForm">
      <input v-model="formData.nama" type="text" placeholder="Nama" required />
      <input v-model="formData.nik" type="number" placeholder="NIK" required />
      <input
        v-model="formData.nomorKk"
        type="number"
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
        placeholder="Umur"
        required
      />
      <select v-model="formData.jenisKelamin" required>
        <option value="" disabled>Jenis Kelamin</option>
        <option value="Laki-laki">Laki-laki</option>
        <option value="Perempuan">Perempuan</option>
      </select>

      <label for="provinsi">Provinsi:</label>
      <select @change="setProvinsi(provinsiList[$event.target.selectedIndex])">
        <option
          v-for="provinsi in provinsiList"
          :key="provinsi.id"
          :value="provinsi.id"
        >
          {{ provinsi.name }}
        </option>
      </select>

      <label for="kabKota">Kabupaten/Kota:</label>
      <select @change="setKabKota(kabKotaList[$event.target.selectedIndex])">
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
        @change="setKecamatan(kecamatanList[$event.target.selectedIndex])"
      >
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
        @change="setKelurahan(kelurahanList[$event.target.selectedIndex])"
      >
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
        placeholder="Alamat"
        required
      />
      <input v-model="formData.rt" type="text" placeholder="RT" required />
      <input v-model="formData.rw" type="text" placeholder="RW" required />
      <input
        v-model="formData.penghasilanSebelumPandemi"
        type="number"
        placeholder="Penghasilan Sebelum Pandemi"
        required
      />
      <input
        v-model="formData.penghasilanSetelahPandemi"
        type="number"
        placeholder="Penghasilan Setelah Pandemi"
        required
      />

      <select v-model="formData.alasanBantuan" required>
        <option value="" disabled>Alasan Membutuhkan Bantuan</option>
        <option value="Kehilangan pekerjaan">Kehilangan pekerjaan</option>
        <option value="Kepala keluarga">Kepala keluarga</option>
        <option value="Tergolong fakir/miskin">Tergolong fakir/miskin</option>
        <option value="Lainnya">Lainnya</option>
      </select>

      <div class="confirmation-container">
        <input type="checkbox" id="confirm" v-model="isConfirmed" required />
        <label for="confirm">
          Saya menyatakan bahwa data yang diisikan adalah benar dan siap
          mempertanggungjawabkan apabila ditemukan ketidak sesuaian dalam data
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
      fetch("https://www.emsifa.com/api-wilayah-indonesia/api/provinces.json") // Change to HTTPS
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json();
        })
        .then((data) => {
          this.provinsiList = data;
        })
        .catch((error) => {
          console.error("Error fetching provinces:", error);
        });
    },
    fetchKabKota() {
      const selectedProvinsi = this.formData.provinsi?.id;
      if (selectedProvinsi) {
        fetch(
          `http://www.emsifa.com/api-wilayah-indonesia/api/regencies/${selectedProvinsi}.json`
        )
          .then((response) => response.json())
          .then((data) => {
            this.kabKotaList = data;
          })
          .catch((error) =>
            console.error("Error fetching kabupaten/kota:", error)
          );
      }
    },
    fetchKecamatan() {
      const selectedKabKota = this.formData.kabKota?.id;
      if (selectedKabKota) {
        fetch(
          `http://www.emsifa.com/api-wilayah-indonesia/api/districts/${selectedKabKota}.json`
        )
          .then((response) => response.json())
          .then((data) => {
            this.kecamatanList = data;
          })
          .catch((error) => console.error("Error fetching kecamatan:", error));
      }
    },
    fetchKelurahan() {
      const selectedKecamatan = this.formData.kecamatan?.id;
      if (selectedKecamatan) {
        fetch(
          `http://www.emsifa.com/api-wilayah-indonesia/api/villages/${selectedKecamatan}.json`
        )
          .then((response) => response.json())
          .then((data) => {
            this.kelurahanList = data;
          })
          .catch((error) => console.error("Error fetching kelurahan:", error));
      }
    },
    // Set selected provinsi
    setProvinsi(selectedProvinsi) {
      this.formData.provinsi = selectedProvinsi;
      this.fetchKabKota();
    },
    // Set selected kabKota
    setKabKota(selectedKabKota) {
      this.formData.kabKota = selectedKabKota;
      this.fetchKecamatan();
    },
    // Set selected kecamatan
    setKecamatan(selectedKecamatan) {
      this.formData.kecamatan = selectedKecamatan;
      this.fetchKelurahan();
    },

    setKelurahan(selectedKelurahan) {
      this.formData.kelurahan = selectedKelurahan;
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
