document.addEventListener('DOMContentLoaded', function() {
    const taskInput = document.getElementById('taskInput');
    const addBtn = document.getElementById('addBtn');
    const taskList = document.getElementById('taskList');
    const totalTasks = document.getElementById('totalTasks');
    const completedTasks = document.getElementById('completedTasks');
    const clearCompletedBtn = document.getElementById('clearCompletedBtn');
    const clearAllBtn = document.getElementById('clearAllBtn');

    // Filter buttons
    const allBtn = document.getElementById('allBtn');
    const activeBtn = document.getElementById('activeBtn');
    const completedBtn = document.getElementById('completedBtn');

    // Task data
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    let currentFilter = 'all';

    // Initialize
    renderTasks();
    updateStats();

    // Add task
    function addTask() {
        const text = taskInput.value.trim();
        if (text === '') return;

        const task = {
            id: Date.now(),
            text: text,
            completed: false,
            createdAt: new Date().toISOString()
        };

        tasks.push(task);
        saveTasks();
        renderTasks();
        updateStats();
        taskInput.value = '';
        taskInput.focus();
    }

    // Delete task
    function deleteTask(id) {
        const taskElement = document.querySelector(`[data-id="${id}"]`);
        taskElement.classList.add('removing');
        
        setTimeout(() => {
            tasks = tasks.filter(task => task.id !== id);
            saveTasks();
            renderTasks();
            updateStats();
        }, 300);
    }

    // Toggle task completion
    function toggleTask(id) {
        const task = tasks.find(task => task.id === id);
        if (task) {
            task.completed = !task.completed;
            saveTasks();
            renderTasks();
            updateStats();
        }
    }

    // Edit task
    function editTask(id) {
        const taskElement = document.querySelector(`[data-id="${id}"]`);
        const taskText = taskElement.querySelector('.task-text');
        const currentText = taskText.textContent;

        // Create edit input
        const editInput = document.createElement('input');
        editInput.type = 'text';
        editInput.className = 'task-input-edit';
        editInput.value = currentText;

        // Replace text with input
        taskText.style.display = 'none';
        taskElement.insertBefore(editInput, taskText);
        editInput.focus();
        editInput.select();

        // Handle save
        function saveEdit() {
            const newText = editInput.value.trim();
            if (newText === '') {
                deleteTask(id);
                return;
            }

            const task = tasks.find(task => task.id === id);
            if (task) {
                task.text = newText;
                saveTasks();
                renderTasks();
            }
        }

        // Event listeners for edit
        editInput.addEventListener('blur', saveEdit);
        editInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                saveEdit();
            }
        });
    }

    // Filter tasks
    function filterTasks(filter) {
        currentFilter = filter;
        
        // Update active filter button
        document.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('active'));
        event.target.classList.add('active');
        
        renderTasks();
    }

    // Render tasks
    function renderTasks() {
        taskList.innerHTML = '';

        let filteredTasks = tasks;
        if (currentFilter === 'active') {
            filteredTasks = tasks.filter(task => !task.completed);
        } else if (currentFilter === 'completed') {
            filteredTasks = tasks.filter(task => task.completed);
        }

        if (filteredTasks.length === 0) {
            const emptyState = document.createElement('div');
            emptyState.className = 'empty-state';
            emptyState.textContent = currentFilter === 'all' ? 'No tasks yet. Add one above!' :
                                   currentFilter === 'active' ? 'No active tasks.' : 'No completed tasks.';
            taskList.appendChild(emptyState);
            return;
        }

        filteredTasks.forEach(task => {
            const taskElement = document.createElement('div');
            taskElement.className = `task-item ${task.completed ? 'completed' : ''}`;
            taskElement.setAttribute('data-id', task.id);

            taskElement.innerHTML = `
                <div class="task-checkbox ${task.completed ? 'checked' : ''}" onclick="toggleTask(${task.id})"></div>
                <div class="task-text">${escapeHtml(task.text)}</div>
                <div class="task-actions">
                    <button class="edit-btn" onclick="editTask(${task.id})" title="Edit">✏️</button>
                    <button class="delete-btn" onclick="deleteTask(${task.id})" title="Delete">🗑️</button>
                </div>
            `;

            taskList.appendChild(taskElement);
        });
    }

    // Update statistics
    function updateStats() {
        const total = tasks.length;
        const completed = tasks.filter(task => task.completed).length;
        
        totalTasks.textContent = `${total} task${total !== 1 ? 's' : ''}`;
        completedTasks.textContent = `${completed} completed`;
    }

    // Save tasks to localStorage
    function saveTasks() {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    // Clear completed tasks
    function clearCompleted() {
        tasks = tasks.filter(task => !task.completed);
        saveTasks();
        renderTasks();
        updateStats();
    }

    // Clear all tasks
    function clearAll() {
        if (confirm('Are you sure you want to delete all tasks?')) {
            tasks = [];
            saveTasks();
            renderTasks();
            updateStats();
        }
    }

    // Escape HTML to prevent XSS
    function escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    // Event listeners
    addBtn.addEventListener('click', addTask);
    taskInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            addTask();
        }
    });

    allBtn.addEventListener('click', () => filterTasks('all'));
    activeBtn.addEventListener('click', () => filterTasks('active'));
    completedBtn.addEventListener('click', () => filterTasks('completed'));

    clearCompletedBtn.addEventListener('click', clearCompleted);
    clearAllBtn.addEventListener('click', clearAll);

    // Make functions globally available for onclick handlers
    window.toggleTask = toggleTask;
    window.editTask = editTask;
    window.deleteTask = deleteTask;
}); 