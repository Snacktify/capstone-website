// Mengambil nama snack dari parameter URL
const urlParams = new URLSearchParams(window.location.search);
const namaSnack = urlParams.get('namaSnack');

// Mengambil informasi lengkap makanan dari API berdasarkan nama snack
fetch(`http://localhost:8080/snackvidia/${namaSnack}`)
    .then(response => response.json())
    .then(data => {
        const detailMakanan = document.getElementById('detail-makanan');
        
        // Membuat elemen untuk menampilkan informasi makanan
        const namaMakanan = document.createElement('h2');
        namaMakanan.textContent = data.nama_snack;
        detailMakanan.appendChild(namaMakanan);

        const deskripsiMakanan = document.createElement('p');
        deskripsiMakanan.textContent = data.deskripsi;
        detailMakanan.appendChild(deskripsiMakanan);

        const hargaMakanan = document.createElement('p');
        hargaMakanan.textContent = `Harga: ${data.harga}`;
        detailMakanan.appendChild(hargaMakanan);
    })
    .catch(error => {
        console.error('Terjadi kesalahan:', error);
    });
