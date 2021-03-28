function print(...content) {
  console.log(...content);
}


const tasks = [
  {
    _id: '5d2ca9e2e03d40b326596aa7',
    completed: true,
    body:
      'Occaecat non ea quis occaecat ad culpa amet deserunt incididunt elit fugiat pariatur. Exercitation commodo culpa in veniam proident laboris in. Excepteur cupidatat eiusmod dolor consectetur exercitation nulla aliqua veniam fugiat irure mollit. Eu dolor dolor excepteur pariatur aute do do ut pariatur consequat reprehenderit deserunt.\r\n',
    title: 'Eu ea incididunt sunt consectetur fugiat non.',
    timestamp: 1,
  },
  {
    _id: '5d2ca9e29c8a94095c1288e0',
    completed: false,
    body:
      'Aliquip cupidatat ex adipisicing veniam do tempor. Lorem nulla adipisicing et esse cupidatat qui deserunt in fugiat duis est qui. Est adipisicing ipsum qui cupidatat exercitation. Cupidatat aliqua deserunt id deserunt excepteur nostrud culpa eu voluptate excepteur. Cillum officia proident anim aliquip. Dolore veniam qui reprehenderit voluptate non id anim.\r\n',
    title:
      'Deserunt laborum id consectetur pariatur veniam occaecat occaecat tempor voluptate pariatur nulla reprehenderit ipsum.',
      timestamp: 2,
  },
  {
    _id: '5d2ca9e2e03d40b3232496aa7',
    completed: true,
    body:
      'Occaecat non ea quis occaecat ad culpa amet deserunt incididunt elit fugiat pariatur. Exercitation commodo culpa in veniam proident laboris in. Excepteur cupidatat eiusmod dolor consectetur exercitation nulla aliqua veniam fugiat irure mollit. Eu dolor dolor excepteur pariatur aute do do ut pariatur consequat reprehenderit deserunt.\r\n',
    title: 'Eu ea incididunt sunt consectetur fugiat non.',
    timestamp: 3,
  },
  {
    _id: '5d2ca9e29c8a94095564788e0',
    completed: false,
    body:
      'Aliquip cupidatat ex adipisicing veniam do tempor. Lorem nulla adipisicing et esse cupidatat qui deserunt in fugiat duis est qui. Est adipisicing ipsum qui cupidatat exercitation. Cupidatat aliqua deserunt id deserunt excepteur nostrud culpa eu voluptate excepteur. Cillum officia proident anim aliquip. Dolore veniam qui reprehenderit voluptate non id anim.\r\n',
    title:
      'Deserunt laborum id consectetur pariatur veniam occaecat occaecat tempor voluptate pariatur nulla reprehenderit ipsum.',
      timestamp: 4,
  },
];

function setObj(acc, item) {
  acc[item._id] = item;
  return acc;
}
const objOfTasks = JSON.parse(localStorage.getItem('taskList')) || tasks.reduce(setObj, {});

// Elements
const listContainer = document.querySelector('.tasks-list-section .list-group');
const form = document.querySelector('form[name=addTask]');
const inputTitle = form.querySelector('#title');
const inputBody = form.querySelector('#body');

const themeSelector = document.querySelector('#themeSelect');


