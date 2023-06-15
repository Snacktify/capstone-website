const profileForm = document.getElementById('profileForm');

profileForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const fullName = document.getElementById('full_name').value;
    const username = document.getElementById('username').value;
    const newEmail = document.getElementById('new_email').value;
    const phoneNumber = document.getElementById('phone_number').value;

    const formData = {
        full_name: fullName,
        username: username,
        new_email: newEmail,
        phone_number: phoneNumber
    };

    fetch('http://34.128.89.110:8080/update-profile', {
        method: 'PUT',
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('access_token')}`
        },
        body: JSON.stringify(formData)
    })
    .then(response => response.json())
    .then(data => {
        console.log(data);
        // handle success response
    })
    .catch(error => {
        console.error(error);
        // handle error
    });
});
