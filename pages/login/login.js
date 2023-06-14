document.getElementById("login-form").addEventListener("submit", function (event) {
    event.preventDefault();
    var username = document.getElementById("login-username").value;
    var password = document.getElementById("login-password").value;
    // Lakukan verifikasi login di sini (gunakan logika Anda sendiri)
    console.log("Username:", username);
    console.log("Password:", password);
    alert("Login successful");
});  