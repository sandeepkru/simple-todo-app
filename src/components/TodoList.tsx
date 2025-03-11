import React, { useState, useEffect } from 'react';
import Todo from './Todo';
import TodoForm from './TodoForm';

interface TodoItem {
  id: string;
  text: string;
  completed: boolean;
}

type FilterType = 'all' | 'active' | 'completed';

const TodoList: React.FC = () => {
  const [todos, setTodos] = useState<TodoItem[]>(() => {
    // Load todos from localStorage if available
    if (typeof window !== 'undefined') {
      const savedTodos = localStorage.getItem('todos');
      return savedTodos ? JSON.parse(savedTodos) : [];
    }
    return [];
  });
  const [filter, setFilter] = useState<FilterType>('all');

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

  const clearCompleted = () => {
    setTodos(todos.filter((todo) => !todo.completed));
  };

  const filteredTodos = todos.filter((todo) => {
    if (filter === 'active') return !todo.completed;
    if (filter === 'completed') return todo.completed;
    return true;
  });

  const activeTodosCount = todos.filter((todo) => !todo.completed).length;

  return (
    <div className="w-full max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-6 text-center">Todo List</h1>
      <TodoForm onAdd={addTodo} />
      
      <div className="flex justify-between items-center mt-6 mb-4">
        <span className="text-sm text-gray-600">
          {activeTodosCount} {activeTodosCount === 1 ? 'task' : 'tasks'} remaining
        </span>
        <div className="flex space-x-2">
          <button
            onClick={() => setFilter('all')}
            className={`px-3 py-1 text-sm rounded ${
              filter === 'all'
                ? 'bg-blue-500 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            All
          </button>
          <button
            onClick={() => setFilter('active')}
            className={`px-3 py-1 text-sm rounded ${
              filter === 'active'
                ? 'bg-blue-500 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            Active
          </button>
          <button
            onClick={() => setFilter('completed')}
            className={`px-3 py-1 text-sm rounded ${
              filter === 'completed'
                ? 'bg-blue-500 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            Completed
          </button>
        </div>
      </div>

      <div className="mt-4">
        {filteredTodos.length === 0 ? (
          <p className="text-center text-gray-500">
            {filter === 'all'
              ? 'No tasks yet. Add one above!'
              : filter === 'active'
              ? 'No active tasks.'
              : 'No completed tasks.'}
          </p>
        ) : (
          filteredTodos.map((todo) => (
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

      {todos.some((todo) => todo.completed) && (
        <div className="mt-6 text-center">
          <button
            onClick={clearCompleted}
            className="px-4 py-2 text-sm bg-red-100 text-red-600 rounded hover:bg-red-200"
          >
            Clear Completed
          </button>
        </div>
      )}
    </div>
  );
};

export default TodoList; 