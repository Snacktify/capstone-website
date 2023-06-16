// Get the snack name from the URL parameter
const urlParams = new URLSearchParams(window.location.search);
const namaSnack = urlParams.get('namaSnack');

// Retrieving complete snack information from the API based on the snack name
fetch(`https://api-service-dot-snacktify-capstone-project.et.r.appspot.com/snackvidia/${namaSnack}`, {
    method: 'GET',
    headers: {
        'Authorization': `Bearer ${localStorage.getItem('access_token')}`
    }
})
    .then(response => response.json())
    .then(data => {
        const detailSnack = document.getElementById('detail-snack');
        
        // Create an element to display snack information
        const namaSnack = document.createElement('h2');
        namaSnack.textContent = data.nama_snack;
        detailSnack.appendChild(namaSnack);

        const deskripsiSnack = document.createElement('p');
        deskripsiSnack.textContent = data.deskripsi;
        detailSnack.appendChild(deskripsiSnack);

        const ratingSnack = document.createElement('p');
        ratingSnack.textContent = `Rating: ${data.rating}`;
        detailSnack.appendChild(ratingSnack);

        const asalDaerahSnack = document.createElement('p');
        asalDaerahSnack.textContent = `Asal Daerah: ${data.asal_daerah}`;
        detailSnack.appendChild(asalDaerahSnack);

        const hargaSnack = document.createElement('p');
        hargaSnack.textContent = `Harga: ${data.harga}`;
        detailSnack.appendChild(hargaSnack);
    })
    .catch(error => {
        console.error('Terjadi kesalahan:', error);
    });
