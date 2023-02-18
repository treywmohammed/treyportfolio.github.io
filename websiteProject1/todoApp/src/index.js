var items = JSON.parse(localStorage.getItem('todos')) || [];
let editTodoId = -1;

const form = document.getElementById('todoForm');
const formInput = document.getElementById('input');
const todoListEl = document.getElementById('todos-list');
const notificationEl = document.querySelector('.notification');

//first render
renderTodo();


form.addEventListener('submit', function(event){
    event.preventDefault();

    saveTodoForm()
    renderTodo()
    localStorage.setItem('todos' , JSON.stringify(items));
})

function saveTodoForm() {
    const todoValue = formInput.value


    // check if feild is empty
    const isEmpty = todoValue === '';

    // checking for duplicate values
    const isDuplicate = items.some((todo) => todo.value.toUpperCase() === todoValue.toUpperCase());

    if(isEmpty){
        showNotification('Please add a value in the feild.');
    } else if (isDuplicate) {
        showNotification(todoValue + ' is already added.');
    }    
   else {
    // Editing the the arr with edit button.
    if(editTodoId >= 0){
        items = items.map((todo, index) => ({
            ...todo,
            value : index === editTodoId ? todoValue : todo.value,
}));
    editTodoId = -1
    }else{
        items.push({
            value: todoValue,
            checked: false,
            color: '#' + Math.floor(Math.random()*16777215).toString(16),
        });
    }
        

        formInput.value = '';
       
    }
}

function renderTodo() {
if(items.length === 0 ){
    todoListEl.innerHTML = '<center>Nothing has been added!</center>';
    return;
}

    // Clearing Render
todoListEl.innerHTML = '';


//Add each item to list
    items.forEach ((todo, index) => {
        todoListEl.innerHTML += `
        <div class="todos" id= ${index}>
                <i 
                class="glyphicon ${todo.checked ?  'glyphicon-ok-sign' : 'glyphicon-ok-circle'}"
                style = "color : ${todo.color}"
                data-action ="check"
                ></i>
                <p class="${todo.checked ? 'checked' : ''}" data-action ="check">${todo.value}</p>
                <i class="glyphicon glyphicon-edit" id="edit" data-action ="edit"></i>
                <i class="glyphicon glyphicon-remove" id="remove" data-action ="remove"></i>
            </div>
        `

    })
}

// Event listen

todoListEl.addEventListener('click' , (event) =>{
const target = event.target;
const parentEl = target.parentNode

if(parentEl.className !== 'todos')  return;

const todo = parentEl;
const todoID = Number(todo.id);


const action = target.dataset.action;

action === 'check' && checkTodo(todoID);
action === 'edit' && editTodo(todoID);
action === 'remove' && removeTodo(todoID);

})
// check a todo list
function checkTodo (todoID){
    items = items.map((todo , index) => ({
                ...todo,
                checked: index === todoID ? !todo.checked : todo.checked ,
            }))
            renderTodo();
            localStorage.setItem('todos' , JSON.stringify(items));
}

// Edit todo

function editTodo(todoID){
    formInput.value = items[todoID].value;
    editTodoId = todoID
}

function removeTodo(todoID){
   items =  items.filter ((todo, index) => index !== todoID);
    editTodoId = -1;
   // re-render todos
   renderTodo();
   localStorage.setItem('todos' , JSON.stringify(items));
}


//showing notification

function showNotification(msg) {
    // change the message
    notificationEl.innerHTML = msg;
  
    // notification enter
    notificationEl.classList.add('notif-enter');
  
    // notification leave
    setTimeout(() => {
        notificationEl.classList.remove('notif-enter');
    }, 2000);
  }

