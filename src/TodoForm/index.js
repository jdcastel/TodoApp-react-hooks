import React from "react";
import "./styles.css";
import { TodoContext } from "../TodoContext";

const TodoForm = () => {
  
    const [newTodoValue, setNewTodoValue] = React.useState("");

    const {
        addTodo,
        setOpenModal,
        
    } = React.useContext(TodoContext);
    const onCancel = () => {
        setOpenModal(false);
    }
    const onSubmit = (event) => {
        event.preventDefault();
        addTodo(newTodoValue);
        setOpenModal(false);
    }
    const onChange = (event) => {
        setNewTodoValue(event.target.value)
    }

    return (
    <form onSubmit={onSubmit}>
      <label>Agrega el nuevo Todo</label>
      <textarea placeholder="Escribe aquie el nueveo TODO:" />
      <div className="TodoForm-buttonContainer">
        <button 
          type="submit"
          className="TodoForm-button TodoForm-button--add"
          value={onChange(onChange)}>
          Agregar
        </button>
        <button 
          type="button"
          onClick={onCancel}
          className="TodoForm-button TodoForm-button--cancel">
          Cancelar
        </button>
      </div>
    </form>
  );
};

export {TodoForm};
