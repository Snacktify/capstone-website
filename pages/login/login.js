// Mengambil form login
const loginForm = document.getElementById('login-form');

// Menangani submit form login
loginForm.addEventListener('submit', function(event) {
    event.preventDefault(); // Mencegah form submit secara default

    // Mendapatkan nilai input dari form
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    // Membuat objek data login
    const loginData = {
        email: email,
        password: password
    };

    // Mengirim data login ke endpoint
    fetch('https://api-service-dot-snacktify-capstone-project.et.r.appspot.com/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(loginData)
    })
    .then(response => {
        if (response.ok) {
            // Login berhasil, redirect ke halaman home
            return response.json();
        } else {
            // Login gagal, tampilkan pesan error
            throw new Error('Login gagal');
        }
    })
    .then(data => {
        // Menyimpan access token ke session storage
        const accessToken = data.token;
        localStorage.setItem('access_token', accessToken);
        // Redirect ke halaman home
        window.location.href = '../../pages/homepage/homepage.html';
    })
    .catch(error => {
        console.error('Terjadi kesalahan:', error);
        alert('Login gagal. Silakan coba lagi.');
    });
});
