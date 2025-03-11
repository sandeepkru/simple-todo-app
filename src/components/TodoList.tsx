import React, { useState, useEffect } from 'react';
import Todo from './Todo';
import TodoForm from './TodoForm';

interface TodoItem {
  id: string;
  text: string;
  completed: boolean;
}

const TodoList: React.FC = () => {
  const [todos, setTodos] = useState<TodoItem[]>(() => {
    // Load todos from localStorage if available
    if (typeof window !== 'undefined') {
      const savedTodos = localStorage.getItem('todos');
      return savedTodos ? JSON.parse(savedTodos) : [];
    }
    return [];
  });

  // Save todos to localStorage whenever they change
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('todos', JSON.stringify(todos));
    }
  }, [todos]);

  const addTodo = (text: string) => {
    if (text.trim()) {
      const newTodo: TodoItem = {
        id: Date.now().toString(),
        text: text.trim(),
        completed: false,
      };
      setTodos([...todos, newTodo]);
    }
  };

  const toggleTodo = (id: string) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteTodo = (id: string) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const editTodo = (id: string, newText: string) => {
    if (newText.trim()) {
      setTodos(
        todos.map((todo) =>
          todo.id === id ? { ...todo, text: newText.trim() } : todo
        )
      );
    }
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-6 text-center">Todo List</h1>
      <TodoForm onAdd={addTodo} />
      <div className="mt-6">
        {todos.length === 0 ? (
          <p className="text-center text-gray-500">No tasks yet. Add one above!</p>
        ) : (
          todos.map((todo) => (
            <Todo
              key={todo.id}
              id={todo.id}
              text={todo.text}
              completed={todo.completed}
              onToggle={toggleTodo}
              onDelete={deleteTodo}
              onEdit={editTodo}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default TodoList; 