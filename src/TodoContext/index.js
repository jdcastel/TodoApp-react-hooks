import React from 'react';
import { useLocalStorage } from './useLocalStorage';

const TodoContext = React.createContext();

function TodoProvider({ children }) {
  const {
    item: todos,
    saveItem: saveTodos,
    loading,
    error,
  } = useLocalStorage('TODOS_V1', []);
  const [searchValue, setSearchValue] = React.useState('');

  // STATES TO CREATE THE MODAL
  const [openModal, setOpenModal] = React.useState(false);

  //* to lnow the quantity of all the todos
  //* 1.  filter all the todos
  const completedTodos = todos.filter(
    //* 2. is a double negation validation so if it is true i need to be true to counts in the lenght 
    //* why not only ! cuz i dont wanna change the validation i just need to confirm
    todo => !!todo.completed
  ).length;

  const totalTodos = todos.length;

  //search a text
  // * 1.filter create a new array passing all the "todos" array with todo
  const searchedTodos = todos.filter(
    (todo) => {
        // * 2. current todo make it into lower case
      const todoText = todo.text.toLowerCase();
      // * searchValue in the text field in lower case
      const searchText = searchValue.toLowerCase();
      // * usinfg the includes will compare and return what is included 
      return todoText.includes(searchText);
    }
  );

  const completeTodo = (text) => {
    //* get a copy of all the todos in the array 
    const newTodos = [...todos];
    //* find the index in the new array of todos that matches with the text
    const todoIndex = newTodos.findIndex(
      (todo) => todo.text === text
    );
    //* this line toggles the todo item depends if it is T or F in the completed property
    //* with the negation symbol !
    newTodos[todoIndex].completed = !newTodos[todoIndex].completed;
    saveTodos(newTodos);
  };

  const deleteTodo = (text) => {
    //* creates a copy of the todos
    const newTodos = [...todos];
    //* finds the index of the todo in the new array depending of the text
    const todoIndex = newTodos.findIndex(
      (todo) => todo.text === text
    );
    //* with the method splice pass 2 props 
    //* first the index of the element in the array that you wanna delete
    //* second the number of elements from that index you want to remove
    newTodos.splice(todoIndex, 1);
    //* call the function to save all the todos
    saveTodos(newTodos);
  };

  const addTodo = (text) =>{
    //* create the new array 
    const newTodos = [...todos];
    //* push the new array with the completed property set to false
    newTodos.push({
      text,
      completed: false,
    });
    //* call the function to save all the todos
    saveTodos(newTodos);
  };

  return (
    <TodoContext.Provider value={{
      //* all the states using react context provider that i want to export and make it public 
      loading,
      error,
      completedTodos,
      totalTodos,
      searchValue,
      setSearchValue,
      searchedTodos,
      completeTodo,
      deleteTodo,
      openModal,
      setOpenModal, 
      addTodo
    }}>
      {children}
    </TodoContext.Provider>
  );
}

export { TodoContext, TodoProvider };