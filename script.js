/* ==================================================
   URL GOOGLE APPS SCRIPT
================================================== */

const API_URL =
    "https://script.google.com/macros/s/AKfycbz5d87vpgUbRlEI9uMlbUnd-1TkJlepogoGn27pF2Wk1X52z5RQ5LsTGzLwifNGL4nOiA/exec";


/* ==================================================
   FORM PENGADUAN
================================================== */

const form =
    document.getElementById("contactForm");

const statusBox =
    document.getElementById("status");


if (form) {

    form.addEventListener(
        "submit",
        async function (e) {

            e.preventDefault();


            const nama =
                document.getElementById("nama")
                    .value.trim();

            const email =
                document.getElementById("email")
                    .value.trim();

            const pesan =
                document.getElementById("pesan")
                    .value.trim();


            if (!nama || !email || !pesan) {

                statusBox.style.color = "red";

                statusBox.innerText =
                    "❌ Semua data harus diisi.";

                return;

            }


            statusBox.style.color =
                "#087f5b";

            statusBox.innerText =
                "⏳ Mengirim pengaduan...";


            try {

                const data =
                    new URLSearchParams();

                data.append(
                    "nama",
                    nama
                );

                data.append(
                    "email",
                    email
                );

                data.append(
                    "pesan",
                    pesan
                );


                const response =
                    await fetch(
                        API_URL,
                        {
                            method: "POST",
                            body: data
                        }
                    );


                const result =
                    await response.json();


                if (result.success) {

                    statusBox.style.color =
                        "#087f5b";

                    statusBox.innerHTML =

                        "✅ <b>Pengaduan berhasil dikirim!</b>" +

                        "<br><br>" +

                        "🔑 <b>Token Pengaduan Anda:</b>" +

                        "<br><br>" +

                        "<span style=\"" +
                        "display:inline-block;" +
                        "background:white;" +
                        "padding:15px 25px;" +
                        "border-radius:10px;" +
                        "font-size:25px;" +
                        "font-weight:bold;" +
                        "letter-spacing:3px;" +
                        "\">" +

                        escapeHTML(
                            result.token
                        ) +

                        "</span>" +

                        "<br><br>" +

                        "⚠️ Simpan token ini untuk mengecek status pengaduan.";

                    form.reset();

                } else {

                    statusBox.style.color =
                        "red";

                    statusBox.innerText =
                        "❌ " +
                        (
                            result.message ||
                            "Pengaduan gagal dikirim."
                        );

                }


            } catch (error) {

                console.error(
                    "ERROR KIRIM:",
                    error
                );

                statusBox.style.color =
                    "red";

                statusBox.innerText =
                    "❌ Gagal menghubungi server: " +
                    error.message;

            }

        }
    );

}


/* ==================================================
   CEK STATUS PENGADUAN
================================================== */

const cekForm =
    document.getElementById("cekForm");

const hasilCek =
    document.getElementById("hasilCek");


if (cekForm) {

    cekForm.addEventListener(
        "submit",
        async function (e) {

            e.preventDefault();


            const tokenInput =
                document.getElementById("tokenCek");


            let token =
                tokenInput.value.trim();


            if (!token) {

                hasilCek.style.color =
                    "red";

                hasilCek.innerText =
                    "❌ Silakan masukkan token.";

                return;

            }


            /*
             * Token dibuat otomatis menjadi huruf besar
             */

            token =
                token.toUpperCase();


            hasilCek.style.color =
                "#087f5b";

            hasilCek.innerText =
                "⏳ Mengecek pengaduan...";


            try {

                /*
                 * PENTING:
                 * Code.gs membaca:
                 *
                 * action=cekStatus
                 * token=TOKEN
                 */

                const url =
                    API_URL +
                    "?action=cekStatus&token=" +
                    encodeURIComponent(token) +
                    "&_=" +
                    Date.now();


                console.log(
                    "CEK STATUS URL:",
                    url
                );


                const response =
                    await fetch(url, {
                        method: "GET",
                        cache: "no-store"
                    });


                if (!response.ok) {

                    throw new Error(
                        "HTTP " +
                        response.status
                    );

                }


                const result =
                    await response.json();


                console.log(
                    "HASIL CEK:",
                    result
                );


                if (
                    result.success &&
                    result.data
                ) {

                    const data =
                        result.data;


                    let statusClass =
                        "status-pending";


                    if (
                        data.status ===
                        "Diproses"
                    ) {

                        statusClass =
                            "status-proses";

                    }


                    if (
                        data.status ===
                        "Selesai"
                    ) {

                        statusClass =
                            "status-selesai";

                    }


                    hasilCek.style.color =
                        "#222";


                    hasilCek.innerHTML =

                        "<div style=\"" +
                        "margin-top:25px;" +
                        "padding:20px;" +
                        "background:#e8f7f0;" +
                        "border-radius:15px;" +
                        "text-align:left;" +
                        "\">" +

                        "<h3 style=\"" +
                        "color:#087f5b;" +
                        "margin-top:0;" +
                        "\">" +

                        "✅ Pengaduan Ditemukan" +

                        "</h3>" +

                        "<p>" +
                        "<b>Token:</b> " +
                        escapeHTML(
                            data.token
                        ) +
                        "</p>" +

                        "<p>" +
                        "<b>Nama:</b> " +
                        escapeHTML(
                            data.nama
                        ) +
                        "</p>" +

                        "<p>" +
                        "<b>Email:</b> " +
                        escapeHTML(
                            data.email
                        ) +
                        "</p>" +

                        "<p>" +
                        "<b>Pengaduan:</b><br>" +
                        escapeHTML(
                            data.pesan
                        ) +
                        "</p>" +

                        "<p>" +
                        "<b>Tanggal:</b> " +
                        escapeHTML(
                            data.tanggal
                        ) +
                        "</p>" +

                        "<p>" +
                        "<b>Status:</b> " +

                        "<span class=\"" +
                        statusClass +
                        "\" style=\"" +
                        "font-weight:bold;" +
                        "\">" +

                        escapeHTML(
                            data.status
                        ) +

                        "</span>" +

                        "</p>" +

                        "<p>" +
                        "<b>Tanggapan Admin:</b><br>" +

                        (
                            data.tanggapan
                                ? escapeHTML(
                                    data.tanggapan
                                )
                                : "<i>Belum ada tanggapan dari admin.</i>"
                        ) +

                        "</p>" +

                        "</div>";

                } else {

                    hasilCek.style.color =
                        "red";

                    hasilCek.innerHTML =

                        "❌ " +

                        escapeHTML(
                            result.message ||
                            "Token tidak ditemukan."
                        );

                }


            } catch (error) {

                console.error(
                    "ERROR CEK STATUS:",
                    error
                );


                hasilCek.style.color =
                    "red";


                hasilCek.innerText =
                    "❌ Gagal menghubungi server: " +
                    error.message;

            }

        }
    );

}


/* ==================================================
   ESCAPE HTML
================================================== */

function escapeHTML(value) {

    if (
        value === null ||
        value === undefined
    ) {

        return "";

    }


    return String(value)

        .replace(
            /&/g,
            "&amp;"
        )

        .replace(
            /</g,
            "&lt;"
        )

        .replace(
            />/g,
            "&gt;"
        )

        .replace(
            /"/g,
            "&quot;"
        )

        .replace(
            /'/g,
            "&#039;"
        );

}
