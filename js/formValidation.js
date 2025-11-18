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

        function addExperience() {
            const container = document.getElementById('experiencesContainer');
            const div = document.createElement('div');
            div.className = 'p-3 bg-gray-50 rounded-lg border space-y-2';
            div.innerHTML = `
                <input type="text" placeholder="Job Title" class="w-full px-3 py-2 border rounded text-xs">
                <input type="text" placeholder="Company" class="w-full px-3 py-2 border rounded text-xs">
                <div class="grid grid-cols-2 gap-2">
                    <input type="date" class="px-3 py-2 border rounded text-xs">
                    <input type="date" class="px-3 py-2 border rounded text-xs">
                </div>
                <button type="button" onclick="this.parentElement.remove()" class="text-xs text-red-600">Remove</button>
            `;
            container.appendChild(div);
        }