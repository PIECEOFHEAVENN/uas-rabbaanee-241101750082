document.addEventListener('DOMContentLoaded', function() {
    const navLinks = document.querySelectorAll('.nav-link');
    const pages = document.querySelectorAll('.page');
    const loadingOverlay = document.getElementById('loading-overlay');

    // Mencegah scroll pada body saat animasi berlangsung
    document.body.style.overflow = 'hidden';

    // Setelah animasi buku selesai (sekitar 2 detik), baru fade out overlaynya
    setTimeout(() => {
        loadingOverlay.classList.add('fade-out');
        // Setelah overlay benar-benar hilang, kembalikan overflow body
        loadingOverlay.addEventListener('transitionend', function() {
            this.style.display = 'none'; // Sembunyikan elemen overlay
            document.body.style.overflow = ''; // Kembalikan overflow ke default
            // Panggil showPage('beranda') di sini jika Anda ingin halaman beranda muncul setelah animasi loading selesai
            // showPage('beranda');
        }, { once: true }); // Pastikan event listener hanya dijalankan sekali
    }, 2000); // Durasi animasi slideBook adalah 2s


    function showPage(pageId) {
        // Hapus kelas 'active' dari semua tautan navigasi
        navLinks.forEach(link => link.classList.remove('active'));

        // Tambahkan kelas 'active' ke tautan navigasi yang sesuai
        const activeLink = document.querySelector(`.nav-link[data-target="${pageId}"]`);
        if (activeLink) {
            activeLink.classList.add('active');
        }

        // Animasi fading: Hilangkan halaman yang sedang aktif terlebih dahulu
        let activePage = document.querySelector('.page.active');
        if (activePage) {
            activePage.classList.remove('active'); // Mulai animasi fade-out
            setTimeout(() => { // Tunggu sampai animasi fade-out selesai
                pages.forEach(page => {
                    page.style.display = 'none'; // Sembunyikan semua halaman
                });
                const targetPage = document.getElementById(pageId);
                if (targetPage) {
                    targetPage.style.display = 'block'; // Tampilkan halaman target
                    setTimeout(() => {
                        targetPage.classList.add('active'); // Mulai animasi fade-in
                    }, 10); // Penundaan kecil untuk memastikan transisi dimulai
                }
            }, 300); // Sesuaikan dengan durasi transisi opacity (0.3s = 300ms)
        } else {
            // Jika tidak ada halaman aktif, langsung tampilkan halaman target
            pages.forEach(page => {
                page.style.display = 'none';
            });
            const targetPage = document.getElementById(pageId);
            if (targetPage) {
                targetPage.style.display = 'block';
                setTimeout(() => {
                    targetPage.classList.add('active');
                }, 10);
            }
        }
    }

    // Event listener untuk klik navigasi
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault(); // Mencegah default anchor link behavior
            const targetId = this.dataset.target;
            showPage(targetId);
        });
    });

    // --- (Kode validasi form transaksi, login, daftar tetap sama) ---
    // Pastikan semua kode validasi form tetap di sini, seperti sebelumnya.
    const transaksiForm = document.getElementById('transaksiForm');
    if (transaksiForm) {
        transaksiForm.addEventListener('submit', function(e) {
            e.preventDefault();
            let isValid = true;

            const namaTransaksi = document.getElementById('namaTransaksi');
            const errorNamaTransaksi = document.getElementById('errorNamaTransaksi');
            if (namaTransaksi.value.trim() === '') {
                errorNamaTransaksi.style.display = 'block';
                isValid = false;
            } else {
                errorNamaTransaksi.style.display = 'none';
            }

            const jumlah = document.getElementById('jumlah');
            const errorJumlah = document.getElementById('errorJumlah');
            if (jumlah.value === '' || isNaN(jumlah.value) || parseFloat(jumlah.value) < 0) {
                errorJumlah.style.display = 'block';
                isValid = false;
            } else {
                errorJumlah.style.display = 'none';
            }

            const kategori = document.getElementById('kategori');
            const errorKategori = document.getElementById('errorKategori');
            if (kategori.value === '') {
                errorKategori.style.display = 'block';
                isValid = false;
            } else {
                errorKategori.style.display = 'none';
            }

            if (isValid) {
                const tableBody = document.querySelector('#daftarTransaksiTable tbody');
                const newRow = tableBody.insertRow();
                newRow.insertCell().textContent = namaTransaksi.value;
                newRow.insertCell().textContent = parseFloat(jumlah.value).toLocaleString('id-ID');
                newRow.insertCell().textContent = kategori.value;

                const fullTableBody = document.querySelector('#fullDaftarTransaksiTable tbody');
                const fullNewRow = fullTableBody.insertRow();
                fullNewRow.insertCell().textContent = namaTransaksi.value;
                fullNewRow.insertCell().textContent = parseFloat(jumlah.value).toLocaleString('id-ID');
                fullNewRow.insertCell().textContent = kategori.value;
                fullNewRow.insertCell().textContent = new Date().toLocaleString();

                alert('Transaksi berhasil disimpan!');
                transaksiForm.reset();
            }
        });
    }

    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            let isValid = true;

            const loginUsername = document.getElementById('loginUsername');
            const errorLoginUsername = document.getElementById('errorLoginUsername');
            if (loginUsername.value.trim() === '') {
                errorLoginUsername.style.display = 'block';
                isValid = false;
            } else {
                errorLoginUsername.style.display = 'none';
            }

            const loginPassword = document.getElementById('loginPassword');
            const errorLoginPassword = document.getElementById('errorLoginPassword');
            if (loginPassword.value.trim() === '') {
                errorLoginPassword.style.display = 'block';
                isValid = false;
            } else {
                errorLoginPassword.style.display = 'none';
            }

            if (isValid) {
                alert('Login berhasil! (Simulasi)');
                loginForm.reset();
            }
        });
    }

    const daftarForm = document.getElementById('daftarForm');
    if (daftarForm) {
        daftarForm.addEventListener('submit', function(e) {
            e.preventDefault();
            let isValid = true;

            const daftarNamaLengkap = document.getElementById('daftarNamaLengkap');
            const errorDaftarNamaLengkap = document.getElementById('errorDaftarNamaLengkap');
            if (daftarNamaLengkap.value.trim() === '') {
                errorDaftarNamaLengkap.style.display = 'block';
                isValid = false;
            } else {
                errorDaftarNamaLengkap.style.display = 'none';
            }

            const daftarEmail = document.getElementById('daftarEmail');
            const errorDaftarEmail = document.getElementById('errorDaftarEmail');
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (daftarEmail.value.trim() === '' || !emailRegex.test(daftarEmail.value)) {
                errorDaftarEmail.style.display = 'block';
                isValid = false;
            } else {
                errorDaftarEmail.style.display = 'none';
            }

            const daftarUsername = document.getElementById('daftarUsername');
            const errorDaftarUsername = document.getElementById('errorDaftarUsername');
            if (daftarUsername.value.trim() === '') {
                errorDaftarUsername.style.display = 'block';
                isValid = false;
            } else {
                errorDaftarUsername.style.display = 'none';
            }

            const daftarPassword = document.getElementById('daftarPassword');
            const errorDaftarPassword = document.getElementById('errorDaftarPassword');
            if (daftarPassword.value.trim() === '') {
                errorDaftarPassword.style.display = 'block';
                isValid = false;
            } else {
                errorDaftarPassword.style.display = 'none';
            }

            const daftarKonfirmasiPassword = document.getElementById('daftarKonfirmasiPassword');
            const errorDaftarKonfirmasiPassword = document.getElementById('errorDaftarKonfirmasiPassword');
            const errorPasswordMismatch = document.getElementById('errorPasswordMismatch');

            if (daftarKonfirmasiPassword.value.trim() === '') {
                errorDaftarKonfirmasiPassword.style.display = 'block';
                errorPasswordMismatch.style.display = 'none';
                isValid = false;
            } else {
                errorDaftarKonfirmasiPassword.style.display = 'none';
                if (daftarPassword.value !== daftarKonfirmasiPassword.value) {
                    errorPasswordMismatch.style.display = 'block';
                    isValid = false;
                } else {
                    errorPasswordMismatch.style.display = 'none';
                }
            }

            if (isValid) {
                alert('Pendaftaran berhasil! (Simulasi)');
                daftarForm.reset();
                showPage('login');
            }
        });
    }
    // Set halaman awal saat DOM dimuat
    // Tidak perlu memanggil showPage('beranda') secara eksplisit di sini karena #beranda sudah aktif
});
document.addEventListener('DOMContentLoaded', function() {
    const navLinks = document.querySelectorAll('.nav-link');
    const pages = document.querySelectorAll('.page');
    const loadingOverlay = document.getElementById('loading-overlay');

    // Mencegah scroll pada body saat animasi berlangsung
    document.body.style.overflow = 'hidden';

    // Setelah animasi buku selesai (sekitar 2 detik), baru fade out overlaynya
    setTimeout(() => {
        loadingOverlay.classList.add('fade-out');
        // Setelah overlay benar-benar hilang, kembalikan overflow body
        loadingOverlay.addEventListener('transitionend', function() {
            this.style.display = 'none'; // Sembunyikan elemen overlay
            document.body.style.overflow = ''; // Kembalikan overflow ke default
            // Panggil showPage('beranda') di sini jika Anda ingin halaman beranda muncul setelah animasi loading selesai
            // showPage('beranda');
        }, { once: true }); // Pastikan event listener hanya dijalankan sekali
    }, 2000); // Durasi animasi slideBook adalah 2s


    function showPage(pageId) {
        // Hapus kelas 'active' dari semua tautan navigasi
        navLinks.forEach(link => link.classList.remove('active'));

        // Tambahkan kelas 'active' ke tautan navigasi yang sesuai
        const activeLink = document.querySelector(`.nav-link[data-target="${pageId}"]`);
        if (activeLink) {
            activeLink.classList.add('active');
        }

        // Animasi fading: Hilangkan halaman yang sedang aktif terlebih dahulu
        let activePage = document.querySelector('.page.active');
        if (activePage) {
            activePage.classList.remove('active'); // Mulai animasi fade-out
            setTimeout(() => { // Tunggu sampai animasi fade-out selesai
                pages.forEach(page => {
                    page.style.display = 'none'; // Sembunyikan semua halaman
                });
                const targetPage = document.getElementById(pageId);
                if (targetPage) {
                    targetPage.style.display = 'block'; // Tampilkan halaman target
                    setTimeout(() => {
                        targetPage.classList.add('active'); // Mulai animasi fade-in
                    }, 10); // Penundaan kecil untuk memastikan transisi dimulai
                }
            }, 300); // Sesuaikan dengan durasi transisi opacity (0.3s = 300ms)
        } else {
            // Jika tidak ada halaman aktif, langsung tampilkan halaman target
            pages.forEach(page => {
                page.style.display = 'none';
            });
            const targetPage = document.getElementById(pageId);
            if (targetPage) {
                targetPage.style.display = 'block';
                setTimeout(() => {
                    targetPage.classList.add('active');
                }, 10);
            }
        }
    }

    // Event listener untuk klik navigasi
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault(); // Mencegah default anchor link behavior
            const targetId = this.dataset.target;
            showPage(targetId);
        });
    });

    // --- (Kode validasi form transaksi, login, daftar tetap sama) ---
    // Pastikan semua kode validasi form tetap di sini, seperti sebelumnya.
    const transaksiForm = document.getElementById('transaksiForm');
    if (transaksiForm) {
        transaksiForm.addEventListener('submit', function(e) {
            e.preventDefault();
            let isValid = true;

            const namaTransaksi = document.getElementById('namaTransaksi');
            const errorNamaTransaksi = document.getElementById('errorNamaTransaksi');
            if (namaTransaksi.value.trim() === '') {
                errorNamaTransaksi.style.display = 'block';
                isValid = false;
            } else {
                errorNamaTransaksi.style.display = 'none';
            }

            const jumlah = document.getElementById('jumlah');
            const errorJumlah = document.getElementById('errorJumlah');
            if (jumlah.value === '' || isNaN(jumlah.value) || parseFloat(jumlah.value) < 0) {
                errorJumlah.style.display = 'block';
                isValid = false;
            } else {
                errorJumlah.style.display = 'none';
            }

            const kategori = document.getElementById('kategori');
            const errorKategori = document.getElementById('errorKategori');
            if (kategori.value === '') {
                errorKategori.style.display = 'block';
                isValid = false;
            } else {
                errorKategori.style.display = 'none';
            }

            if (isValid) {
                const tableBody = document.querySelector('#daftarTransaksiTable tbody');
                const newRow = tableBody.insertRow();
                newRow.insertCell().textContent = namaTransaksi.value;
                newRow.insertCell().textContent = parseFloat(jumlah.value).toLocaleString('id-ID');
                newRow.insertCell().textContent = kategori.value;

                const fullTableBody = document.querySelector('#fullDaftarTransaksiTable tbody');
                const fullNewRow = fullTableBody.insertRow();
                fullNewRow.insertCell().textContent = namaTransaksi.value;
                fullNewRow.insertCell().textContent = parseFloat(jumlah.value).toLocaleString('id-ID');
                fullNewRow.insertCell().textContent = kategori.value;
                fullNewRow.insertCell().textContent = new Date().toLocaleString();

                alert('Transaksi berhasil disimpan!');
                transaksiForm.reset();
            }
        });
    }

    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            let isValid = true;

            const loginUsername = document.getElementById('loginUsername');
            const errorLoginUsername = document.getElementById('errorLoginUsername');
            if (loginUsername.value.trim() === '') {
                errorLoginUsername.style.display = 'block';
                isValid = false;
            } else {
                errorLoginUsername.style.display = 'none';
            }

            const loginPassword = document.getElementById('loginPassword');
            const errorLoginPassword = document.getElementById('errorLoginPassword');
            if (loginPassword.value.trim() === '') {
                errorLoginPassword.style.display = 'block';
                isValid = false;
            } else {
                errorLoginPassword.style.display = 'none';
            }

            if (isValid) {
                alert('Login berhasil! (Simulasi)');
                loginForm.reset();
            }
        });
    }

    const daftarForm = document.getElementById('daftarForm');
    if (daftarForm) {
        daftarForm.addEventListener('submit', function(e) {
            e.preventDefault();
            let isValid = true;

            const daftarNamaLengkap = document.getElementById('daftarNamaLengkap');
            const errorDaftarNamaLengkap = document.getElementById('errorDaftarNamaLengkap');
            if (daftarNamaLengkap.value.trim() === '') {
                errorDaftarNamaLengkap.style.display = 'block';
                isValid = false;
            } else {
                errorDaftarNamaLengkap.style.display = 'none';
            }

            const daftarEmail = document.getElementById('daftarEmail');
            const errorDaftarEmail = document.getElementById('errorDaftarEmail');
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (daftarEmail.value.trim() === '' || !emailRegex.test(daftarEmail.value)) {
                errorDaftarEmail.style.display = 'block';
                isValid = false;
            } else {
                errorDaftarEmail.style.display = 'none';
            }

            const daftarUsername = document.getElementById('daftarUsername');
            const errorDaftarUsername = document.getElementById('errorDaftarUsername');
            if (daftarUsername.value.trim() === '') {
                errorDaftarUsername.style.display = 'block';
                isValid = false;
            } else {
                errorDaftarUsername.style.display = 'none';
            }

            const daftarPassword = document.getElementById('daftarPassword');
            const errorDaftarPassword = document.getElementById('errorDaftarPassword');
            if (daftarPassword.value.trim() === '') {
                errorDaftarPassword.style.display = 'block';
                isValid = false;
            } else {
                errorDaftarPassword.style.display = 'none';
            }

            const daftarKonfirmasiPassword = document.getElementById('daftarKonfirmasiPassword');
            const errorDaftarKonfirmasiPassword = document.getElementById('errorDaftarKonfirmasiPassword');
            const errorPasswordMismatch = document.getElementById('errorPasswordMismatch');

            if (daftarKonfirmasiPassword.value.trim() === '') {
                errorDaftarKonfirmasiPassword.style.display = 'block';
                errorPasswordMismatch.style.display = 'none';
                isValid = false;
            } else {
                errorDaftarKonfirmasiPassword.style.display = 'none';
                if (daftarPassword.value !== daftarKonfirmasiPassword.value) {
                    errorPasswordMismatch.style.display = 'block';
                    isValid = false;
                } else {
                    errorPasswordMismatch.style.display = 'none';
                }
            }

            if (isValid) {
                alert('Pendaftaran berhasil! (Simulasi)');
                daftarForm.reset();
                showPage('login');
            }
        });
    }
    // Set halaman awal saat DOM dimuat
    // Tidak perlu memanggil showPage('beranda') secara eksplisit di sini karena #beranda sudah aktif
});