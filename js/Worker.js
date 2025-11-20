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
                <img src="${employee.photoUrl || 'assets/guy.png'}" alt="Employee" class="w-12 h-12 rounded-full">
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

window.addEventListener('DOMContentLoaded', displayEmployees);
