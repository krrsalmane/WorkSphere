document.getElementById('open-modal-btn').onclick = () =>
    document.getElementById('employeeModal').classList.remove('hidden');

document.querySelectorAll('.add-employee-zone-btn').forEach(btn => {
    btn.onclick = () => document.getElementById('employeeModal').classList.remove('hidden');
});

function closeModal() {
    document.getElementById('employeeModal').classList.add('hidden');
    document.getElementById('employeeForm').reset();
    document.getElementById('experiencesContainer').innerHTML = '';
}


const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/; 
const phoneRegex = /^(0[567])\d{8}$/; 


const employeeForm = document.getElementById('employeeForm');
const fullName = document.getElementById('fullName');
const role = document.getElementById('role');
const email = document.getElementById('email');
const phone = document.getElementById('phone');


const fullNameError = document.getElementById('fullNameError');
const roleError = document.getElementById('roleError');
const emailError = document.getElementById('emailError');
const phoneError = document.getElementById('phoneError');
const experienceError = document.getElementById('experienceError');
const generalMessage = document.getElementById('generalMessage');


// --- Function to Add Experience Dynamically ---
function addExperience() {
    const container = document.getElementById('experiencesContainer');
    const div = document.createElement('div');
    div.className = 'p-3 bg-gray-50 rounded-lg border space-y-2 experience-entry'; 
    div.innerHTML = `
        <input type="text" placeholder="Job Title" class="w-full px-3 py-2 border rounded text-xs">
        <input type="text" placeholder="Company" class="w-full px-3 py-2 border rounded text-xs">
        <div class="grid grid-cols-2 gap-2">
            <input type="date" class="px-3 py-2 border rounded text-xs start-date-input"> 
            <input type="date" class="px-3 py-2 border rounded text-xs end-date-input">   
        </div>
        <button type="button" onclick="this.parentElement.remove()" class="text-xs text-red-600">Remove</button>
    `;
    container.appendChild(div);
}


function validateExperienceDates() {
    let allDatesValid = true;
    const entries = document.querySelectorAll('#experiencesContainer .experience-entry');

    entries.forEach(entry => {
        const startDateInput = entry.querySelector('.start-date-input');
        const endDateInput = entry.querySelector('.end-date-input');
        
        
        endDateInput.classList.remove('border-red-500', 'ring-1', 'ring-red-500'); 
        
        const startValue = startDateInput.value;
        const endValue = endDateInput.value;

        // Only validate if both dates are filled
        if (startValue && endValue) {
            const startDate = new Date(startValue);
            const endDate = new Date(endValue);

            // Comparison: End date must be greater than or equal to start date
            if (endDate.getTime() < startDate.getTime()) {
                allDatesValid = false;
                // Add error styling for immediate visual feedback
                endDateInput.classList.add('border-red-500', 'ring-1', 'ring-red-500');
            }
        }
    });

    return allDatesValid;
}

employeeForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // 1. Reset all errors and status messages
    fullNameError.innerText = '';
    roleError.innerText = '';
    emailError.innerText = '';
    phoneError.innerText = '';
    experienceError.innerText = '';
    generalMessage.innerText = '';
    
    let isValid = true; 

    // --- A. Required Field Checks ---

    if (!fullName.value) {
        fullNameError.innerText = 'Full Name is required.';
        isValid = false;
    }

    if (!role.value) {
        roleError.innerText = 'Please select a role.';
        isValid = false;
    }

    if (!email.value) {
        emailError.innerText = 'Email is required.';
        isValid = false;
    }

    if (!phone.value) {
        phoneError.innerText = 'Phone is required.';
        isValid = false;
    }
    
   

    if (email.value && !emailRegex.test(email.value)) {
        emailError.innerText = 'Email format is invalid.';
        isValid = false;
    }
 
    if (phone.value) {
        const cleanPhone = phone.value.replace(/[\s()-]/g, '');
        if (!phoneRegex.test(cleanPhone)) {
            phoneError.innerText = 'Phone must be 10 digits starting with 05, 06, or 07.';
            isValid = false;
        }
    }


    if (!validateExperienceDates()) {
        experienceError.innerText = 'One or more End Dates are before the Start Date.';
        isValid = false;
    }


    if (isValid) {
        
        generalMessage.innerText = 'Form submitted successfully!'; 
        generalMessage.classList.add('text-green-600');
        generalMessage.classList.remove('text-red-600');
        
        console.log('Form data is valid and ready to send to server.');
        
        
    } else {
        
        generalMessage.innerText = 'Please correct the highlighted errors above.';
        generalMessage.classList.add('text-red-600');
        generalMessage.classList.remove('text-green-600');
    }
});