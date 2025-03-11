import React, { useState } from 'react';

interface TodoProps {
  id: string;
  text: string;
  completed: boolean;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (id: string, newText: string) => void;
}

const Todo: React.FC<TodoProps> = ({ id, text, completed, onToggle, onDelete, onEdit }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(text);

  const handleEdit = () => {
    if (isEditing) {
      onEdit(id, editText);
    }
    setIsEditing(!isEditing);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleEdit();
    }
  };

  return (
    <div className="flex items-center justify-between p-4 mb-2 bg-white rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
      <div className="flex items-center flex-1">
        <input
          type="checkbox"
          checked={completed}
          onChange={() => onToggle(id)}
          className="w-5 h-5 mr-3 rounded-full border-2 border-gray-300 focus:ring-2 focus:ring-blue-500 cursor-pointer"
        />
        {isEditing ? (
          <input
            type="text"
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            onKeyDown={handleKeyDown}
            className="flex-1 p-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            autoFocus
          />
        ) : (
          <span className={`flex-1 ${completed ? 'line-through text-gray-400' : ''}`}>
            {text}
          </span>
        )}
      </div>
      <div className="flex space-x-2">
        <button
          onClick={handleEdit}
          className="text-blue-500 hover:text-blue-700 focus:outline-none"
        >
          {isEditing ? 'Save' : 'Edit'}
        </button>
        <button
          onClick={() => onDelete(id)}
          className="text-red-500 hover:text-red-700 focus:outline-none"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default Todo; 