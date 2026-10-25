
const tanggalNikah = new Date(2026, 10, 28, 8, 0, 0);


let musikMenyala = false;


let timerToast;

let daftarUcapan = [
  {
    nama: "Ustadz Abdullah & Keluarga",
    kehadiran: "Hadir",
    jumlah: 2,
    ucapan: "Barakallahu lakuma wa baraka alaikuma wa jamaa bainakuma fii khair. Semoga ananda Ahmad & Fatimah menjadi keluarga sakinah, mawaddah, warahmah serta dikaruniai keturunan yang shaleh dan shalehah. Aamiin.",
    waktu: "Kemarin, 19:40 WIB"
  },
  {
    nama: "Dr. Hendra Wijaya & Istri",
    kehadiran: "Hadir",
    jumlah: 2,
    ucapan: "Selamat menempuh hidup baru untuk kedua mempelai dan keluarga besar! Semoga perjalanan bahtera rumah tangganya selalu dipenuhi kebahagiaan dan keberkahan berlimpah.",
    waktu: "Kemarin, 21:15 WIB"
  },
  {
    nama: "Sarah Nabila, S.Farm.",
    kehadiran: "Hadir",
    jumlah: 1,
    ucapan: "MasyaAllah cantiknya sahabatku Fatimah! Selamat berbahagia untuk Fatimah dan Mas Ahmad. Lancar sampai hari H yaa!",
    waktu: "Hari ini, 08:30 WIB"
  }
];


function tambahNol(angka) {
  if (angka < 10) {
    return "0" + angka;
  }
  return String(angka);
}

function tampilkanToast(pesan) {
  const toast = document.getElementById("toast");
  document.getElementById("toast-teks").textContent = pesan;

  toast.classList.add("tampil");

  clearTimeout(timerToast);  
  timerToast = setTimeout(() => {
    toast.classList.remove("tampil");
  }, 3000);
}

function salin(teks, jenis) {
  if (!navigator.clipboard) {
    tampilkanToast("Salin manual: " + teks);
    return;
  }

  navigator.clipboard.writeText(teks)
    .then(() => {
      tampilkanToast(jenis + " berhasil disalin!");
    })
    .catch(() => {
      tampilkanToast("Gagal menyalin. Salin manual: " + teks);
    });
}


function bukaUndangan() {
  const nama = document.getElementById("input-tamu").value.trim();

  if (nama === "") {
    alert("Nama wajib diisi!");
    return false;  
  }

  document.getElementById("nama-tamu").textContent = nama;
  document.getElementById("rsvp-nama").value = nama;

  document.getElementById("cover").classList.add("terbuka");

  document.body.classList.remove("kunci");

  const menu = document.getElementById("nav-bawah");
  menu.classList.remove("d-none");
  menu.classList.add("d-flex");

  nyalakanMusik();

  return false;    
}


const musik = document.getElementById("musik");
const tombolMusik = document.getElementById("tombol-musik");
const ikonMusik = document.getElementById("ikon-musik");

function nyalakanMusik() {
  musik.play().catch(() => {
    console.warn("Musik gagal diputar (diblokir browser atau tidak ada internet).");
  });
  musikMenyala = true;
  ikonMusik.className = "bi bi-pause-circle fs-5";
}

function matikanMusik() {
  musik.pause();
  musikMenyala = false;
  ikonMusik.className = "bi bi-play-circle fs-5";
}

tombolMusik.addEventListener("click", () => {
  if (musikMenyala) {
    matikanMusik();
  } else {
    nyalakanMusik();
  }
});


