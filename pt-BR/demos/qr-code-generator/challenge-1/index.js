document.addEventListener('DOMContentLoaded', function() {
    const textInput = document.getElementById('textInput');
    const qrSize = document.getElementById('qrSize');
    const generateBtn = document.getElementById('generateBtn');
    const downloadBtn = document.getElementById('downloadBtn');
    const clearBtn = document.getElementById('clearBtn');
    const qrCode = document.getElementById('qrCode');

    let currentQRData = null;

    // Generate QR Code
    generateBtn.addEventListener('click', function() {
        const text = textInput.value.trim();
        const size = parseInt(qrSize.value);
        
        if (!text) {
            alert('Please enter some text or URL to generate QR code');
            return;
        }

        // Clear previous QR code
        qrCode.innerHTML = '';

        // Generate new QR code
        QRCode.toCanvas(qrCode, text, {
            width: size,
            margin: 2,
            color: {
                dark: '#000000',
                light: '#FFFFFF'
            }
        }, function(error) {
            if (error) {
                console.error('Error generating QR code:', error);
                alert('Error generating QR code. Please try again.');
            } else {
                currentQRData = text;
                downloadBtn.disabled = false;
            }
        });
    });

    // Download QR Code
    downloadBtn.addEventListener('click', function() {
        if (!currentQRData) {
            alert('Please generate a QR code first');
            return;
        }

        const canvas = qrCode.querySelector('canvas');
        if (canvas) {
            const link = document.createElement('a');
            link.download = 'qr-code.png';
            link.href = canvas.toDataURL();
            link.click();
        }
    });

    // Clear functionality
    clearBtn.addEventListener('click', function() {
        textInput.value = '';
        qrCode.innerHTML = '';
        currentQRData = null;
        downloadBtn.disabled = true;
    });

    // Generate QR code on Enter key
    textInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            generateBtn.click();
        }
    });

    // Disable download button initially
    downloadBtn.disabled = true;
}); 