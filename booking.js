
let selectedDoctor = null;
let selectedTime = null;

// Set minimum date to today
const today = new Date().toISOString().split('T')[0];
document.addEventListener('DOMContentLoaded', function() {
    const dateInput = document.getElementById('appointmentDate');
    if (dateInput) {
        dateInput.setAttribute('min', today);
    }
});

// Doctor selection
document.querySelectorAll('.doctor-card').forEach(card => {
    card.addEventListener('click', function() {
        // Remove previous selection
        document.querySelectorAll('.doctor-card').forEach(c => c.classList.remove('selected'));
        
        // Select current doctor
        this.classList.add('selected');
        selectedDoctor = this.dataset.doctor;
        
        checkFormCompletion();
    });
});

// Time slot selection
document.querySelectorAll('.time-slot').forEach(slot => {
    slot.addEventListener('click', function() {
        // Remove previous selection
        document.querySelectorAll('.time-slot').forEach(s => s.classList.remove('selected'));
        
        // Select current time
        this.classList.add('selected');
        selectedTime = this.dataset.time;
        
        checkFormCompletion();
    });
});

// Check if form is complete
function checkFormCompletion() {
    const firstName = document.getElementById('firstName').value;
    const lastName = document.getElementById('lastName').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const date = document.getElementById('appointmentDate').value;
    
    const isComplete = firstName && lastName && email && phone && date && selectedDoctor && selectedTime;
    
    const bookButton = document.getElementById('bookButton');
    if (bookButton) {
        bookButton.disabled = !isComplete;
    }
}

// Add event listeners to form inputs
document.querySelectorAll('input[required]').forEach(input => {
    input.addEventListener('input', checkFormCompletion);
});

// Form submission handler - Simple version without Amplify
document.getElementById('bookingForm').addEventListener('submit', async function(e) {
    e.preventDefault();
    
    console.log('Form submitted - processing...');
    
    // Create appointment data
    const formData = {
        firstName: document.getElementById('firstName').value,
        lastName: document.getElementById('lastName').value,
        email: document.getElementById('email').value,
        phone: document.getElementById('phone').value,
        appointmentDate: document.getElementById('appointmentDate').value,
        appointmentTime: selectedTime,
        doctor: selectedDoctor,
        reason: document.getElementById('reason').value || 'General consultation',
        status: 'pending'
    };
    
    console.log('Form data prepared:', formData);

    try {
        // For now, just simulate success since backend isn't connected yet
        // Later, replace this with actual API call:
        // const response = await fetch('YOUR_API_ENDPOINT', {
        //     method: 'POST',
        //     headers: {'Content-Type': 'application/json'},
        //     body: JSON.stringify(formData)
        // });
        
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 500));
        
        console.log('Appointment data:', formData);
        
        // Show success modal
        const modal = document.getElementById('successModal');
        if (modal) {
            modal.style.display = 'block';
        } else {
            // Fallback if no modal exists
            alert('Appointment booked successfully!');
        }
        
        // Reset form
        this.reset();
        document.querySelectorAll('.doctor-card, .time-slot').forEach(el => el.classList.remove('selected'));
        selectedDoctor = null;
        selectedTime = null;
        checkFormCompletion();
        
    } catch (error) {
        console.error('Error submitting appointment:', error);
        alert('Error submitting appointment. Please try again.');
    }
});

// Close modal
function closeModal() {
    const modal = document.getElementById('successModal');
    if (modal) {
        modal.style.display = 'none';
    }
}

// Make closeModal available globally
window.closeModal = closeModal;

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Close modal when clicking outside
const successModal = document.getElementById('successModal');
if (successModal) {
    successModal.addEventListener('click', function(e) {
        if (e.target === this) {
            closeModal();
        }
    });
}
