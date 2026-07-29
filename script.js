// Checkpoint 1: JS Massivindən Tapşırıqların Dinamik Render olunması

// İlkin test məlumatları (JS massivi)
let tasks = [
    {
        id: "1",
        title: "DevJoint 1",
        description: "Frontend",
        priority: "high", // low, medium, high
        status: "todo"   // todo, in-progress, done
    },
    {
        id: "2",
        title: "DEVJOINT",
        description: "MST 15",
        priority: "low",
        status: "done"
    }
];

// DOM Elementləri
const tasksTodo = document.getElementById('tasks-todo');
const tasksInProgress = document.getElementById('tasks-in-progress');
const tasksDone = document.getElementById('tasks-done');

const countTodo = document.getElementById('count-todo');
const countInProgress = document.getElementById('count-in-progress');
const countDone = document.getElementById('count-done');

// Massivdəki məlumatları ekrana çıxaran funksiya
function renderTasks() {
    // Sütunları təmizləyirik
    tasksTodo.innerHTML = '';
    tasksInProgress.innerHTML = '';
    tasksDone.innerHTML = '';

    let todoCount = 0;
    let inProgressCount = 0;
    let doneCount = 0;

    tasks.forEach(task => {
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

    // Boş sütunlar üçün mesaj göstəririk
    checkEmptyColumn(tasksTodo, todoCount);
    checkEmptyColumn(tasksInProgress, inProgressCount);
    checkEmptyColumn(tasksDone, doneCount);

    // Sayğacları yeniləyirik
    countTodo.textContent = todoCount;
    countInProgress.textContent = inProgressCount;
    countDone.textContent = doneCount;
}

// Tək bir kart HTML-i yaradan funksiya
function createTaskCard(task) {
    const card = document.createElement('div');
    card.className = 'task-card';
    card.dataset.id = task.id;

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
    `;

    return card;
}

function checkEmptyColumn(container, count) {
    if (count === 0) {
        container.innerHTML = `<div class="empty-msg">Burada tapşırıq yoxdur</div>`;
    }
}

// Səhifə açılan kimi render et
document.addEventListener('DOMContentLoaded', renderTasks);