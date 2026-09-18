const form = document.getElementById("contactForm");
const status = document.getElementById("status");

// =====================================================
// GOOGLE APPS SCRIPT
// =====================================================

// URL untuk KIRIM PENGADUAN
const API_URL =
"https://script.google.com/macros/s/AKfycbw2UAZC4UIbNLU81ue50_8DRs6REehpsncplU_VgBqxK2SgyGGu-fETIDggLAS41lwTgw/exec";

// URL untuk CEK STATUS
const API_CEK_URL =
"https://script.google.com/macros/s/AKfycbybZebuhss9B0nu_786kLgTOQClLAierBsJxbigGT1t-VwO7oEFuFv9FYZlyt7cShDCaQ/exec";

// =====================================================
// MEMBUAT TOKEN
// =====================================================

function buatToken() {

const karakter =
"ABCDEFGHJKLMNPQRSTUVWXYZ23456789";

let kode = "";

for (let i = 0; i < 6; i++) {

kode += karakter.charAt(
  Math.floor(
    Math.random() * karakter.length
  )
);

}

return "SBG-" + kode;
}

// =====================================================
// FORM KIRIM PENGADUAN
// =====================================================

if (form) {

form.addEventListener(
"submit",
function (e) {

  e.preventDefault();


  // Ambil data
  const nama =
    document
      .getElementById("nama")
      .value
      .trim();

  const email =
    document
      .getElementById("email")
      .value
      .trim();

  const pesan =
    document
      .getElementById("pesan")
      .value
      .trim();


  // Validasi
  if (!nama || !email || !pesan) {

    status.innerHTML =
      "⚠️ Semua kolom harus diisi.";

    status.style.background =
      "#fff3cd";

    status.style.color =
      "#856404";

    status.style.padding =
      "15px";

    status.style.marginTop =
      "20px";

    status.style.borderRadius =
      "10px";

    return;

  }


  // Buat token
  const token =
    buatToken();


  // Tampilkan loading
  status.innerHTML =
    "⏳ Mengirim pengaduan...";

  status.style.background =
    "#fff3cd";

  status.style.color =
    "#856404";

  status.style.padding =
    "15px";

  status.style.marginTop =
    "20px";

  status.style.borderRadius =
    "10px";


  // Data yang dikirim
  const data = {

    nama: nama,

    email: email,

    pesan: pesan,

    token: token

  };


  // Kirim ke Google Apps Script
  fetch(
    API_URL,
    {

      method: "POST",

      mode: "no-cors",

      body: JSON.stringify(data)

    }
  )

  .then(
    function () {


      // Simpan token di browser
      localStorage.setItem(
        "tokenPengaduan",
        token
      );


      // Tampilkan token
      status.innerHTML =

        "✅ <b>Pengaduan berhasil dikirim!</b>" +

        "<br><br>" +

        "🔑 <b>Token Pengaduan Anda:</b>" +

        "<br>" +

        "<span style='" +

        "display:inline-block;" +

        "font-size:24px;" +

        "font-weight:bold;" +

        "margin:10px 0;" +

        "padding:10px 18px;" +

        "background:white;" +

        "border-radius:8px;" +

        "letter-spacing:2px;" +

        "'>" +

        token +

        "</span>" +

        "<br><br>" +

        "⚠️ Simpan token ini untuk " +

        "mengecek status pengaduan.";


      status.style.background =
        "#e8f5ef";

      status.style.color =
        "#096b48";


      // Kosongkan form
      form.reset();

    }
  )

  .catch(
    function (error) {

      console.error(
        "Error kirim pengaduan:",
        error
      );


      status.innerHTML =

        "❌ <b>Pengaduan gagal dikirim.</b>" +

        "<br>" +

        "Silakan coba lagi.";


      status.style.background =
        "#fdeaea";

      status.style.color =
        "#b42318";

    }
  );

}

);

}

// =====================================================
// FORM CEK STATUS
// =====================================================

const cekForm =
document.getElementById(
"cekForm"
);

const hasilCek =
document.getElementById(
"hasilCek"
);

