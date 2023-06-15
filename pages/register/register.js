// Mengambil form registrasi
const registerForm = document.getElementById('register-form');

// Menangani submit form registrasi
registerForm.addEventListener('submit', function(event) {
    event.preventDefault(); // Mencegah form submit secara default

    // Mendapatkan nilai input dari form
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const repeatPassword = document.getElementById('repeat-password').value;

    // Membuat objek data registrasi
    const registerData = {
        email: email,
        password: password,
        repeat_password: repeatPassword
    };

    // Mengirim data registrasi ke endpoint
    fetch('http://34.128.89.110:8080/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(registerData)
    })
    .then(response => {
        if (response.ok) {
            // Registrasi berhasil, redirect ke halaman login atau tampilkan pesan sukses
            window.location.href = "../../pages/login/login.html";
        } else {
            // Registrasi gagal, tampilkan pesan error
            throw new Error('Registrasi gagal');
        }
    })
    .catch(error => {
        console.error('Terjadi kesalahan:', error);
        alert('Registrasi gagal. Silakan coba lagi.');
    });
});
