
let tasks = JSON.parse(localStorage.getItem('kanban_tasks')) || [
    {
        id: "1",
        title: "DevJoint 1",
        description: "Frontend",
        priority: "high",
        status: "todo"
    },
    {
        id: "2",
        title: "DEVJOINT",
        description: "MST 15",
        priority: "low",
        status: "done"
    }
];

function saveTasksToLocalStorage() {
    localStorage.setItem('kanban_tasks', JSON.stringify(tasks));
}

// DOM Elementləri
const tasksTodo = document.getElementById('tasks-todo');
const tasksInProgress = document.getElementById('tasks-in-progress');
const tasksDone = document.getElementById('tasks-done');

const countTodo = document.getElementById('count-todo');
const countInProgress = document.getElementById('count-in-progress');
const countDone = document.getElementById('count-done');

const searchInput = document.getElementById('search-input');
const priorityFilter = document.getElementById('priority-filter');

// Modal Elementləri
const modal = document.getElementById('task-modal');
const modalTitle = document.getElementById('modal-title');
const taskForm = document.getElementById('task-form');
const taskIdInput = document.getElementById('task-id');
const taskTitleInput = document.getElementById('task-title-input');
const taskDescInput = document.getElementById('task-desc-input');
const taskPriorityInput = document.getElementById('task-priority-input');
const openModalBtn = document.getElementById('open-modal-btn');
const closeModalBtn = document.getElementById('close-modal-btn');

// Modal Funksiyaları
function openModal(isEdit = false, task = null) {
    modal.classList.add('modal--open');
    if (isEdit && task) {
        modalTitle.textContent = 'Tapşırığı Redaktə Et';
        taskIdInput.value = task.id;
        taskTitleInput.value = task.title;
        taskDescInput.value = task.description || '';
        taskPriorityInput.value = task.priority;
    } else {
        modalTitle.textContent = 'Yeni Tapşırıq';
        taskForm.reset();
        taskIdInput.value = '';
    }
}

function closeModal() {
    modal.classList.remove('modal--open');
    taskForm.reset();
    taskIdInput.value = '';
}

openModalBtn.addEventListener('click', () => openModal(false));
closeModalBtn.addEventListener('click', closeModal);
modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
});

// Form göndərilməsi
taskForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const title = taskTitleInput.value.trim();
    const description = taskDescInput.value.trim();
    const priority = taskPriorityInput.value;
    const id = taskIdInput.value;

    if (!title) return;

    if (id) {
        const task = tasks.find(t => t.id === id);
        if (task) {
            task.title = title;
            task.description = description;
            task.priority = priority;
        }
    } else {
        const newTask = {
            id: Date.now().toString(),
            title: title,
            description: description,
            priority: priority,
            status: 'todo'
        };
        tasks.push(newTask);
    }

    saveTasksToLocalStorage();
    renderTasks();
    closeModal();
});

// Tapşırıq Silmə
function deleteTask(id) {
    if (confirm('Bu tapşırığı silmək istədiyinizdən əminsiniz?')) {
        tasks = tasks.filter(task => task.id !== id);
        saveTasksToLocalStorage();
        renderTasks();
    }
}

// Drag and Drop
function setupDragAndDrop() {
    const columns = document.querySelectorAll('.column');

    columns.forEach(column => {
        const tasksContainer = column.querySelector('.column__tasks');
        const status = column.dataset.status;

        tasksContainer.addEventListener('dragover', (e) => {
            e.preventDefault();
            tasksContainer.classList.add('drag-over');
        });

        tasksContainer.addEventListener('dragleave', () => {
            tasksContainer.classList.remove('drag-over');
        });

        tasksContainer.addEventListener('drop', (e) => {
            e.preventDefault();
            tasksContainer.classList.remove('drag-over');

            const taskId = e.dataTransfer.getData('text/plain');
            const draggedTask = tasks.find(t => t.id === taskId);

            if (draggedTask && draggedTask.status !== status) {
                draggedTask.status = status;
                saveTasksToLocalStorage();
                renderTasks();
            }
        });
    });
}

//Filterleme
function getFilteredTasks() {
    const query = searchInput ? searchInput.value.toLowerCase().trim() : '';
    const selectedPriority = priorityFilter ? priorityFilter.value : 'all';

    return tasks.filter(task => {
        const matchesSearch = task.title.toLowerCase().includes(query) || 
                              (task.description && task.description.toLowerCase().includes(query));
        
        const matchesPriority = selectedPriority === 'all' || task.priority === selectedPriority;

        return matchesSearch && matchesPriority;
    });
}

// Render Funksiyası
function renderTasks() {
    tasksTodo.innerHTML = '';
    tasksInProgress.innerHTML = '';
    tasksDone.innerHTML = '';

    let todoCount = 0;
    let inProgressCount = 0;
    let doneCount = 0;

    const filteredTasks = getFilteredTasks();

    filteredTasks.forEach(task => {
        const card = createTaskCard(task);

        if (task.status === 'todo') {
            tasksTodo.appendChild(card);
            todoCount++;
        } else if (task.status === 'in-progress') {
            tasksInProgress.appendChild(card);
            inProgressCount++;
        } else if (task.status === 'done') {
            tasksDone.appendChild(card);
            doneCount++;
        }
    });

    checkEmptyColumn(tasksTodo, todoCount);
    checkEmptyColumn(tasksInProgress, inProgressCount);
    checkEmptyColumn(tasksDone, doneCount);

    countTodo.textContent = todoCount;
    countInProgress.textContent = inProgressCount;
    countDone.textContent = doneCount;
}

// Kart yaradılması
function createTaskCard(task) {
    const card = document.createElement('div');
    card.className = 'task-card';
    card.dataset.id = task.id;
    card.setAttribute('draggable', 'true');

    const priorityText = {
        low: 'Aşağı',
        medium: 'Orta',
        high: 'Yüksək'
    };

    card.innerHTML = `
        <span class="task-card__badge task-card__badge--${task.priority}">
            ${priorityText[task.priority] || task.priority}
        </span>
        <h3 class="task-card__title">${task.title}</h3>
        ${task.description ? `<p class="task-card__desc">${task.description}</p>` : ''}
        <div class="task-card__actions">
            <button class="action-btn action-btn--edit" title="Redaktə et">✏️</button>
            <button class="action-btn action-btn--delete" title="Sil">🗑️</button>
        </div>
    `;

    card.addEventListener('dragstart', (e) => {
        e.dataTransfer.setData('text/plain', task.id);
        card.classList.add('dragging');
    });

    card.addEventListener('dragend', () => {
        card.classList.remove('dragging');
    });

    const editBtn = card.querySelector('.action-btn--edit');
    const deleteBtn = card.querySelector('.action-btn--delete');

    editBtn.addEventListener('click', () => openModal(true, task));
    deleteBtn.addEventListener('click', () => deleteTask(task.id));

    return card;
}

function checkEmptyColumn(container, count) {
    if (count === 0) {
        container.innerHTML = `<div class="empty-msg">Burada tapşırıq yoxdur</div>`;
    }
}

// Event Listeners for Search & Filter
if (searchInput) searchInput.addEventListener('input', renderTasks);
if (priorityFilter) priorityFilter.addEventListener('change', renderTasks);

document.addEventListener('DOMContentLoaded', () => {
    renderTasks();
    setupDragAndDrop();
});