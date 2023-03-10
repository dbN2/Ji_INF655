import logo from './logo.svg';
import './App.css';

import React, { useState } from 'react';

function TodoList({toDoList, toggleCheckbox, deleteTask}){
  
  return (
    <ul>
      {toDoList.map((todo,index)=> (
        <li key = {index}>
          <label>
            <input type ="checkbox" 
            checked={todo.completed} 
            onChange = {() => toggleCheckbox(index)}  
            />
            {todo.description}   
            <button type="button" onClick = {() => deleteTask(index)}>  //delete task 
            Delete
            </button>
            
          </label>

        </li>
      ))}
    </ul>
  );
}

function TodoApp() {

  const [toDoList, setTodoList] = useState([]);
  const [showUncompleted, setShowUncompleted] = useState(false); //state variable for toggling display of tasks

  function toggleCheckbox(index) {  
    const newTodoList = [...toDoList];
    newTodoList[index].completed = !newTodoList[index].completed; //change task status
    setTodoList(newTodoList);
  }

  function addTodo(description) {
    setTodoList([...toDoList, {description, completed: false}]); //add new uncompleted todo 
  }
  
  function deleteTask(index) {    
    let newTodoList = [];
    for(let x=0; x<toDoList.length; x++){
      if(x!==index) newTodoList.push(toDoList[x]);  //
    }
    setTodoList(newTodoList);
  }

  const filteredList = showUncompleted ? toDoList.filter((task) => !task.completed): toDoList;  //the list that is displayed

  return (
    <div>
      <h1>Tasks</h1>

      <button type="button" onClick= {() => setShowUncompleted(!showUncompleted)}> {(showUncompleted===true)?"Show All Tasks":"Show Uncompleted Tasks"}</button> //toggles display of uncompleted tasks

      <TodoList toDoList={filteredList} toggleCheckbox={toggleCheckbox} deleteTask={deleteTask} />
      <form onSubmit = {(e) => {
        e.preventDefault();
        const input = e.target.elements.description;  
        addTodo(input.value);
        input.value = ''; 
      }}
      >
        <input name="description" type="text" />
        <button type="submit"> Add </button>
      </form>
    
    </div>
  );
}

export default TodoApp;
