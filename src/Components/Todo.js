import React,{ useState } from 'react';
import {RiCloseCircleLine} from 'react-icons/ri';
import {TiEdit} from 'react-icons/ti';
import TodoForm from './TodoForm';

const Todo=(props)=>{

    const [edit,setEdit]=useState({
        id: null,
        text: '',
    })
    const submitUpdate=(value)=>{
        props.updateTodo(edit.id,value);
        setEdit({
            id: null,
            text: '',
        })
    }

    if(edit.id)
    {
        return <TodoForm edit={edit} onAddingTodo={submitUpdate} checkIfUpdate="1" buttonContent="Update Todo" placeholder="Update todo..."/>
    }
     return props.todos.map((todo,index)=>(
         <div className={todo.isComplete ? 'todo-row complete': 'todo-row'} key={index}>
            <div key={todo.id} onClick={()=>props.completeTodo(todo.id)}>
                {todo.text}
            </div>
            <div className="icons">
                <RiCloseCircleLine className="delete-icon" onClick={()=>props.removeTodo(todo.id)}/>
                <TiEdit  className="edit-icon" onClick={()=>setEdit({id: todo.id, text: todo.text})}/>
            </div>
         </div>
     ))
}

export default Todo;