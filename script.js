const form = document.getElementById("contactForm");
const status = document.getElementById("status");

// URL Google Apps Script kamu
const API_URL =
  "https://script.google.com/macros/s/AKfycbyt2Th3zmCk94dWf5JRiGNrpPTO6gcpL4Sk48QfyHYxVL9MD_LNHPJpw3XehWPdY39WMw/exec";


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

  const nama =
    document.getElementById("nama").value.trim();

  const email =
    document.getElementById("email").value.trim();

  const pesan =
    document.getElementById("pesan").value.trim();

  // Buat token
  const token = buatToken();


  status.innerHTML =
    "⏳ Mengirim pengaduan...";

  status.style.background = "#fff3cd";
  status.style.color = "#856404";


  const data = {

    nama: nama,
    email: email,
    pesan: pesan,

    // TOKEN DIKIRIM KE GOOGLE SHEETS
    token: token

  };


  fetch(API_URL, {

    method: "POST",

    mode: "no-cors",

    body: JSON.stringify(data)

  })
  .then(function () {

    // Simpan token di HP/browser
    localStorage.setItem(
      "tokenPengaduan",
      token
    );


    status.innerHTML =
      "✅ Pengaduan berhasil dikirim!<br><br>" +

      "<b>Kode Token Anda:</b><br>" +

      "<span style='font-size:22px; font-weight:bold;'>" +
      token +
      "</span><br><br>" +

      "⚠️ Simpan token ini untuk mengecek tanggapan admin.";

    status.style.background = "#e8f5ef";
    status.style.color = "#096b48";


    form.reset();

  })
  .catch(function (error) {

    status.innerHTML =
      "❌ Pengaduan gagal dikirim.<br>" +
      "Silakan coba lagi.";

    status.style.background = "#fdeaea";
    status.style.color = "#b42318";

    console.log(error);

  });

});