function hitungMundur() {
  const sekarang = new Date();
  const selisih = tanggalNikah - sekarang;   


  if (selisih < 0) {
    document.getElementById("cd-hari").textContent = "00";
    document.getElementById("cd-jam").textContent = "00";
    document.getElementById("cd-menit").textContent = "00";
    document.getElementById("cd-detik").textContent = "00";
    return;
  }


  const hari = Math.floor(selisih / (1000 * 60 * 60 * 24));
  const jam = Math.floor((selisih % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const menit = Math.floor((selisih % (1000 * 60 * 60)) / (1000 * 60));
  const detik = Math.floor((selisih % (1000 * 60)) / 1000);

  document.getElementById("cd-hari").textContent = tambahNol(hari);
  document.getElementById("cd-jam").textContent = tambahNol(jam);
  document.getElementById("cd-menit").textContent = tambahNol(menit);
  document.getElementById("cd-detik").textContent = tambahNol(detik);
}

hitungMundur();                   
setInterval(hitungMundur, 1000);  


document.getElementById("tombol-salin-bca").addEventListener("click", () => {
  salin("5820491288", "Nomor rekening BCA");
});

document.getElementById("tombol-salin-mandiri").addEventListener("click", () => {
  salin("1370019284729", "Nomor rekening Mandiri");
});

document.getElementById("tombol-salin-alamat").addEventListener("click", () => {
  const alamat = document.getElementById("alamat-kado").textContent.trim();
  salin(alamat, "Alamat");
});



function tampilkanUcapan() {
  const wadah = document.getElementById("daftar-ucapan");
  wadah.innerHTML = "";   

  let totalHadir = 0;

  daftarUcapan.forEach((item) => {

   
    if (item.kehadiran === "Hadir") {
      totalHadir += item.jumlah;
    }

    let kelasStatus;
    switch (item.kehadiran) {
      case "Hadir":
        kelasStatus = "status-hadir";
        break;
      case "Ragu-ragu":
        kelasStatus = "status-ragu";
        break;
      default:
        kelasStatus = "status-tidak";
    }

   
    const kartu = document.createElement("div");
    kartu.className = "ucapan-item";

    const atas = document.createElement("div");
    atas.className = "ucapan-atas";

    const nama = document.createElement("span");
    nama.className = "ucapan-nama";
    nama.textContent = item.nama;

    const status = document.createElement("span");
    status.className = "status " + kelasStatus;
    status.textContent = item.kehadiran;

    atas.appendChild(nama);
    atas.appendChild(status);

    const isi = document.createElement("p");
    isi.className = "ucapan-isi";
    isi.textContent = item.ucapan;

    const waktu = document.createElement("small");
    waktu.className = "ucapan-waktu";
    waktu.textContent = item.waktu;

    kartu.appendChild(atas);
    kartu.appendChild(isi);
    kartu.appendChild(waktu);

    wadah.appendChild(kartu);
  });

  document.getElementById("jumlah-doa").textContent = daftarUcapan.length + " Doa";
  document.getElementById("jumlah-hadir").textContent = totalHadir + " Hadir";
}


function kirimUcapan() {
  const nama = document.getElementById("rsvp-nama").value.trim();
  const kehadiran = document.getElementById("rsvp-kehadiran").value;
  const jumlah = Number(document.getElementById("rsvp-jumlah").value);
  const ucapan = document.getElementById("rsvp-ucapan").value.trim();

  // Validasi
  if (nama === "" || ucapan === "") {
    alert("Nama dan ucapan wajib diisi!");
    return false;
  }
  if (jumlah < 1 || jumlah > 5) {
    alert("Jumlah tamu harus antara 1 sampai 5 orang.");
    return false;
  }

 
  const sekarang = new Date();
  const jamMenit = tambahNol(sekarang.getHours()) + ":" + tambahNol(sekarang.getMinutes());


  const ucapanBaru = {
    nama: nama,
    kehadiran: kehadiran,
    jumlah: jumlah,
    ucapan: ucapan,
    waktu: "Hari ini, " + jamMenit + " WIB"
  };

  daftarUcapan.unshift(ucapanBaru);   
  tampilkanUcapan();

  document.getElementById("form-rsvp").reset();
  tampilkanToast("Terima kasih atas konfirmasi & doa restu Anda!");

  return false;     
}


tampilkanUcapan();



 const canvas = document.getElementById('petals-canvas');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    window.addEventListener('resize', () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    });

   
    const petals = [];
    const petalColors = [
      'rgba(255, 209, 220, 0.65)', // Blush pink
      'rgba(253, 223, 206, 0.70)', // Peach
      'rgba(255, 235, 238, 0.60)', // Soft rose
      'rgba(223, 186, 85, 0.40)'   // Gold shimmer petal
    ];

    for (let i = 0; i < 28; i++) {
      petals.push({
        x: Math.random() * width,
        y: Math.random() * height,
        r: Math.random() * 8 + 6,
        d: Math.random() * 20 + 10,
        color: petalColors[Math.floor(Math.random() * petalColors.length)],
        tilt: Math.random() * 10,
        tiltAngleInc: Math.random() * 0.05 + 0.02,
        tiltAngle: Math.random() * Math.PI
      });
    }

    function drawPetals() {
      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < petals.length; i++) {
        const p = petals[i];
        p.tiltAngle += p.tiltAngleInc;
        p.y += (Math.cos(p.d) + 1 + p.r / 7) * 0.55;
        p.x += Math.sin(p.d) * 0.75;
        p.tilt = Math.sin(p.tiltAngle) * 12;

        ctx.beginPath();
        ctx.fillStyle = p.color;
    
        ctx.moveTo(p.x + p.tilt + p.r / 3, p.y);
        ctx.bezierCurveTo(
          p.x + p.tilt, p.y + p.r,
          p.x - p.tilt, p.y + p.r,
          p.x - p.tilt, p.y
        );
        ctx.bezierCurveTo(
          p.x - p.tilt, p.y - p.r,
          p.x + p.tilt, p.y - p.r,
          p.x + p.tilt + p.r / 3, p.y
        );
        ctx.fill();

    
        if (p.y > height + 20) {
          petals[i] = {
            x: Math.random() * width,
            y: -15,
            r: p.r,
            d: p.d,
            color: p.color,
            tilt: p.tilt,
            tiltAngleInc: p.tiltAngleInc,
            tiltAngle: p.tiltAngle
          };
        }
      }
      requestAnimationFrame(drawPetals);
    }
    requestAnimationFrame(drawPetals);
  };
