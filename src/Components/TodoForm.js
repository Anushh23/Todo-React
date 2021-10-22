import React, {useState, useEffect, useRef} from 'react';

const TodoForm=(props)=>{

    const inputRef= useRef(null);

    useEffect(()=>{
         inputRef.current.focus();
    })
    const [todo,setTodo]= useState(props.edit? props.edit.text: '');

    const inputChangeHandler=(e)=>{
        setTodo(e.target.value);
    }
    const submitHandler=(e)=>{
        e.preventDefault();
        props.onAddingTodo({
            id: Math.random(),
            text: todo.trim(),
        })
        if(props.checkIfUpdate=='0')
        {setTodo('');}
    }
    return(
        <form className="todo-form" onSubmit={submitHandler}>
          <input type="text" placeholder={props.placeholder} onChange={inputChangeHandler} value={todo} className="todo-input" ref={inputRef}></input>
          <button className="todo-button">{props.buttonContent}</button>
        </form>
    );
}

export default TodoForm;