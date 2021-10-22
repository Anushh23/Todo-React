import React,{ useState, useEffect } from 'react';
import TodoForm from './TodoForm';
import Todo from './Todo';

const TodoList=()=>{

    //function to get Item from Local Storage
    const getItemFromLocalStorage=()=>{
        let lists= localStorage.getItem('lists');
        if(lists)
        {
            return JSON.parse(lists);
        }
        else{
            return [];
        }
    }
    const [todos,setTodos]=useState(getItemFromLocalStorage());
    //Adding the todo
    const AddTodoHandler=(todo)=>{
        if(!todo.text||/^\s*$/.test(todo.text))
        {
            return;
        }
        //console.log(todo);
        const newTodo=[todo,...todos];
        setTodos(newTodo);
    }

    //Toggling whether it is complete or not
    const completeTodo=(id)=>{
        let updatedTodos= todos.map(todo=>{
            if(todo.id===id)
            {
                todo.isComplete=!todo.isComplete
            }
            return todo;
        })

        setTodos(updatedTodos);
    }

    //Removing a Todo
    const removeTodo=(id)=>{
        const AfterRemovingTodo= [...todos].filter(todo=> todo.id !== id)
        setTodos(AfterRemovingTodo);
    }

    //Updating a Todo
    const updateTodo=(todoId, newValue)=>{
        if(!newValue.text||/^\s*$/.test(newValue.text))
        {
            return;
        }

        setTodos(prev=> prev.map(item=>(item.id===todoId? newValue: item)));
    }
    // storing in Local Storage
    useEffect(()=>{
        localStorage.setItem('lists', JSON.stringify(todos));
    },[todos])
    
    return(
     <div className="todo-app">
          <h1>Todo List 📝</h1>
          <TodoForm onAddingTodo={AddTodoHandler} buttonContent="Add Todo" placeholder="Add a Todo..." checkIfUpdate="0"/>
          <Todo todos={todos} completeTodo={completeTodo} removeTodo={removeTodo} updateTodo={updateTodo}/>
     </div>
    );
}

export default TodoList;