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

    function getCookie(cname) {
        let name = cname + "=";
        let decodedCookie = decodeURIComponent(document.cookie);
        let ca = decodedCookie.split(';');
        for(let i = 0; i <ca.length; i++) {
          let c = ca[i];
          while (c.charAt(0) == ' ') {
            c = c.substring(1);
          }
          if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
          }
        }
        return "";
      }

    // Mengirim data login ke endpoint
    fetch('http://localhost:8080/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(loginData)
    })
    .then(response => {
        if (response.ok) {
            // Menyimpan access token ke sessionStorage
            const setCookieHeader = response.headers.get('Set-Cookie');
            console.log(setCookieHeader);
            console.log(getCookie('access_token'))
            if (setCookieHeader) {
                setCookieHeader.split(';').forEach(cookie => {
                    if (cookie.includes('access_token')) {
                        const accessToken = cookie.split('=')[1];
                        localStorage.setItem('access_token', accessToken);
                    }
                });
            }
            // Login berhasil, redirect ke halaman dashboard atau tampilkan pesan sukses
            
        } else {
            // Login gagal, tampilkan pesan error
            throw new Error('Login gagal');
        }
    })
    .catch(error => {
        console.error('Terjadi kesalahan:', error);
        alert('Login gagal. Silakan coba lagi.');
    });
});
