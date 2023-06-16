// Function to navigate to the snack detail page
function navigateToDetail(namaSnack) {
    window.location.href = "../detail/detail.html?namaSnack=" + encodeURIComponent(namaSnack);
}

// Gets a list of snacks from the API
fetch('https://api-service-dot-snacktify-capstone-project.et.r.appspot.com/snackvidia', {
    method: 'GET',
    headers: {
        'Authorization': `Bearer ${localStorage.getItem('access_token')}`
    }
})
    .then(response => response.json())
    .then(data => {
        const daftarMakanan = document.getElementById('daftar-snack');
        
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
