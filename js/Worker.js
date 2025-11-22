function displayEmployees() {
    const sidebarList = document.getElementById('sidebarUl');
    const json = localStorage.getItem('employeeForm');
    const employees = json ? JSON.parse(json) : [];

    // Clear previous state
    sidebarList.innerHTML = '';
    document.querySelectorAll('.employee-card-assigned').forEach(card => card.remove());

    let unassignedCount = 0;

    employees.forEach((employee, index) => {
        if (employee.location) {
            // Employee is assigned to a location, display on floor plan
            const zoneEl = document.querySelector(`.zone-area[data-zone="${employee.location}"]`);
            if (zoneEl) {
                const container = zoneEl.querySelector('.employee-cards-container');
                if (container) {
                    const card = document.createElement('div');
                    card.className = 'employee-card-assigned bg-white p-1 rounded-lg shadow-md flex items-center text-xs w-28';
                    card.innerHTML = `
                        <img src="${employee.photoUrl || 'images/manager.png'}" alt="${employee.fullName}" class="w-6 h-6 rounded-full mr-1">
                        <div class="flex-grow overflow-hidden">
                            <p class="font-bold truncate leading-tight">${employee.fullName}</p>
                            <p class="text-gray-600 truncate leading-tight">${employee.role}</p>
                        </div>
                        <button onclick="unassignEmployee(${index})" class="ml-1 text-red-500 hover:text-red-700 font-bold text-base leading-none">&times;</button>
                    `;
                    container.appendChild(card);
                }
            }
        } else {
            // Employee is unassigned, display in sidebar
            unassignedCount++;
            const markup = `
            <li id="emp-${index}" draggable="true" class="bg-gray-50 rounded-lg border border-gray-200 p-3 employee-card hover:z-50">
                <div class="flex flex-col sm:flex-row items-start sm:items-center gap-3">
                    <img src="${employee.photoUrl || 'images/manager.png'}" alt="Employee" class="w-12 h-12 rounded-full">
                    <div class="emp-info flex-1 min-w-0">
                        <div class="font-medium truncate">${employee.fullName}</div>
                        <div class="text-sm text-gray-600 truncate">${employee.role}</div>
                    </div>
                    <div class="employee-actions flex gap-2">
                        <button class="px-3 py-1 text-xs border border-red-500 text-red-500 rounded hover:bg-red-500 hover:text-white transition duration-300" onclick="removeEmployee(${index})">Delete</button>
                        <button class="px-3 py-1 text-xs border border-green-500 text-green-500 rounded hover:bg-green-500 hover:text-white transition duration-300">Update</button>
                        <button class="rounded-full border w-7 h-7 hover:bg-gray-500 hover:text-white flex justify-center items-center text-center" title="Show employee info" onclick="showEmployeeDetails(${index})">...</button>
                    </div>
                </div>
            </li>`;
            sidebarList.insertAdjacentHTML('beforeend', markup);
        }
    });

    if (employees.length === 0) {
        sidebarList.innerHTML = '<li class="text-gray-400 text-sm">No employees yet.</li>';
    } else if (unassignedCount === 0 && employees.length > 0) {
        sidebarList.innerHTML = '<li class="text-gray-400 text-sm">All employees are assigned.</li>';
    }

    highlightEmptyRequiredZones();
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
    if (!employee) return;

    document.getElementById('detailsPhoto').src = employee.photoUrl || 'images/manager.png';
    document.getElementById('detailsFullName').innerText = employee.fullName;
    document.getElementById('detailsRole').innerText = employee.role;
    document.getElementById('detailsEmail').innerText = employee.email;
    document.getElementById('detailsPhone').innerText = employee.phone;

    const experiencesContainer = document.getElementById('detailsExperiences');
    experiencesContainer.innerHTML = '';
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
            if (exp.jobTitle || exp.company) {
                hasValidExperiences = true;
                const expDiv = document.createElement('div');
                expDiv.className = 'bg-gray-100 p-2 rounded-md';
                expDiv.innerHTML = `<p class="font-medium">${exp.jobTitle || 'N/A'} at ${exp.company || 'N/A'}</p><p class="text-sm text-gray-600">${exp.startDate || 'N/A'} - ${exp.endDate || 'N/A'}</p>`;
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

// --- Assignment Logic ---

const ACCESS_RULES = {
    'reception': ['Receptionist', 'Manager', 'Cleaning Staff'],
    'server': ['IT Technician', 'Manager', 'Cleaning Staff'],
    'security': ['Security Agent', 'Manager', 'Cleaning Staff'],
    'archives': ['Manager'],
    'conference': ['Receptionist', 'IT Technician', 'Security Agent', 'Manager', 'Cleaning Staff', 'Others'],
    'staff-room': ['Receptionist', 'IT Technician', 'Security Agent', 'Manager', 'Cleaning Staff', 'Others'],
};

const ZONE_CAPACITY = {
    'conference': 10,
    'staff-room': 10,
    'reception': 2,
    'server': 2,
    'security': 2,
    'archives': 1,
};

function openAssignModal(targetZoneId) {
    const modal = document.getElementById('assignEmployeeModal');
    const listEl = document.getElementById('assignEmployeeList');
    const zoneNameEl = document.getElementById('assignZoneName');
    listEl.innerHTML = '';

    // Format zone name for display
    const displayZoneName = targetZoneId.split('-').map(word =>
        word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ');
    zoneNameEl.textContent = displayZoneName;

    const employees = JSON.parse(localStorage.getItem('employeeForm')) || [];

    // Check current people in zone
    const currentPeopleInZone = employees.filter(e => e.location === targetZoneId).length;
    const limit = ZONE_CAPACITY[targetZoneId];

    // If zone is full
    if (currentPeopleInZone >= limit) {
        listEl.innerHTML = `
            <div class="text-center py-8">
                <p class="text-red-600 font-bold">Zone is Full!!!</p>
            </div>
        `;
        modal.classList.remove('hidden');
        return;
    }

    const allowedRoles = ACCESS_RULES[targetZoneId];

    const eligibleEmployees = employees.filter((e, index) => {
        return !e.location && allowedRoles.includes(e.role);
    }).map((emp, index) => ({ ...emp, originalIndex: employees.indexOf(emp) }));

    if (eligibleEmployees.length === 0) {
        listEl.innerHTML = '<p class="text-gray-500 text-center">No eligible employees available for this zone.</p>';
    } else {
        eligibleEmployees.forEach(emp => {
            const item = document.createElement('div');
            item.className = 'flex items-center p-2 rounded-lg hover:bg-gray-100 cursor-pointer';
            item.onclick = () => assignEmployee(emp.originalIndex, targetZoneId);
            item.innerHTML = `
                <img src="${emp.photoUrl || 'images/manager.png'}" alt="${emp.fullName}" class="w-10 h-10 rounded-full mr-3">
                <div>
                    <div class="font-medium">${emp.fullName}</div>
                    <div class="text-sm text-gray-500">${emp.role}</div>
                </div>
            `;
            listEl.appendChild(item);
        });
    }

    modal.classList.remove('hidden');
}

function closeAssignModal() {
    document.getElementById('assignEmployeeModal').classList.add('hidden');
}

function assignEmployee(employeeIndex, targetZoneId) {
    let employees = JSON.parse(localStorage.getItem('employeeForm')) || [];

    // Validate access before assignment
    const employeeRole = employees[employeeIndex].role;
    const allowedRoles = ACCESS_RULES[targetZoneId];

    if (!allowedRoles.includes(employeeRole)) {
        alert(`This employee (${employeeRole}) does not have access to this zone.`);
        return;
    }

    // Check capacity before assignment
    const currentPeopleInZone = employees.filter(e => e.location === targetZoneId).length;
    const limit = ZONE_CAPACITY[targetZoneId];
    if (currentPeopleInZone >= limit) {
        alert('This zone is already at full capacity.');
        return;
    }

    employees[employeeIndex].location = targetZoneId;
    localStorage.setItem('employeeForm', JSON.stringify(employees));
    closeAssignModal();
    displayEmployees();
}

function unassignEmployee(employeeIndex) {
    let employees = JSON.parse(localStorage.getItem('employeeForm')) || [];
    delete employees[employeeIndex].location;
    localStorage.setItem('employeeForm', JSON.stringify(employees));
    displayEmployees();
}

function highlightEmptyRequiredZones() {
    const requiredZones = ['reception', 'server', 'security', 'archives'];
    const employees = JSON.parse(localStorage.getItem('employeeForm')) || [];

    document.querySelectorAll('.zone-area').forEach(zoneEl => {
        const zoneId = zoneEl.dataset.zone;
        
        if (requiredZones.includes(zoneId)) {
            const employeesInZone = employees.filter(e => e.location === zoneId).length;
            
            if (employeesInZone === 0) {
                zoneEl.style.backgroundColor = 'rgba(255, 0, 0, 0.15)';
            } else {
                zoneEl.style.backgroundColor = '';
            }
        } else {
            zoneEl.style.backgroundColor = '';
        }
    });
}

window.addEventListener('DOMContentLoaded', () => {
    displayEmployees();
    highlightEmptyRequiredZones();
    document.querySelectorAll('.add-employee-zone-btn').forEach(btn => {
        btn.onclick = (e) => {
            const zone = e.currentTarget.closest('.zone-area').dataset.zone;
            openAssignModal(zone);
        };
    });
});