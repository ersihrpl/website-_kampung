const form = document.getElementById("contactForm");
const status = document.getElementById("status");

if (form) {
  form.addEventListener("submit", async function (e) {
    e.preventDefault();

    status.textContent = "Mengirim pesan...";

    const data = {
      nama: document.getElementById("nama").value,
      email: document.getElementById("email").value,
      pesan: document.getElementById("pesan").value
    };

    try {
      
await fetch(
  "https://script.google.com/macros/s/AKfycbwnEw-95Ikj6Cmdf9PA2kIxOFDb3T-W7F2OrzkKtgMgtmiQplLwXF_RgGgr6GZXqdxJoQ/exec",
  {
    method: "POST",
    body: JSON.stringify(data)
  }
);
      status.textContent = "✅ Pesan berhasil dikirim!";
      form.reset();

    } catch (error) {
      status.textContent = "❌ Pesan gagal dikirim.";
      console.error(error);
    }
  });
}
