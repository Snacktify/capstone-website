const profileForm = document.getElementById('profileForm');

profileForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const full_name = document.getElementById('full_name').value;
    const username = document.getElementById('username').value;
    const new_email = document.getElementById('new_email').value;
    const phone_number = document.getElementById('phone_number').value;

    const formData = {
        full_name: full_name,
        username: username,
        new_email: new_email,
        phone_number: phone_number
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
