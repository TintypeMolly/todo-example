let todoItems = [];
let sortOrder = null;
let filter = null;

function render() {
    const table = document.getElementById('todo-items');
    const tableBody = table.getElementsByTagName('tbody')[0];
    while(tableBody.lastChild) {
        tableBody.removeChild(tableBody.lastChild);
    }
    
    if (todoItems.length === 0) {
        const emptinessNoticeRow = document.createElement('tr');
        const firstCell = document.createElement('td');
        firstCell.innerText = 'Empty';
        const secondCell = document.createElement('td');
        const thirdCell = document.createElement('td');
        emptinessNoticeRow.appendChild(firstCell);
        emptinessNoticeRow.appendChild(secondCell);
        emptinessNoticeRow.appendChild(thirdCell);
        tableBody.appendChild(emptinessNoticeRow);
    } else {
        const sortedTodoItems = todoItems.concat();
        if (!!sortOrder) {
            sortedTodoItems.sort(
                (item1, item2) => (
                    (sortOrder === 'asc' ? 1 : -1) *
                    item1.name.localeCompare(item2.name)
                )
            );
        }
        const sortedFilteredTodoItems = !!filter ?
            sortedTodoItems.filter(item => (filter === 'done' && item.done) || (filter === 'undone' && !item.done)) :
            sortedTodoItems;
        for (let item of sortedFilteredTodoItems) {
            tableBody.appendChild(createTodoItemElement(item));
        }
    }
}

function addTodoItem() {
    const name = document.getElementById('name-input').value;
    const item = {name: name, done: false};
    todoItems.push(item);
    render();
}

function removeTodoItem(item) {
    todoItems = todoItems.filter(i => i !== item);
    render();
}

function createTodoItemElement(item) {
    const row = document.createElement('tr');

    const nameCell = document.createElement('td');
    nameCell.innerText = item.name;
    row.appendChild(nameCell);

    const doneCell = document.createElement('td');
    row.appendChild(doneCell);

    const checkbox = document.createElement('input');
    checkbox.setAttribute('type', 'checkbox');
    item.done && checkbox.setAttribute('checked', '');
    checkbox.addEventListener('change', event => {
        item.done = event.target.checked;
    });
    doneCell.appendChild(checkbox);

    const deleteCell = document.createElement('td');
    row.appendChild(deleteCell);

    const deleteButton = document.createElement('button');
    deleteButton.innerText = 'delete';
    deleteCell.appendChild(deleteButton);
    deleteCell.addEventListener('click', () => {
        removeTodoItem(item);
    });

    return row;
}

function setAscending() {
    sortOrder = 'asc';
    render();
}

function setDescending() {
    sortOrder = 'dsc';
    render();
}

function unsetSort() {
    sortOrder = null;
    render();
}

function setDoneFilter() {
    filter = 'done';
    render();
}

function setUndoneFilter() {
    filter = 'undone';
    render();
}

function unsetFilter() {
    filter = null;
    render();
}

render();
