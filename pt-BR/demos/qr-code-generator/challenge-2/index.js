document.addEventListener('DOMContentLoaded', function() {
    const textInput = document.getElementById('textInput');
    const qrSize = document.getElementById('qrSize');
    const errorLevel = document.getElementById('errorLevel');
    const foregroundColor = document.getElementById('foregroundColor');
    const backgroundColor = document.getElementById('backgroundColor');
    const generateBtn = document.getElementById('generateBtn');
    const downloadBtn = document.getElementById('downloadBtn');
    const copyBtn = document.getElementById('copyBtn');
    const clearBtn = document.getElementById('clearBtn');
    const qrCode = document.getElementById('qrCode');
    const statusMessage = document.getElementById('statusMessage');

    let currentQRData = null;

    // Show status message
    function showStatus(message, type = 'success') {
        statusMessage.textContent = message;
        statusMessage.className = `status-message ${type}`;
        setTimeout(() => {
            statusMessage.textContent = '';
            statusMessage.className = 'status-message';
        }, 3000);
    }

    // Generate QR Code
    generateBtn.addEventListener('click', function() {
        const text = textInput.value.trim();
        const size = parseInt(qrSize.value);
        const errorCorrection = errorLevel.value;
        const fgColor = foregroundColor.value;
        const bgColor = backgroundColor.value;
        
        if (!text) {
            showStatus('Please enter some text or URL to generate QR code', 'error');
            return;
        }

        // Clear previous QR code
        qrCode.innerHTML = '';

        // Generate new QR code
        QRCode.toCanvas(qrCode, text, {
            width: size,
            margin: 2,
            color: {
                dark: fgColor,
                light: bgColor
            },
            errorCorrectionLevel: errorCorrection
        }, function(error) {
            if (error) {
                console.error('Error generating QR code:', error);
                showStatus('Error generating QR code. Please try again.', 'error');
            } else {
                currentQRData = text;
                downloadBtn.disabled = false;
                copyBtn.disabled = false;
                showStatus('QR Code generated successfully!');
            }
        });
    });

    // Download QR Code
    downloadBtn.addEventListener('click', function() {
        if (!currentQRData) {
            showStatus('Please generate a QR code first', 'error');
            return;
        }

        const canvas = qrCode.querySelector('canvas');
        if (canvas) {
            const link = document.createElement('a');
            link.download = 'qr-code.png';
            link.href = canvas.toDataURL();
            link.click();
            showStatus('QR Code downloaded successfully!');
        }
    });

    // Copy QR Code to Clipboard
    copyBtn.addEventListener('click', async function() {
        if (!currentQRData) {
            showStatus('Please generate a QR code first', 'error');
            return;
        }

        const canvas = qrCode.querySelector('canvas');
        if (canvas) {
            try {
                canvas.toBlob(async function(blob) {
                    try {
                        await navigator.clipboard.write([
                            new ClipboardItem({
                                'image/png': blob
                            })
                        ]);
                        showStatus('QR Code copied to clipboard!');
                    } catch (err) {
                        showStatus('Failed to copy to clipboard', 'error');
                    }
                });
            } catch (err) {
                showStatus('Failed to copy to clipboard', 'error');
            }
        }
    });

    // Clear functionality
    clearBtn.addEventListener('click', function() {
        textInput.value = '';
        qrCode.innerHTML = '';
        currentQRData = null;
        downloadBtn.disabled = true;
        copyBtn.disabled = true;
        showStatus('Cleared successfully!');
    });

    // Generate QR code on Enter key
    textInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            generateBtn.click();
        }
    });

    // Auto-generate on color change
    foregroundColor.addEventListener('change', function() {
        if (currentQRData) {
            generateBtn.click();
        }
    });

    backgroundColor.addEventListener('change', function() {
        if (currentQRData) {
            generateBtn.click();
        }
    });

    // Disable buttons initially
    downloadBtn.disabled = true;
    copyBtn.disabled = true;
}); 