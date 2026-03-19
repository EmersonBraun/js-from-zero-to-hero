document.addEventListener('DOMContentLoaded', function() {
    const textInput = document.getElementById('textInput');
    const generateBtn = document.getElementById('generateBtn');
    const clearBtn = document.getElementById('clearBtn');
    const qrCode = document.getElementById('qrCode');

    // Generate QR Code
    generateBtn.addEventListener('click', function() {
        const text = textInput.value.trim();
        
        if (!text) {
            alert('Please enter some text or URL to generate QR code');
            return;
        }

        // Clear previous QR code
        qrCode.innerHTML = '';

        // Generate new QR code
        QRCode.toCanvas(qrCode, text, {
            width: 200,
            margin: 2,
            color: {
                dark: '#000000',
                light: '#FFFFFF'
            }
        }, function(error) {
            if (error) {
                console.error('Error generating QR code:', error);
                alert('Error generating QR code. Please try again.');
            }
        });
    });

    // Clear functionality
    clearBtn.addEventListener('click', function() {
        textInput.value = '';
        qrCode.innerHTML = '';
    });

    // Generate QR code on Enter key
    textInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            generateBtn.click();
        }
    });
}); 