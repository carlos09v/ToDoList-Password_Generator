// Seleção de elementos
const todoForm = document.querySelector('#todo-form'),
todoInput = document.querySelector('#todo-input'),
todoList = document.querySelector('.todo-list'),
editForm = document.querySelector('#edit-form'),
editInput = document.querySelector('#edit-input'),
cancelEditBtn = document.querySelector('#cancel-btn')

let oldInputValue

// Funções
const saveTodo = text => {
    const todo = document.createElement('div')
    todo.classList.add('todo')

    const todoTitle = document.createElement('h3')
    todoTitle.innerText = text
    todo.appendChild(todoTitle)

    const doneBtn = document.createElement('button')
    doneBtn.classList.add('finish-todo')
    doneBtn.innerHTML = '<i class="fa-solid fa-check"></i>'
    todo.appendChild(doneBtn)

    const editBtn = document.createElement('button')
    editBtn.classList.add('edit-todo')
    editBtn.innerHTML = '<i class="fa-solid fa-pen"></i>'
    todo.appendChild(editBtn)

    const deleteBtn = document.createElement('button')
    deleteBtn.classList.add('remove-todo')
    deleteBtn.innerHTML = '<i class="fa-solid fa-xmark"></i>'
    todo.appendChild(deleteBtn)

    todoList.appendChild(todo)
    todoInput.value = ''
    todoInput.focus()
}

const toggleForms = () => {
    editForm.classList.toggle('hide')
    todoForm.classList.toggle('hide')
    todoList.classList.toggle('hide')
}

const updateTodo = text => {
    const todos = document.querySelectorAll('.todo')

    todos.forEach( todo => {
        let todoTitle = todo.querySelector('h3')

        if(todoTitle.innerText === oldInputValue) {
            todoTitle.innerText = text
        }
    })
}

// Eventos
todoForm.addEventListener('submit', e => {
    e.preventDefault() // O Form nao vai ser enviado

    const inputValue = todoInput.value
    
    if(inputValue) {
        // salvar toDo
        saveTodo(inputValue)
    }
})

document.addEventListener('click', e => {
    // Ver em qual elemento foi clicado
    const targetEl = e.target
    const parentEl = targetEl.closest('div')
    let todoTitle

    if(parentEl && parentEl.querySelector('h3')) {
        todoTitle = parentEl.querySelector('h3').innerText || ''
    }
    
    if(targetEl.classList.contains('finish-todo')){
        parentEl.classList.toggle('done')
    }

    if(targetEl.classList.contains('remove-todo')){
        parentEl.remove()
    }

    if(targetEl.classList.contains('edit-todo')){
        toggleForms()
        
        editInput.value = todoTitle
        oldInputValue = todoTitle
    }

})

cancelEditBtn.addEventListener('click', e => {
    e.preventDefault()

    toggleForms()
})

editForm.addEventListener('submit', e => {
    e.preventDefault()

    const editInputValue = editInput.value

    if(editInputValue) {
        // atualizar
        updateTodo(editInputValue)
    }

    toggleForms()
})