document.addEventListener('DOMContentLoaded', function() {
    const progress = document.getElementById('progress');
    const circles = document.querySelectorAll('.circle');
    const steps = document.querySelectorAll('.step');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const summary = document.getElementById('summary');

    let currentActive = 1;
    const totalSteps = circles.length;

    // Initialize
    updateProgress();
    updateButtons();

    // Update progress bar
    function updateProgress() {
        const progressPercent = ((currentActive - 1) / (totalSteps - 1)) * 100;
        progress.style.width = progressPercent + '%';
    }

    // Update step circles
    function updateCircles() {
        circles.forEach((circle, index) => {
            if (index < currentActive) {
                circle.classList.add('active');
            } else {
                circle.classList.remove('active');
            }
        });
    }

    // Update step content
    function updateSteps() {
        steps.forEach((step, index) => {
            if (index + 1 === currentActive) {
                step.classList.add('active');
            } else {
                step.classList.remove('active');
            }
        });

        // Update summary on last step
        if (currentActive === totalSteps) {
            updateSummary();
        }
    }

    // Update navigation buttons
    function updateButtons() {
        prevBtn.disabled = currentActive === 1;
        nextBtn.disabled = currentActive === totalSteps;
        
        if (currentActive === totalSteps) {
            nextBtn.textContent = 'Complete';
            nextBtn.classList.add('success');
        } else {
            nextBtn.textContent = 'Next';
            nextBtn.classList.remove('success');
        }
    }

    // Validate current step
    function validateStep() {
        const currentStep = document.getElementById(`step${currentActive}`);
        const inputs = currentStep.querySelectorAll('input[required], input:not([type="checkbox"])');
        const checkboxes = currentStep.querySelectorAll('input[type="checkbox"]');
        
        let isValid = true;

        // Check required inputs
        inputs.forEach(input => {
            if (input.value.trim() === '') {
                isValid = false;
                highlightError(input);
            } else {
                removeError(input);
            }
        });

        // Check email format
        const emailInput = currentStep.querySelector('input[type="email"]');
        if (emailInput && emailInput.value.trim() !== '') {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(emailInput.value)) {
                isValid = false;
                highlightError(emailInput, 'Please enter a valid email address');
            }
        }

        // Check age range
        const ageInput = currentStep.querySelector('input[type="number"]');
        if (ageInput && ageInput.value.trim() !== '') {
            const age = parseInt(ageInput.value);
            if (age < 1 || age > 120) {
                isValid = false;
                highlightError(ageInput, 'Age must be between 1 and 120');
            }
        }

        // Check terms agreement on last step
        if (currentActive === totalSteps) {
            const termsCheckbox = document.getElementById('terms');
            if (!termsCheckbox.checked) {
                isValid = false;
                highlightError(termsCheckbox, 'You must agree to the terms and conditions');
            }
        }

        return isValid;
    }

    // Highlight input error
    function highlightError(input, message = 'This field is required') {
        input.style.border = '2px solid #f44336';
        input.style.boxShadow = '0 0 10px rgba(244, 67, 54, 0.3)';
        
        // Remove existing error message
        const existingError = input.parentNode.querySelector('.error-message');
        if (existingError) {
            existingError.remove();
        }
        
        // Add error message
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        errorDiv.style.color = '#f44336';
        errorDiv.style.fontSize = '0.8rem';
        errorDiv.style.marginTop = '0.25rem';
        errorDiv.textContent = message;
        input.parentNode.appendChild(errorDiv);
    }

    // Remove input error
    function removeError(input) {
        input.style.border = 'none';
        input.style.boxShadow = 'none';
        
        const errorMessage = input.parentNode.querySelector('.error-message');
        if (errorMessage) {
            errorMessage.remove();
        }
    }

    // Update summary
    function updateSummary() {
        const formData = {
            'Username': document.getElementById('username').value || 'Not provided',
            'Email': document.getElementById('email').value || 'Not provided',
            'First Name': document.getElementById('firstName').value || 'Not provided',
            'Last Name': document.getElementById('lastName').value || 'Not provided',
            'Age': document.getElementById('age').value || 'Not provided',
            'Theme': document.getElementById('theme').value || 'Not selected',
            'Language': document.getElementById('language').value || 'Not selected',
            'Notifications': document.getElementById('notifications').checked ? 'Enabled' : 'Disabled'
        };

        let summaryHTML = '<h3>Summary</h3>';
        Object.entries(formData).forEach(([label, value]) => {
            summaryHTML += `
                <div class="summary-item">
                    <span class="summary-label">${label}:</span>
                    <span class="summary-value">${value}</span>
                </div>
            `;
        });

        summary.innerHTML = summaryHTML;
    }

    // Next step
    function nextStep() {
        if (validateStep()) {
            if (currentActive < totalSteps) {
                currentActive++;
                updateProgress();
                updateCircles();
                updateSteps();
                updateButtons();
            } else {
                // Complete the process
                completeProcess();
            }
        }
    }

    // Previous step
    function prevStep() {
        if (currentActive > 1) {
            currentActive--;
            updateProgress();
            updateCircles();
            updateSteps();
            updateButtons();
        }
    }

    // Complete process
    function completeProcess() {
        const stepContent = document.querySelector('.step-content');
        stepContent.innerHTML = `
            <div class="step active" style="text-align: center;">
                <h2 style="color: #4CAF50; font-size: 2rem; margin-bottom: 1rem;">🎉 Setup Complete!</h2>
                <p style="font-size: 1.2rem; margin-bottom: 2rem;">Your account has been successfully created and configured.</p>
                <div style="background: rgba(76, 175, 80, 0.1); border-radius: 8px; padding: 1.5rem; margin-bottom: 2rem;">
                    <p style="margin-bottom: 1rem;">You can now:</p>
                    <ul style="text-align: left; display: inline-block;">
                        <li>Access your personalized dashboard</li>
                        <li>Customize your preferences</li>
                        <li>Start using all features</li>
                    </ul>
                </div>
                <button class="btn success" onclick="location.reload()">Start Over</button>
            </div>
        `;
        
        // Hide navigation buttons
        document.querySelector('.btn-group').style.display = 'none';
    }

    // Event listeners
    prevBtn.addEventListener('click', prevStep);
    nextBtn.addEventListener('click', nextStep);

    // Keyboard navigation
    document.addEventListener('keydown', function(e) {
        switch(e.key) {
            case 'ArrowLeft':
                e.preventDefault();
                if (currentActive > 1) {
                    prevStep();
                }
                break;
            case 'ArrowRight':
            case 'Enter':
                e.preventDefault();
                if (currentActive < totalSteps || validateStep()) {
                    nextStep();
                }
                break;
        }
    });

    // Real-time validation
    document.addEventListener('input', function(e) {
        if (e.target.matches('input')) {
            removeError(e.target);
        }
    });

    // Auto-save form data
    function saveFormData() {
        const formData = {};
        document.querySelectorAll('input, select').forEach(input => {
            if (input.type === 'checkbox') {
                formData[input.id] = input.checked;
            } else {
                formData[input.id] = input.value;
            }
        });
        localStorage.setItem('progressStepsData', JSON.stringify(formData));
    }

    // Load form data
    function loadFormData() {
        const savedData = localStorage.getItem('progressStepsData');
        if (savedData) {
            const formData = JSON.parse(savedData);
            Object.entries(formData).forEach(([id, value]) => {
                const element = document.getElementById(id);
                if (element) {
                    if (element.type === 'checkbox') {
                        element.checked = value;
                    } else {
                        element.value = value;
                    }
                }
            });
        }
    }

    // Auto-save on input
    document.addEventListener('input', saveFormData);
    document.addEventListener('change', saveFormData);

    // Load saved data on page load
    loadFormData();
}); 