// Styles
const themes = {
  default: {
    '--base-text-color': '#212529',
    '--header-bg': '#007bff',
    '--header-text-color': '#fff',
    '--default-btn-bg': '#007bff',
    '--default-btn-text-color': '#fff',
    '--default-btn-hover-bg': '#0069d9',
    '--default-btn-border-color': '#0069d9',
    '--danger-btn-bg': '#dc3545',
    '--danger-btn-text-color': '#fff',
    '--danger-btn-hover-bg': '#bd2130',
    '--danger-btn-border-color': '#dc3545',
    '--input-border-color': '#ced4da',
    '--input-bg-color': '#fff',
    '--input-text-color': '#495057',
    '--input-focus-bg-color': '#fff',
    '--input-focus-text-color': '#495057',
    '--input-focus-border-color': '#80bdff',
    '--input-focus-box-shadow': '0 0 0 0.2rem rgba(0, 123, 255, 0.25)',
    '--card-bg': '#fff',
    '--body-bg': '#fff',
    '--base-title-color': '#212529',
  },
  dark: {
    '--base-text-color': '#dedede',
    '--header-bg': '#343a40',
    '--header-text-color': '#fff',
    '--default-btn-bg': '#58616b',
    '--default-btn-text-color': '#fff',
    '--default-btn-hover-bg': '#292d31',
    '--default-btn-border-color': '#343a40',
    '--default-btn-focus-box-shadow':
      '0 0 0 0.2rem rgba(141, 143, 146, 0.25)',
    '--danger-btn-bg': '#b52d3a',
    '--danger-btn-text-color': '#fff',
    '--danger-btn-hover-bg': '#88222c',
    '--danger-btn-border-color': '#88222c',
    '--input-border-color': '#ced4da',
    '--input-bg-color': '#fff',
    '--input-text-color': '#495057',
    '--input-focus-bg-color': '#fff',
    '--input-focus-text-color': '#495057',
    '--input-focus-border-color': '#78818a',
    '--input-focus-box-shadow': '0 0 0 0.2rem rgba(141, 143, 146, 0.25)',
    '--card-bg': '#343a40',
    '--body-bg': '#58616b',
    '--base-title-color': '#fff',
  },
  light: {
    '--base-text-color': '#212529',
    '--header-bg': '#fff',
    '--header-text-color': '#212529',
    '--default-btn-bg': '#fff',
    '--default-btn-text-color': '#212529',
    '--default-btn-hover-bg': '#e8e7e7',
    '--default-btn-border-color': '#343a40',
    '--default-btn-focus-box-shadow':
      '0 0 0 0.2rem rgba(141, 143, 146, 0.25)',
    '--danger-btn-bg': '#f1b5bb',
    '--danger-btn-text-color': '#212529',
    '--danger-btn-hover-bg': '#ef808a',
    '--danger-btn-border-color': '#e2818a',
    '--input-border-color': '#ced4da',
    '--input-bg-color': '#fff',
    '--input-text-color': '#495057',
    '--input-focus-bg-color': '#fff',
    '--input-focus-text-color': '#495057',
    '--input-focus-border-color': '#78818a',
    '--input-focus-box-shadow': '0 0 0 0.2rem rgba(141, 143, 146, 0.25)',
    '--card-bg': '#fff',
    '--body-bg': '#fff',
    '--base-title-color': '#212529',
  },
};

themeSelector.addEventListener('change', () => {
  const theme = themeSelector.value;
  themeApply(theme);
  localStorage.setItem('themeCSS', theme)
});

function themeApply(themeName) {
  const themeObject = themes[themeName];
  Object.entries(themeObject).forEach(([prop, value]) => {
    document.documentElement.style.setProperty(prop, value);
  })
}

// Events
const defaultTheme = localStorage.getItem('themeCSS') || 'default';
themeApply(defaultTheme);

renderAllTasks(objOfTasks);

function renderAllTasks(tasks) {
  if(!tasks) return console.error('No arguments passed');

  const fragment = document.createDocumentFragment();
  const tasksArr = Object.values(tasks).sort((n, p) => p.timestamp - n.timestamp);
  tasksArr.forEach(task => {
    fragment.append(createTaskCard(task))
  });

  listContainer.append(fragment)
}

form.addEventListener('submit', e => {
  e.preventDefault();
  const titleValue = inputTitle.value;
  const bodyValue = inputBody.value;

  if (!checkEmptyField(inputTitle)) return;
  if (!checkEmptyField(inputBody)) return;
  const newTask = createNewTask(titleValue, bodyValue);
  listContainer.prepend(createTaskCard(newTask));
  form.reset();
});

function createTaskCard({_id, title, body} = {}) {
  const li = document.createElement('li');
  li.className = 'list-group-item d-flex align-items-center flex-wrap mt-2';
  li.dataset.id = _id;
  li.insertAdjacentHTML('afterbegin', `
    <span style="font-weight: bold">${title}</span>
    <button class="btn btn-danger ml-auto delete-btn">Delete</button>
    <p class="mt-2 w-100">
      ${body}
    </p>
  `);
  return li;
}


function checkEmptyField(field) {
  const message = `${field.placeholder} is empty! Please, fill it.`;
  return field.value === ''? alert(message) : true;
}

function createNewTask(title, body) {
  const newTask = {
    title,
    body,
    completed: false,
    timestamp: Date.now(),
    _id: `task-${Math.round(Math.random() * 1e20)}`
  };
  objOfTasks[newTask._id] = newTask;
  localStorage.setItem('taskList', JSON.stringify(objOfTasks));
  return newTask;
}

// Delete task

listContainer.addEventListener('click', deleteHandler);

function deleteHandler({target}) {
  if(!target.classList.contains('delete-btn')) return;
  const li = target.closest('[data-id]');
  li.remove();
  delete objOfTasks[li.dataset.id];
  localStorage.setItem('taskList', JSON.stringify(objOfTasks));
}
