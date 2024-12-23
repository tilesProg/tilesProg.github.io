import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import TodoPage from './pages/TodoPage';
import DndPage from './pages/DndPage';

function App() {
    const [todos, setTodos] = useState(() => {
        const savedTodos = localStorage.getItem('todos');
        return savedTodos ? JSON.parse(savedTodos) : [];
    });

    useEffect(() => {
        localStorage.setItem('todos', JSON.stringify(todos));
    }, [todos]);

    const addTodo = (newTodo) => {
        setTodos(prevTodos => [...prevTodos, newTodo]);
    };

    const toggleTodo = (id) => {
        setTodos(prevTodos =>
            prevTodos.map(todo =>
                todo.id === id ? { ...todo, completed: !todo.completed, status: todo.completed ? 'todo' : 'completed' } : todo
            )
        );
    };

    const removeTodo = (id) => {
        const updatedTodos = todos.filter(todo => todo.id !== id);
        setTodos(updatedTodos);
        localStorage.setItem('todos', JSON.stringify(updatedTodos));
    };

    const updateTodoStatus = (id, status) => {
        setTodos(prevTodos =>
            prevTodos.map(todo =>
                todo.id === id ? { ...todo, status, completed: status === 'completed' } : todo
            )
        );
    };

    return (
        <Router>
            <Routes>
                <Route path="/" element={<TodoPage todos={todos} addTodo={addTodo} toggleTodo={toggleTodo} removeTodo={removeTodo} />} />
                <Route path="/dnd" element={<DndPage todos={todos} updateTodoStatus={updateTodoStatus} removeTodo={removeTodo} />} />
            </Routes>
        </Router>
    );
}

export default App;
