import { Todo } from "../classes";
import { todoList } from "../index";

// RTeferencias en el HTML
const divTodoList   = document.querySelector('.todo-list');
const textImput     = document.querySelector('.new-todo');
const btnBorrar     = document.querySelector('.clear-completed');
const ulFiltros     = document.querySelector('.filters');
const anchorFiltros = document.querySelectorAll('.filtro');

export const crearTodoHtml = (todo) =>{

    const htmlTodo = `
    <li class="${ (todo.completado) ? 'completed' : ''}" data-id="${todo.id}">
        <div class="view">
            <input class="toggle" type="checkbox" ${ (todo.completado) ? 'checked' : ''} >
            <label>${todo.tarea}</label>
            <button class="destroy"></button>
        </div>
        <input class="edit" value="Create a TodoMVC template">
    </li>`;

    const div = document.createElement('div');
    div.innerHTML = htmlTodo;

    divTodoList.append(div.firstElementChild);

    return div.firstElementChild;
}

// Eventos
textImput.addEventListener('keyup', (event) =>{
    if(event.keyCode === 13 && textImput.value.length >0 ){
        // console.log(textImput.value);
        const nuevoTodo = new Todo (textImput.value);
        todoList.nuevoTodo(nuevoTodo);

        crearTodoHtml(nuevoTodo);
        textImput.value='';
    }
});

divTodoList.addEventListener('click', (event) =>{
    const nombreElemento = event.target.localName; //imput, label button
    const todoElemento   = event.target.parentElement.parentElement;
    const todoId         = todoElemento.getAttribute('data-id');

    if(nombreElemento.includes('input')){
        todoList.marcarCompletado(todoId);
        todoElemento.classList.toggle('completed');
    }else if(nombreElemento.includes('button')){
        todoList.eliminarTodo(todoId);
        divTodoList.removeChild(todoElemento);
    }

});

btnBorrar.addEventListener('click', (event) =>{
    todoList.eliminarCompletados();

    for(let i = divTodoList.children.length-1; i >= 0; i--){
        const elemento = divTodoList.children[i];

        if(elemento.classList.contains('completed')){
            divTodoList.removeChild(elemento);
        }
    }
}); 

ulFiltros.addEventListener('click', (event) =>{
    const filtro = event.target.text;

    console.log(filtro);
    if(!filtro) {return;}

    anchorFiltros.forEach(elem => elem.classList.remove('selected'));
    event.target.classList.add('selected');

    for(const elemento of divTodoList.children){
        console.log(elemento);
        elemento.classList.remove('hidden');
        const completado = elemento.classList.contains('completed');

        switch(filtro){
            case'Pendientes':
                if(completado){
                    elemento.classList.add('hidden');
                }
            break;

            case'Completados':
                if(!completado){
                    elemento.classList.add('hidden');
                }
            break;
        }
    }

});