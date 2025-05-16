document.addEventListener('DOMContentLoaded', function () {
  const taskList = document.querySelector('.task-list');
  const form = document.querySelector('.add-task-form');
  const input = form.querySelector('input[name="title"]');

  // Adicionar nova task
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    const title = input.value.trim();
    if (!title) return;

    fetch('/tasks', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: `title=${encodeURIComponent(title)}`,
    })
      .then((res) => res.json())
      .then((task) => {
        input.value = '';
        addTaskToDOM(task.id, task.title);
      });
  });

  // Função para adicionar uma task no DOM
  function addTaskToDOM(id, title) {
    const li = document.createElement('li');
    li.className = 'task-item';
    li.dataset.id = id;

    li.innerHTML = `
      <div class="task-content">
        <span class="task-title" contenteditable="false">${title}</span>
      </div>
      <div class="task-actions">
        <button class="delete-button" data-id="${id}">X</button>
      </div>
    `;

    taskList.appendChild(li);
  }

  // Controle para edição única
  let editingTask = null;

  // MOUSE DOWN resolve o problema de salvar antes de perder o foco
  taskList.addEventListener('mousedown', function (e) {
    const target = e.target;
    const taskItem = target.closest('.task-item');
    if (!taskItem) return;
    const id = taskItem.dataset.id;

    // Clicar em qualquer parte da task ativa edição
    const clickedInsideTask = target.closest('.task-content');
    if (clickedInsideTask) {
      if (editingTask && editingTask !== taskItem) return;

      const titleEl = taskItem.querySelector('.task-title');
      titleEl.setAttribute('contenteditable', 'true');
      titleEl.focus();

      const actions = taskItem.querySelector('.task-actions');
      // só adiciona se não tiver botão salvar já
      if (!actions.querySelector('.save-button')) {
        actions.innerHTML = `<button class="save-button">Save</button>`;
      }

      editingTask = taskItem;
      return;
    }

    // Botão salvar
    if (target.classList.contains('save-button')) {
      const titleEl = taskItem.querySelector('.task-title');
      titleEl.blur(); // garante que o texto atual foi confirmado

      const newTitle = titleEl.textContent.trim();
      if (!newTitle) return alert('O título não pode estar vazio.');

      fetch(`/tasks/update/${id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: `title=${encodeURIComponent(newTitle)}`,
      }).then((res) => {
        if (res.ok) {
          titleEl.setAttribute('contenteditable', 'false');
          taskItem.querySelector('.task-actions').innerHTML = `
            <button class="delete-button" data-id="${id}">X</button>
          `;
          editingTask = null;
        }
      });
    }

    // Botão deletar
    if (target.classList.contains('delete-button')) {
      fetch(`/tasks/delete/${id}`, {
        method: 'POST',
      }).then((res) => {
        if (res.ok) {
          taskItem.remove();
          if (editingTask === taskItem) editingTask = null;
        }
      });
    }
  });
});
