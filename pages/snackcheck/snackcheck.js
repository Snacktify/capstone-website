document.addEventListener('DOMContentLoaded', function () {
    const fileInput = document.getElementById('file');
    const cameraButton = document.getElementById('camera-button');
    const imagePreview = document.getElementById('image-preview');
    const checkButton = document.getElementById('check-button');
    const resultBox = document.getElementById('result-box');
    const useCameraCheckbox = document.getElementById('use-camera');

    document.getElementById("camera-input").style.display = "none";
    
    // Input File
    fileInput.addEventListener('change', function () {
        const file = fileInput.files[0];
        const reader = new FileReader();

        reader.onload = function (e) {
            imagePreview.innerHTML = `<img src="${e.target.result}" alt="Preview">`;
            document.getElementById("check-button").style.display = "block";
            document.getElementById("file-input").style.display = "none";
        };
        reader.readAsDataURL(file);
    });

    // Checkbox "Use Camera"
    useCameraCheckbox.addEventListener('change', function () {
        if (useCameraCheckbox.checked) {
          cameraButton.disabled = false;
          document.getElementById("file-input").style.display = "none";
          document.getElementById("camera-input").style.display = "block";
        } else {
          cameraButton.disabled = true;
          document.getElementById("file-input").style.display = "block";
          document.getElementById("camera-input").style.display = "none";
        }
      });      

    // function to take photos using the camera
    function takePhoto() {
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

                    // click on the capture button
                    captureButton.classList.add('capture-button');
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

                        document.getElementById("file-input").style.display = "none";
                        document.getElementById("camera-input").style.display = "none";
                        document.getElementById("reset-button").style.display = "block";
                        document.getElementById("view-more").style.display = "block";

                        videoElement.remove();
                        captureButton.remove();
                        closeButton.remove();
                        canvasElement.remove();
                        
                        // Sending images to endpoints
                        const fileData = dataURLtoFile(imageURL, 'captured_image.jpg');
                        let formData = new FormData();
                        formData.append('uploaded_file', fileData);

                        fetchImagePrediction(formData);
                    });

                    // click on the close button
                    const closeButton = document.createElement('button');
                    closeButton.classList.add('close-button');
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
    }

    // click on the camera button
    cameraButton.addEventListener('click', function () {
        takePhoto();
    });

    // click on the check button
    checkButton.addEventListener('click', function () {
        const fileInput = document.getElementById('file');
        const useCamera = document.getElementById('use-camera').checked;

        if (fileInput.files.length === 0 && !useCamera) {
            console.error('No file selected.');
            return;
        }

        document.getElementById("file-input").style.display = "none";
        document.getElementById("camera-input").style.display = "none";
        document.getElementById("check-button").style.display = "none";
        document.getElementById("reset-button").style.display = "block";
        document.getElementById("view-more").style.display = "block";

        let formData = new FormData();

        if (useCamera) {
            takePhoto();
        } else {
            // Sending images to endpoints
            const file = fileInput.files[0];
            formData.append('uploaded_file', file);

            fetchImagePrediction(formData);
        }
    });

    // integration with API
    function fetchImagePrediction(formData) {
        fetch('http://34.128.89.110:8080/predict_image', {
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
                // outputs the prediction result to the appropriate HTML element
                resultBox.textContent = data.prediction;
                // click on the view more button
                document.getElementById("view-more").addEventListener("click", function () {
                    navigateToDetail(data.prediction);
                });
            })
            .catch(error => {
                console.error('Error:', error);
                resultBox.textContent = 'An error occurred.';
            });
    }

    // function to navigate to detail page
    function navigateToDetail(namaSnack) {
        window.location.href = "../detail/detail.html?namaSnack=" + encodeURIComponent(namaSnack);
    }

    // Function to convert URL data to file
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

    // click on the reset button
    document.getElementById('reset-button').addEventListener('click', function () {
        window.location.href = 'snackcheck.html';
    });

    // click on the back button
    document.getElementById('back-button').addEventListener('click', function () {
        window.location.href = '../homepage/homepage.html';
    });
});
