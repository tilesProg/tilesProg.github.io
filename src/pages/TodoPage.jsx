import React from 'react';
import TodoList from '../components/TodoList';
import { useNavigate } from 'react-router-dom';

function TodoPage({ todos, addTodo, toggleTodo, removeTodo }) {
  const navigate = useNavigate();

  const handleAddTodo = (e) => {
    e.preventDefault();
    const newTodoTitle = e.target.elements.todoTitle.value;
    if (!newTodoTitle) return;

    const newTodoItem = {
      id: Date.now(),
      title: newTodoTitle,
      completed: false,
      status: 'todo',
    };

    addTodo(newTodoItem);
    e.target.reset();
  };

  return (
    <div>
      <h1>My To-Do List</h1>
      <form onSubmit={handleAddTodo}>
        <input
          type="text"
          name="todoTitle"
          placeholder="Add new task..."
        />
        <button type="submit">➕</button>
      </form>
      <button
        onClick={() => navigate('/dnd')}
        style={{
          position: 'fixed',
          top: '20px',
          left: '20px',
          padding: '10px',
          zIndex: 1000
        }}
      >
        Go to DnD Page
      </button>
      <TodoList todos={todos} toggleTodo={toggleTodo} removeTodo={removeTodo} />
    </div>
  );
}

export default TodoPage;
