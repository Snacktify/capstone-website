// Get the snack name from the URL parameter
const urlParams = new URLSearchParams(window.location.search);
const namaSnack = urlParams.get('namaSnack');

// Retrieving complete snack information from the API based on the snack name
fetch(`http://34.128.89.110:8080/snackvidia/${namaSnack}`, {
    method: 'GET',
    headers: {
        'Authorization': `Bearer ${localStorage.getItem('access_token')}`
    }
})
    .then(response => response.json())
    .then(data => {
        const detailMakanan = document.getElementById('detail-makanan');
        
        // Create an element to display snack information
        const namaMakanan = document.createElement('h2');
        namaMakanan.textContent = data.nama_snack;
        detailMakanan.appendChild(namaMakanan);

        const deskripsiMakanan = document.createElement('p');
        deskripsiMakanan.textContent = data.deskripsi;
        detailMakanan.appendChild(deskripsiMakanan);

        const ratingMakanan = document.createElement('p');
        ratingMakanan.textContent = `Rating: ${data.rating}`;
        detailMakanan.appendChild(ratingMakanan);

        const asalDaerahMakanan = document.createElement('p');
        asalDaerahMakanan.textContent = `Asal Daerah: ${data.asal_daerah}`;
        detailMakanan.appendChild(asalDaerahMakanan);

        const hargaMakanan = document.createElement('p');
        hargaMakanan.textContent = `Harga: ${data.harga}`;
        detailMakanan.appendChild(hargaMakanan);
    })
    .catch(error => {
        console.error('Terjadi kesalahan:', error);
    });
