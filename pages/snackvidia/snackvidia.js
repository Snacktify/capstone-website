// Fungsi untuk menavigasikan ke halaman detail makanan
function navigateToDetail(namaSnack) {
    window.location.href = "../detail/detail.html?namaSnack=" + encodeURIComponent(namaSnack);
}

// Mendapatkan daftar makanan dari API
fetch('http://localhost:8080/snackvidia')
    .then(response => response.json())
    .then(data => {
        const daftarMakanan = document.getElementById('daftar-makanan');
        
        data.forEach(makanan => {
            const li = document.createElement('li');
            li.textContent = makanan.nama_snack;
            li.setAttribute('data-nama-snack', makanan.nama_snack);
            li.addEventListener('click', function() {
                navigateToDetail(makanan.nama_snack);
            });
            daftarMakanan.appendChild(li);
        });
    })
    .catch(error => {
        console.error('Terjadi kesalahan:', error);
    });