// Pastikan form cek status tersedia
if (cekForm) {

cekForm.addEventListener(
"submit",
function (e) {

  // ===============================================
  // SANGAT PENTING
  // MENCEGAH HALAMAN KEMBALI / RELOAD
  // ===============================================

  e.preventDefault();


  // Ambil token
  const tokenElement =
    document.getElementById(
      "tokenCek"
    );

  const token =
    tokenElement.value.trim();


  // ===============================================
  // VALIDASI TOKEN
  // ===============================================

  if (!token) {

    hasilCek.innerHTML =
      "⚠️ Masukkan token pengaduan terlebih dahulu.";

    hasilCek.style.background =
      "#fff3cd";

    hasilCek.style.color =
      "#856404";

    hasilCek.style.padding =
      "15px";

    hasilCek.style.marginTop =
      "20px";

    hasilCek.style.borderRadius =
      "10px";

    return;

  }


  // ===============================================
  // TAMPILKAN LOADING
  // ===============================================

  hasilCek.innerHTML =
    "⏳ Mencari pengaduan...";

  hasilCek.style.background =
    "#fff3cd";

  hasilCek.style.color =
    "#856404";

  hasilCek.style.padding =
    "15px";

  hasilCek.style.marginTop =
    "20px";

  hasilCek.style.borderRadius =
    "10px";


  // ===============================================
  // CEK TOKEN KE GOOGLE APPS SCRIPT
  // ===============================================

  const url =
    API_CEK_URL +
    "?token=" +
    encodeURIComponent(token);


  fetch(url)

    .then(
      function (response) {

        if (!response.ok) {

          throw new Error(
            "HTTP Error " +
            response.status
          );

        }

        return response.json();

      }
    )

    .then(
      function (result) {


        console.log(
          "Hasil dari server:",
          result
        );


        // =========================================
        // TOKEN TIDAK DITEMUKAN
        // =========================================

        if (
          !result ||
          result.status !== "success"
        ) {

          hasilCek.innerHTML =

            "❌ <b>Token tidak ditemukan.</b>" +

            "<br><br>" +

            "Pastikan token yang dimasukkan benar.";


          hasilCek.style.background =
            "#fdeaea";

          hasilCek.style.color =
            "#b42318";

          return;

        }


        // =========================================
        // DATA DITEMUKAN
        // =========================================

        const data =
          result.data || {};


        // =========================================
        // TAMPILKAN HASIL
        // =========================================

        hasilCek.innerHTML =

          "<h3>📋 Detail Pengaduan</h3>" +

          "<p>" +

          "<b>🔑 Token:</b><br>" +

          (data.token || token) +

          "</p>" +


          "<p>" +

          "<b>👤 Nama:</b><br>" +

          (data.nama || "-") +

          "</p>" +


          "<p>" +

          "<b>📧 Email:</b><br>" +

          (data.email || "-") +

          "</p>" +


          "<p>" +

          "<b>📝 Pengaduan:</b><br>" +

          (data.pesan || "-") +

          "</p>" +


          "<p>" +

          "<b>📌 Status:</b><br>" +

          (data.status || "Belum diproses") +

          "</p>" +


          "<p>" +

          "<b>💬 Tanggapan Admin:</b><br>" +

          (

            data.tanggapan

              ? data.tanggapan

              : "Belum ada tanggapan dari admin."

          ) +

          "</p>";


        // =========================================
        // WARNA HASIL
        // =========================================

        hasilCek.style.background =
          "#e8f5ef";

        hasilCek.style.color =
          "#096b48";

        hasilCek.style.padding =
          "15px";

        hasilCek.style.marginTop =
          "20px";

        hasilCek.style.borderRadius =
          "10px";


      }
    )

    .catch(
      function (error) {


        console.error(
          "Error cek status:",
          error
        );


        // =========================================
        // ERROR
        // =========================================

        hasilCek.innerHTML =

          "❌ <b>Gagal mengecek pengaduan.</b>" +

          "<br><br>" +

          "Tidak dapat terhubung ke server.";


        hasilCek.style.background =
          "#fdeaea";

        hasilCek.style.color =
          "#b42318";

        hasilCek.style.padding =
          "15px";

        hasilCek.style.marginTop =
          "20px";

        hasilCek.style.borderRadius =
          "10px";

      }
    );

}

);

}
