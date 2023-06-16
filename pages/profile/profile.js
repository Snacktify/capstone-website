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
        email: newEmail,
        phone_number: phoneNumber
    };

    console.log(formData);

    fetch('https://api-service-dot-snacktify-capstone-project.et.r.appspot.com/update-profile', {
        method: 'PUT',
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
            'Content-Type': 'application/json'
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
