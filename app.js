//Selector
const todoinput = document.querySelector('.todo-input');
const todobutton = document.querySelector('.todo-button');
const todolist = document.querySelector('.todo-list');
const filteroption = document.querySelector('.filter-todo');
const dark = document.getElementsByClassName('darkk')[0];
const bodyColor = document.getElementsByClassName('body')[0];

//Event listiners
document.addEventListener('DOMContentLoaded', gettodos);
todobutton.addEventListener('click', addtodo);
todolist.addEventListener("click", deleteCheck);
filteroption.addEventListener("click", filterToDo);


//functions

function addtodo(event) {
    //prevent refresh
    event.preventDefault();

    //todo div
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");

    //create li
    const newTodo = document.createElement("li");
    newTodo.innerText = todoinput.value;
    if (todoinput.value === ''){
        alert('Enter something...')
        return;
    }
    newTodo.classList.add("todo-item");
    todoDiv.appendChild(newTodo);

    //add todo to localstorage
    saveLocalTodos(todoinput.value);

    //check mark
    const completedButton = document.createElement("button");
    completedButton.innerHTML = '<i class="fas fa-check"></i>';
    completedButton.classList.add("complete-btn");
    todoDiv.appendChild(completedButton);

    //teash mark
    const trashButton = document.createElement("button");
    trashButton.innerHTML = '<i class="fas fa-trash"></i>';
    trashButton.classList.add("trash-btn");
    todoDiv.appendChild(trashButton);

    //append to ul
    todolist.appendChild(todoDiv);

    //clear todo input
    todoinput.value = "";
}


function deleteCheck(e) {
    const item = e.target;
    //detele 
    if (item.classList[0] === 'trash-btn') {
        const todo = item.parentElement;

        //animation
        todo.classList.add("fall");
        removelocaltodos(todo);
        todo.addEventListener('transitionend', function() {
            todo.remove();
        });
    }

    //checked
    if (item.classList[0] === 'complete-btn') {
        const todo = item.parentElement;
        todo.classList.toggle('completed');
    }
}

function filterToDo(e) {
    const todos = todolist.childNodes;
    todos.forEach(function(todo) {
        switch (e.target.value) {
            case "all":
                todo.style.display = "flex";
                break;
            case "completed":
                if (todo.classList.contains('completed')) {
                    todo.style.display = "flex";
                } else {
                    todo.style.display = "none";
                }
                break;
            case "uncompleted":
                if (!todo.classList.contains('completed')) {
                    todo.style.display = "flex";
                } else {
                    todo.style.display = "none";
                }
                break;
        }
    });
}


function saveLocalTodos(todo) {
    //check if already exist
    let todos;
    if (localStorage.getItem('todos') === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }


    todos.push(todo);
    localStorage.setItem('todos', JSON.stringify(todos));
}

function gettodos() {

    //check if already exist
    let todos;
    if (localStorage.getItem('todos') === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }

    todos.forEach(function(todo) {
        //todo div
        const todoDiv = document.createElement("div");
        todoDiv.classList.add("todo");

        //create li
        const newTodo = document.createElement("li");
        newTodo.innerText = todo;
        newTodo.classList.add("todo-item");
        todoDiv.appendChild(newTodo);

        //check mark
        const completedButton = document.createElement("button");
        completedButton.innerHTML = '<i class="fas fa-check"></i>';
        completedButton.classList.add("complete-btn");
        todoDiv.appendChild(completedButton);

        //teash mark
        const trashButton = document.createElement("button");
        trashButton.innerHTML = '<i class="fas fa-trash"></i>';
        trashButton.classList.add("trash-btn");
        todoDiv.appendChild(trashButton);

        //append to ul
        todolist.appendChild(todoDiv);
    })
}

function removelocaltodos(todo) {

    //check if already exist
    let todos;
    if (localStorage.getItem('todos') === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }

    const todoIndex = todo.children[0].innerText;
    todos.splice(todos.indexOf(todoIndex), 1);
    localStorage.setItem("todos", JSON.stringify(todos));
}

dark.addEventListener('click', () =>{
    bodyColor.classList.toggle('darkAction');
    dark.classList.toggle('darkAction')
})



