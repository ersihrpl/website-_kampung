const form = document.getElementById("contactForm");
const status = document.getElementById("status");

// URL Google Apps Script
const API_URL =
  "https://script.google.com/macros/s/AKfycbw2UAZC4UIbNLU81ue50_8DRs6REehpsncplU_VgBqxK2SgyGGu-fETIDggLAS41lwTgw/exec";


// ==========================================
// MEMBUAT TOKEN
// ==========================================
function buatToken() {

  const karakter = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";

  let kode = "";

  for (let i = 0; i < 6; i++) {
    kode += karakter.charAt(
      Math.floor(Math.random() * karakter.length)
    );
  }

  return "SBG-" + kode;
}


// ==========================================
// KIRIM PENGADUAN
// ==========================================
form.addEventListener("submit", function (e) {

  e.preventDefault();

  const nama = document
    .getElementById("nama")
    .value
    .trim();

  const email = document
    .getElementById("email")
    .value
    .trim();

  const pesan = document
    .getElementById("pesan")
    .value
    .trim();


  // Buat token
  const token = buatToken();


  // Tampilkan proses
  status.innerHTML = "⏳ Mengirim pengaduan...";

  status.style.background = "#fff3cd";
  status.style.color = "#856404";
  status.style.padding = "15px";
  status.style.marginTop = "20px";
  status.style.borderRadius = "10px";


  const data = {
    nama: nama,
    email: email,
    pesan: pesan,
    token: token
  };


  fetch(API_URL, {

    method: "POST",

    mode: "no-cors",

    body: JSON.stringify(data)

  })

  .then(function () {

    // Simpan token
    localStorage.setItem(
      "tokenPengaduan",
      token
    );


    // TAMPILKAN TOKEN
    status.innerHTML =
      "✅ <b>Pengaduan berhasil dikirim!</b><br><br>" +

      "🔑 <b>Token Pengaduan Anda:</b><br>" +

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

      "</span><br><br>" +

      "⚠️ Simpan token ini untuk mengecek status pengaduan.";


    status.style.background = "#e8f5ef";
    status.style.color = "#096b48";


    // Kosongkan form
    form.reset();

  })

  .catch(function (error) {

    status.innerHTML =
      "❌ <b>Pengaduan gagal dikirim.</b><br>" +
      "Silakan coba lagi.";

    status.style.background = "#fdeaea";
    status.style.color = "#b42318";

    console.error(error);

  });

});
