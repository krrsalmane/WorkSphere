function displayEmployees() {
    const sidebarList = document.getElementById('sidebarUl');
    const json = localStorage.getItem('employeeForm');
    if (!json) {
        sidebarList.innerHTML = '<li class="text-gray-400 text-sm">No employees yet.</li>';
        return;
    }

    const employees = JSON.parse(json);
    sidebarList.innerHTML = '';

    employees.forEach((employee, index) => {
        const markup = `
        <li id="emp-${index}" draggable="true" class="bg-gray-50 rounded-lg border border-gray-200 p-3 employee-card hover:z-50">
            <div class="flex flex-col sm:flex-row items-start sm:items-center gap-3">
                <img src="${employee.photoUrl || 'images/manager.png'}" alt="Employee" class="w-12 h-12 rounded-full">
                <div class="emp-info flex-1 min-w-0">
                    <div class="font-medium truncate">${employee.fullName}</div>
                    <div class="text-sm text-gray-600 truncate">${employee.role}</div>
                </div>
                <div class="employee-actions flex gap-2">
                    <button
                        class="px-3 py-1 text-xs border border-red-500 text-red-500 rounded hover:bg-red-500 hover:text-white transition duration-300"
                        onclick="removeEmployee(${index})">
                        Delete
                    </button>
                    <button
                        class="px-3 py-1 text-xs border border-green-500 text-green-500 rounded hover:bg-green-500 hover:text-white transition duration-300">
                        Update
                    </button>
                    <button class="rounded-full border w-7 h-7 hover:bg-gray-500 hover:text-white flex justify-center items-center text-center"
                        title="Show employee info" onclick="showEmployeeDetails(${index})">
                        ...
                    </button>
                </div>
            </div>
        </li>
        `;
        sidebarList.insertAdjacentHTML('beforeend', markup);
    });
}

function removeEmployee(index) {
    const employees = JSON.parse(localStorage.getItem('employeeForm')) || [];
    employees.splice(index, 1);
    localStorage.setItem('employeeForm', JSON.stringify(employees));
    displayEmployees();
}

function showEmployeeDetails(index) {
    const employees = JSON.parse(localStorage.getItem('employeeForm')) || [];
    const employee = employees[index];

    if (!employee) {
        console.error('Employee not found at index:', index);
        return;
    }

    // Populate the modal with employee data
    document.getElementById('detailsPhoto').src = employee.photoUrl || 'images/manager.png';
    document.getElementById('detailsFullName').innerText = employee.fullName;
    document.getElementById('detailsRole').innerText = employee.role;
    document.getElementById('detailsEmail').innerText = employee.email;
    document.getElementById('detailsPhone').innerText = employee.phone;

    const experiencesContainer = document.getElementById('detailsExperiences');
    experiencesContainer.innerHTML = ''; // Clear previous experiences

    // Extract experiences from the flat formData object
    const experienceEntries = [];
    let i = 0;
    while (employee[`experiencesContainer[${i}][jobTitle]`] !== undefined) {
        experienceEntries.push({
            jobTitle: employee[`experiencesContainer[${i}][jobTitle]`],
            company: employee[`experiencesContainer[${i}][company]`],
            startDate: employee[`experiencesContainer[${i}][startDate]`],
            endDate: employee[`experiencesContainer[${i}][endDate]`],
        });
        i++;
    }

    if (experienceEntries.length > 0) {
        let hasValidExperiences = false;
        experienceEntries.forEach(exp => {
            // Only display if at least jobTitle or company is not empty
            if (exp.jobTitle || exp.company) {
                hasValidExperiences = true;
                const expDiv = document.createElement('div');
                expDiv.className = 'bg-gray-100 p-2 rounded-md';
                expDiv.innerHTML = `
                    <p class="font-medium">${exp.jobTitle || 'N/A'} at ${exp.company || 'N/A'}</p>
                    <p class="text-sm text-gray-600">${exp.startDate || 'N/A'} - ${exp.endDate || 'N/A'}</p>
                `;
                experiencesContainer.appendChild(expDiv);
            }
        });
        if (!hasValidExperiences) {
            experiencesContainer.innerHTML = '<p class="text-gray-500">No experience listed.</p>';
        }
    } else {
        experiencesContainer.innerHTML = '<p class="text-gray-500">No experience listed.</p>';
    }


    document.getElementById('employeeDetailsModal').classList.remove('hidden');
}

function closeDetailsModal() {
    document.getElementById('employeeDetailsModal').classList.add('hidden');
}


window.addEventListener('DOMContentLoaded', displayEmployees);
