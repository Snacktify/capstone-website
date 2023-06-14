document.getElementById("register-form").addEventListener("submit", function (event) {
    event.preventDefault();
    var username = document.getElementById("register-username").value;
    var password = document.getElementById("register-password").value;
    // Lakukan proses registrasi di sini (gunakan logika Anda sendiri)
    console.log("Username:", username);
    console.log("Password:", password);
    alert("Registration successful");
});
