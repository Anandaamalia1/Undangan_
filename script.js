// === FORM RSVP ===
function initializeCommentForm() {
    const rsvpForm = document.getElementById('rsvp-form');
    if (!rsvpForm) return;

    rsvpForm.addEventListener('submit', function (e) {
        e.preventDefault();
        const formData = new FormData(rsvpForm);
        const url = 'https://formspree.io/f/xrbajyna';

        fetch(url, {
            method: 'POST',
            body: formData,
            headers: { 'Accept': 'application/json' }
        })
        .then(response => {
            if (response.ok) {
                alert('Terima kasih! Pesan kamu sudah terkirim.');
                rsvpForm.reset();
            } else {
                alert('Gagal mengirim. Silakan coba lagi.');
            }
        })
        .catch(() => {
            alert('Terjadi kesalahan. Silakan coba lagi.');
        });
    });
}

// === UTILITY ===
function getQueryParam(param) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
}

function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(() => {
        alert('Nomor rekening berhasil disalin!');
    }, () => {
        alert('Gagal menyalin nomor rekening.');
    });
}

const formatNumber = (num) => num.toString().padStart(2, '0');

// === FITUR COUNTDOWN ===
function initializeCountdown() {
    const weddingDate = new Date('October 05, 2025 10:00:00').getTime();
    const countdownFunction = setInterval(() => {
        const now = new Date().getTime();
        const distance = weddingDate - now;

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        const daysElement = document.getElementById("days");
        const hoursElement = document.getElementById("hours");
        const minutesElement = document.getElementById("minutes");
        const secondsElement = document.getElementById("seconds");

        if (daysElement) {
            daysElement.textContent = formatNumber(days);
            hoursElement.textContent = formatNumber(hours);
            minutesElement.textContent = formatNumber(minutes);
            secondsElement.textContent = formatNumber(seconds);
        }

        if (distance < 0) {
            clearInterval(countdownFunction);
        }
    }, 1000);
}

// === ANIMASI SCROLL ===
function initializeScrollAnimations() {
    const elementsToAnimate = document.querySelectorAll('.reveal-on-scroll');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            entry.target.classList.toggle('active', entry.isIntersecting);
        });
    }, {
        root: null,
        rootMargin: '0px',
        threshold: 0.2
    });

    elementsToAnimate.forEach(el => observer.observe(el));
}

// === GOOGLE CALENDAR ===
function openCalendar(e) {
    e.preventDefault();
    const eventDetails = {
        title: 'Walimatul Ursy Dinda & Agung',
        description: 'Dengan penuh rasa syukur, kami mengundang Bapak/Ibu/Saudara/i untuk hadir dalam acara resepsi pernikahan kami. Mohon berikan doa restu. URL: https://anandaamalia1.github.io/undangan-digital/',
        location: 'Wisma Yayasan Perjalanan Haji Indonesia PHI, Jl. Binjai No.270, Medan',
        startTime: '20251005T100000',
        endTime: '20251005T203000'
    };
    const googleLink = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(eventDetails.title)}&dates=${eventDetails.startTime}/${eventDetails.endTime}&details=${encodeURIComponent(eventDetails.description)}&location=${encodeURIComponent(eventDetails.location)}`;
    window.location.href = googleLink;
}

// === FUNGSI UTAMA INVITATION ===
// Letakkan di sini agar bisa diakses oleh tombol di index.html
function openInvitation() {
    const myAudio = document.getElementById('myAudio');
    const invitationButton = document.getElementById('invitation-button');

    if (invitationButton) {
        invitationButton.disabled = true;
    }

    if (myAudio) {
        myAudio.play().then(() => {
            console.log("Audio berhasil diputar.");
            window.location.href = 'undangan.html';
        }).catch(error => {
            console.warn("Gagal memutar audio. Mengabaikan dan melanjutkan navigasi.", error);
            window.location.href = 'undangan.html';
        });
    } else {
        window.location.href = 'undangan.html';
    }
}


// === INISIALISASI SAAT HALAMAN DIMUAT ===
document.addEventListener('DOMContentLoaded', () => {
    // Panggil fungsi inisialisasi untuk halaman undangan
    initializeCommentForm();
    initializeCountdown();
    initializeScrollAnimations();

    // Logika untuk animasi bunga pembuka
    const flowerOverlay = document.getElementById('flowerAnimationOverlay');
    const mainContent = document.getElementById('mainUndanganWrapper');
    
    if (flowerOverlay) {
        flowerOverlay.classList.add('show');
        flowerOverlay.querySelectorAll('.animated-flower').forEach(flower => {
            flower.classList.add('animate');
        });

        setTimeout(() => {
            flowerOverlay.classList.remove('show');
            if (mainContent) {
                mainContent.classList.add('show');
            }
        }, 2500);
    }
});