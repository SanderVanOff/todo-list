'use strict';

const todoControl = document.querySelector('.todo-control');
const headerIinput = document.querySelector('.header-input');
const todoList = document.querySelector('.todo-list');
const todoCompleted = document.querySelector('.todo-completed');
const todoContainer = document.querySelector('.todo-container');

const todoData = JSON.parse(localStorage.getItem('tododata')) || [];

const saveTodoData = function(){
    localStorage.setItem('tododata', JSON.stringify(todoData));
};

const render = function () {
    todoList.innerHTML = '';
    todoCompleted.innerHTML = '';
    todoData.forEach((item, idx) => {
        const li = document.createElement('li');
        li.classList.add('todo-item');
        li.innerHTML = `<span class="text-todo">${item.text}</span>
        <div class="todo-buttons">
            <button class="todo-remove"></button>
            <button class="todo-complete"></button>
        </div>`;
        if (item.completed) {
            todoCompleted.append(li);
        } else {
            todoList.append(li);
        }

        li.addEventListener('click', (event) => {
            if (event.target.closest('.todo-complete')) {
                item.completed = !item.completed;
                render();              
            }

            if (event.target.closest('.todo-remove')) {
                todoData.splice(idx, 1);
                render();
            }

        });
        saveTodoData();
    });
};



todoControl.addEventListener('submit', (event) => {
    event.preventDefault();
    if (headerIinput.value.trim() !== '') {
        const newTodo = {
            text: headerIinput.value,
            completed: false
        };
        todoData.push(newTodo);
        headerIinput.value = '';
        render();
    }
});

render();