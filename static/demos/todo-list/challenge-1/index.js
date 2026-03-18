// DOM Elements
const todoInput = document.getElementById('todoInput');
const addBtn = document.getElementById('addBtn');
const todoList = document.getElementById('todoList');
const totalTasks = document.getElementById('totalTasks');
const completedTasks = document.getElementById('completedTasks');
const pendingTasks = document.getElementById('pendingTasks');
const filterAll = document.getElementById('filterAll');
const filterActive = document.getElementById('filterActive');
const filterCompleted = document.getElementById('filterCompleted');
const clearCompleted = document.getElementById('clearCompleted');

// Todo array
let todos = JSON.parse(localStorage.getItem('todos')) || [];
let currentFilter = 'all';

// Event Listeners
addBtn.addEventListener('click', addTodo);
todoInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        addTodo();
    }
});

filterAll.addEventListener('click', () => setFilter('all'));
filterActive.addEventListener('click', () => setFilter('active'));
filterCompleted.addEventListener('click', () => setFilter('completed'));
clearCompleted.addEventListener('click', clearCompletedTodos);

// Add new todo
function addTodo() {
    const todoText = todoInput.value.trim();
    
    if (todoText === '') {
        showMessage('Please enter a todo item', 'error');
        return;
    }
    
    const todo = {
        id: Date.now(),
        text: todoText,
        completed: false,
        createdAt: new Date().toISOString()
    };
    
    todos.push(todo);
    saveTodos();
    renderTodos();
    todoInput.value = '';
    
    showMessage('Todo added successfully!', 'success');
}

// Render todos based on current filter
function renderTodos() {
    const filteredTodos = getFilteredTodos();
    
    if (filteredTodos.length === 0) {
        todoList.innerHTML = '<div class="empty-state">No todos found</div>';
    } else {
        todoList.innerHTML = filteredTodos.map(todo => `
            <li class="todo-item ${todo.completed ? 'completed' : ''}" data-id="${todo.id}">
                <input type="checkbox" class="todo-checkbox" ${todo.completed ? 'checked' : ''}>
                <span class="todo-text">${escapeHtml(todo.text)}</span>
                <div class="todo-actions">
                    <button class="edit-btn" onclick="editTodo(${todo.id})">Edit</button>
                    <button class="delete-btn" onclick="deleteTodo(${todo.id})">Delete</button>
                </div>
            </li>
        `).join('');
    }
    
    // Add event listeners to checkboxes
    document.querySelectorAll('.todo-checkbox').forEach(checkbox => {
        checkbox.addEventListener('change', toggleTodo);
    });
    
    updateStats();
}

// Get filtered todos
function getFilteredTodos() {
    switch (currentFilter) {
        case 'active':
            return todos.filter(todo => !todo.completed);
        case 'completed':
            return todos.filter(todo => todo.completed);
        default:
            return todos;
    }
}

// Set filter
function setFilter(filter) {
    currentFilter = filter;
    
    // Update active filter button
    [filterAll, filterActive, filterCompleted].forEach(btn => {
        btn.classList.remove('active');
    });
    
    document.getElementById(`filter${filter.charAt(0).toUpperCase() + filter.slice(1)}`).classList.add('active');
    
    renderTodos();
}

// Toggle todo completion
function toggleTodo(e) {
    const todoId = parseInt(e.target.closest('.todo-item').dataset.id);
    const todo = todos.find(t => t.id === todoId);
    
    if (todo) {
        todo.completed = !todo.completed;
        saveTodos();
        renderTodos();
        
        const message = todo.completed ? 'Todo completed!' : 'Todo marked as pending';
        showMessage(message, 'success');
    }
}

// Edit todo
function editTodo(id) {
    const todo = todos.find(t => t.id === id);
    if (!todo) return;
    
    const newText = prompt('Edit todo:', todo.text);
    
    if (newText !== null && newText.trim() !== '') {
        todo.text = newText.trim();
        saveTodos();
        renderTodos();
        showMessage('Todo updated successfully!', 'success');
    }
}

// Delete todo
function deleteTodo(id) {
    if (confirm('Are you sure you want to delete this todo?')) {
        todos = todos.filter(t => t.id !== id);
        saveTodos();
        renderTodos();
        showMessage('Todo deleted successfully!', 'success');
    }
}

// Clear completed todos
function clearCompletedTodos() {
    const completedCount = todos.filter(t => t.completed).length;
    
    if (completedCount === 0) {
        showMessage('No completed todos to clear', 'info');
        return;
    }
    
    if (confirm(`Are you sure you want to delete ${completedCount} completed todos?`)) {
        todos = todos.filter(t => !t.completed);
        saveTodos();
        renderTodos();
        showMessage(`${completedCount} completed todos cleared!`, 'success');
    }
}

// Update statistics
function updateStats() {
    const total = todos.length;
    const completed = todos.filter(t => t.completed).length;
    const pending = total - completed;
    
    totalTasks.textContent = total;
    completedTasks.textContent = completed;
    pendingTasks.textContent = pending;
}

// Save todos to localStorage
function saveTodos() {
    localStorage.setItem('todos', JSON.stringify(todos));
}

// Show message
function showMessage(message, type = 'info') {
    // Remove existing message
    const existingMessage = document.querySelector('.message');
    if (existingMessage) {
        existingMessage.remove();
    }
    
    const messageDiv = document.createElement('div');
    messageDiv.className = `message message-${type}`;
    messageDiv.textContent = message;
    
    // Style the message
    messageDiv.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 1rem 2rem;
        border-radius: 10px;
        color: #fff;
        font-weight: bold;
        z-index: 1000;
        animation: slideIn 0.3s ease;
    `;
    
    // Set background color based on type
    switch (type) {
        case 'success':
            messageDiv.style.backgroundColor = '#4caf50';
            break;
        case 'error':
            messageDiv.style.backgroundColor = '#f44336';
            break;
        case 'info':
            messageDiv.style.backgroundColor = '#2196f3';
            break;
        default:
            messageDiv.style.backgroundColor = '#2e647a';
    }
    
    document.body.appendChild(messageDiv);
    
    // Remove message after 3 seconds
    setTimeout(() => {
        messageDiv.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => messageDiv.remove(), 300);
    }, 3000);
}

// Escape HTML to prevent XSS
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// Add CSS animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Initialize app
function init() {
    renderTodos();
    setFilter('all');
}

// Start the app
init(); 