// 1. KONFIGURASI FIREBASE
// Pastikan data ini sesuai dengan Project Settings di Firebase Console kamu!
const firebaseConfig = {
    apiKey: "AIzaSy...", // Ganti dengan milikmu
    authDomain: "xiib-b7135.firebaseapp.com",
    databaseURL: "https://xiib-b7135-default-rtdb.firebaseio.com",
    projectId: "xiib-b7135",
    storageBucket: "xiib-b7135.appspot.com",
    messagingSenderId: "YOUR_SENDER_ID",
    appId: "YOUR_APP_ID"
};

// Inisialisasi Firebase
firebase.initializeApp(firebaseConfig);
const database = firebase.database();

// 2. FUNGSI BUKA AMPLOP
function openEnvelope() {
    document.getElementById('envelope').classList.add('hidden');
    document.getElementById('message-content').classList.remove('hidden');
    startHeartRain(); // Mulai hujan hati pelan saat amplop dibuka
}

// 3. FUNGSI TOMBOL MENGHINDAR (GAK MAU)
function moveButton() {
    const btnNo = document.getElementById('btn-no');
    // Menghitung posisi acak di dalam layar browser
    const x = Math.random() * (window.innerWidth - btnNo.offsetWidth);
    const y = Math.random() * (window.innerHeight - btnNo.offsetHeight);
    
    btnNo.style.position = 'fixed';
    btnNo.style.left = x + 'px';
    btnNo.style.top = y + 'px';
}

// 4. FUNGSI SAAT TOMBOL "MAU!" DIKLIK
function accepted() {
    const textDisplay = document.getElementById('text-display');
    const gif = document.getElementById('gif-display');
    const btnGroup = document.getElementById('btn-group');

    // NAMA TARGET (Ubah ini jika ingin membedakan folder di Firebase)
    const namaTarget = "Si_Dia"; 

    // A. Kirim Jawaban ke Firebase
    database.ref('hasil_jawaban/' + namaTarget).push({
        jawaban: "DITERIMA (MAU!)",
        waktu_klik: new Date().toLocaleString('id-ID'),
        status: "Success"
    });

    // B. Sembunyikan Tombol
    btnGroup.style.display = 'none';

    // C. Ganti ke GIF Beruang yang kamu pilih tadi
    gif.src = "https://media.giphy.com/media/NxC8VtyxqhMtpLoEEN/giphy.gif";

    // D. Efek Typewriter (Teks Mengetik)
    textDisplay.innerText = ""; // Kosongkan dulu teksnya
    const pesan = "Yeay! I Love You! ❤ Makasih ya udah mau nerima aku. Aku janji bakal terus bikin kamu bahagia... ";
    
    let i = 0;
    function typeWriter() {
        if (i < pesan.length) {
            textDisplay.innerHTML += pesan.charAt(i);
            i++;
            setTimeout(typeWriter, 80); // Kecepatan mengetik dalam milidetik
        }
    }
    typeWriter();

    // E. Percepat Efek Hujan Hati
    setInterval(createHeart, 150);
}

// 5. FUNGSI EFEK HUJAN HATI (BACKGROUND)
function createHeart() {
    const heart = document.createElement('div');
    heart.classList.add('heart-effect');
    heart.innerHTML = '💙'; // Menggunakan hati biru sesuai tema lofi
    heart.style.left = Math.random() * 100 + "vw";
    heart.style.fontSize = Math.random() * 20 + 10 + "px";
    heart.style.animationDuration = Math.random() * 2 + 3 + "s";
    document.body.appendChild(heart);
    
    // Hapus elemen hati setelah jatuh agar browser tidak berat
    setTimeout(() => {
        heart.remove();
    }, 5000);
}

function startHeartRain() {
    // Jalankan hujan hati pelan di awal
    setInterval(createHeart, 500);
}