//Selectors
const todoInput = document.querySelector('.todo-input')
const todoButton = document.querySelector('.todo-button')
const todoList = document.querySelector('.todo-list')
const filterOption = document.querySelector('#filter-todo')



//Event Listeners
document.addEventListener('DOMContentLoaded', getTodos)

todoButton.addEventListener('click', addTodo)

todoList.addEventListener('click', deleteCheck)

filterOption.addEventListener('click', filterTodo)



//Functions

function addTodo (event) {
event.preventDefault()


const todoDiv = document.createElement('div')
todoDiv.classList.add('todo') 
const liInTodoDiv = document.createElement('li')
liInTodoDiv.innerText = todoInput.value
liInTodoDiv.classList.add('todo-item')
todoDiv.appendChild(liInTodoDiv)


saveLocalTodo(todoInput.value)


const completedButton = document.createElement('button')
completedButton.innerHTML = '<i class ="fas fa-check"></i>';
completedButton.classList.add('complete-btn')
todoDiv.appendChild(completedButton)


const trashButton = document.createElement('button')
trashButton.innerHTML = '<i class ="fas fa-trash"></i>';
trashButton.classList.add('trash-btn')
todoDiv.appendChild(trashButton)


todoList.appendChild(todoDiv)

todoInput.value = ''
}


function deleteCheck (e){
    const target = e.target;

    console.log(target.classList);


    if(target.classList[0] === 'trash-btn'){
        const todo = target.parentElement 
        todo.classList.add('fall')
        removeLocalTodos(todo)
        todo.addEventListener('transitionend', () => todo.remove())
    }

    if(target.classList[0] === 'complete-btn'){
        const todo = target.parentElement
        todo.classList.toggle('completed')
    }
}


function filterTodo (e) {
const todos = todoList.childNodes

todos.forEach((elem) => {
    switch (e.target.value) {
        case 'all':
            elem.style.display = 'flex'
            break
        case 'completed':
            if(elem.classList.contains('completed')){
                elem.style.display = 'flex'
                console.log(elem.classList);
            } 
            else{
                elem.style.display = 'none'
            }
            break

        case 'uncompleted': 
            if(!elem.classList.contains('completed')){
                elem.style.display = 'flex'
            }else{
                elem.style.display ='none'
            }
            break
    }
})
}


function saveLocalTodo (todo) {
    let todos
    if (localStorage.getItem('todos') === null){
        todos = []
    }else{
        todos = JSON.parse(localStorage.getItem('todos'))
    }

    todos.push(todo)
    localStorage.setItem('todos', JSON.stringify(todos))
}



function getTodos (){
    let todos
    if (localStorage.getItem('todos') === null){
        todos = []
    }else{
        todos = JSON.parse(localStorage.getItem('todos'))
    }
    todos.forEach( function(todo){

        const todoDiv = document.createElement('div')
        todoDiv.classList.add('todo')
        const liInTodoDiv = document.createElement('li')
        liInTodoDiv.innerText = todo
        liInTodoDiv.classList.add('todo-item')
        todoDiv.appendChild(liInTodoDiv)

        const completedButton = document.createElement('button')
        completedButton.innerHTML = '<i class ="fas fa-check"></i>';
        completedButton.classList.add('complete-btn')
        todoDiv.appendChild(completedButton)


        const trashButton = document.createElement('button')
        trashButton.innerHTML = '<i class ="fas fa-trash"></i>';
        trashButton.classList.add('trash-btn')
        todoDiv.appendChild(trashButton)

        todoList.appendChild(todoDiv)
    })
}


function removeLocalTodos(todo) {
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }

  console.log(todo.childNodes[0].innerText);

  const todoIndex = todo.childNodes[0].innerText;
  console.log(todos.indexOf(todoIndex));

  todos.splice(todos.indexOf(todoIndex), 1);

  localStorage.setItem("todos", JSON.stringify(todos));
}