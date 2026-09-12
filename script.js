const form = document.getElementById("contactForm");
const status = document.getElementById("status");

form.addEventListener("submit", function(e) {
  e.preventDefault();

  status.innerHTML = "⏳ Mengirim pesan...";
  status.style.background = "#fff3cd";
  status.style.color = "#856404";

  const data = {
    nama: document.getElementById("nama").value,
    email: document.getElementById("email").value,
    pesan: document.getElementById("pesan").value
  };

  fetch(fetch("https://script.google.com/macros/s/AKfycbyt2Th3zmCk94dWf5JRiGNrpPTO6gcpL4Sk48QfyHYxVL9MD_LNHPJpw3XehWPdY39WMw/exec", { {
    method: "POST",
    body: JSON.stringify(data)
  })
  .then(response => response.text())
  .then(result => {

    status.innerHTML =
      "✅ Terima kasih telah menghubungi Web Desa Seburing!<br>" +
      "Pesan Anda telah berhasil dikirim.";

    status.style.background = "#e8f5ef";
    status.style.color = "#096b48";

    form.reset();
  })
  .catch(error => {

    status.innerHTML =
      "❌ Pesan gagal dikirim.<br>" +
      "Silakan coba lagi.";

    status.style.background = "#fdeaea";
    status.style.color = "#b42318";

  });
});
