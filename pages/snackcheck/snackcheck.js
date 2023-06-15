document.addEventListener('DOMContentLoaded', function () {
    const fileInput = document.getElementById('file');
    const cameraButton = document.getElementById('camera-button');
    const imagePreview = document.getElementById('image-preview');
    const removeButton = document.getElementById('remove-button');
    const checkButton = document.getElementById('check-button');
    const resultBox = document.getElementById('result-box');
    

    fileInput.addEventListener('change', function () {
        const file = fileInput.files[0];
        const reader = new FileReader();

        reader.onload = function (e) {
            imagePreview.innerHTML = `<img src="${e.target.result}" alt="Preview">`;
            removeButton.style.display = 'block'; // Menampilkan tombol "Hapus Foto"
        };

        reader.readAsDataURL(file);
    });

    cameraButton.addEventListener('click', function () {
        if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
            navigator.mediaDevices.getUserMedia({ video: true })
                .then(function (stream) {
                    const videoElement = document.createElement('video');
                    videoElement.width = 320;
                    videoElement.height = 240;

                    videoElement.srcObject = stream;
                    videoElement.play();

                    const canvasElement = document.createElement('canvas');
                    canvasElement.width = 320;
                    canvasElement.height = 240;
                    const canvasContext = canvasElement.getContext('2d');

                    const captureButton = document.createElement('button');
                    captureButton.textContent = 'Capture';
                    captureButton.addEventListener('click', function () {
                        canvasContext.drawImage(videoElement, 0, 0, canvasElement.width, canvasElement.height);

                        const imageURL = canvasElement.toDataURL('image/jpeg');
                        imagePreview.innerHTML = `<img src="${imageURL}" alt="Preview">`;

                        // Stop the video stream
                        videoElement.srcObject.getTracks().forEach(function (track) {
                            track.stop();
                        });
                        videoElement.remove();

                        removeButton.style.display = 'block'; // Menampilkan tombol "Hapus Foto"

                        // Mengirim gambar ke endpoint /predict2_image
                        const fileData = dataURLtoFile(imageURL, 'captured_image.jpg');
                        const formData = new FormData();
                        formData.append('uploaded_file', fileData);

                        fetch('http://localhost:8080/predict2_image', {
                            method: 'POST',
                            headers: {
                                'Authorization': `Bearer ${sessionStorage.getItem('access_token')}`
                            },
                            body: formData,
                        })
                            .then(response => {
                                if (!response.ok) {
                                    throw new Error('Request failed.');
                                }
                                return response.json();
                            })
                            .then(data => {
                                // Hasil prediksi dari API
                                console.log(data.prediction);
                                // Tampilkan hasil prediksi ke elemen HTML yang sesuai
                                resultBox.textContent = `Prediction: ${data.prediction}`;
                            })
                            .catch(error => {
                                console.error('Error:', error);
                                resultBox.textContent = 'An error occurred.';
                            });
                    });

                    const closeButton = document.createElement('button');
                    closeButton.textContent = 'Close';
                    closeButton.addEventListener('click', function () {
                        // Stop the video stream
                        videoElement.srcObject.getTracks().forEach(function (track) {
                            track.stop();
                        });

                        // Remove video, buttons, and canvas from DOM
                        videoElement.remove();
                        captureButton.remove();
                        closeButton.remove();
                        canvasElement.remove();
                    });

                    // Append video, buttons, and canvas to DOM
                    document.body.appendChild(videoElement);
                    document.body.appendChild(captureButton);
                    document.body.appendChild(closeButton);
                    document.body.appendChild(canvasElement);
                })
                .catch(function (error) {
                    console.error('Error accessing camera:', error);
                });
        } else {
            console.error('getUserMedia() is not supported by this browser.');
        }
    });

    function navigateToDetail(namaSnack) {
        window.location.href = "../detail/detail.html?namaSnack=" + encodeURIComponent(namaSnack);
    }

    // Fungsi untuk mengonversi data URL menjadi file
    function dataURLtoFile(dataURL, filename) {
        const arr = dataURL.split(',');
        const mime = arr[0].match(/:(.*?);/)[1];
        const bstr = atob(arr[1]);
        let n = bstr.length;
        const u8arr = new Uint8Array(n);
        while (n--) {
            u8arr[n] = bstr.charCodeAt(n);
        }
        return new File([u8arr], filename, { type: mime });
    }

    removeButton.addEventListener('click', function () {
        imagePreview.innerHTML = ''; // Menghapus gambar preview
        removeButton.style.display = 'none'; // Menyembunyikan tombol "Hapus Foto"
        fileInput.value = ''; // Menghapus pilihan file
    });


    checkButton.addEventListener('click', function () {
        const fileInput = document.getElementById('file');

        if (fileInput.files.length === 0) {
            console.error('No file selected.');
            return;
        }

        document.getElementById("file-input").style.display = "none";
        document.getElementById("camera-input").style.display = "none";
        document.getElementById("check-button").style.display = "none";
        document.getElementById("reset-button").style.display = "block";
        document.getElementById("view-more").style.display = "block";

        

        const file = fileInput.files[0];
        const formData = new FormData();
        formData.append('uploaded_file', file);

        console.log(localStorage.getItem('access_token'));

        fetch('http://localhost:8080/predict2_image', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('access_token')}`
            },
            body: formData,
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Request failed.');
                }
                return response.json();
            })
            .then(data => {
                // Hasil prediksi dari API
                console.log(data.prediction);
                // Tampilkan hasil prediksi ke elemen HTML yang sesuai
                resultBox.textContent = `Prediction: ${data.prediction}`;
                document.getElementById("view-more").addEventListener("click", function () {
                    navigateToDetail(data.prediction);
                });
            })
            .catch(error => {
                console.error('Error:', error);
                resultBox.textContent = 'An error occurred.';
            });
            

    });
});
