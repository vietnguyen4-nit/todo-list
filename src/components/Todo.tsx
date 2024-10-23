import React, { useState } from 'react';
import { TodoItem } from '../context/TodoContext';
import TodoInput from './TodoInput';

interface TodoProps {
  todo: TodoItem;
  onChange: (id: string) => void;
  onRemove: (id: string) => void;
  onSubmitUpdate: (id: string, value: string) => void;
}

const TodoList = ({ todo, onChange, onRemove, onSubmitUpdate }: TodoProps) => {
  const [isEdit, setIsEdit] = useState(false);

  return (
    <li className={todo.completed ? 'completed' : ''}>
      <div className="view">
        {!isEdit ? (
          <>
            <input
              className="toggle"
              type="checkbox"
              checked={todo.completed}
              onChange={() => onChange(todo.id)}
            />
            <label onDoubleClick={() => setIsEdit(true)}>{todo.label}</label>
            <button
              className="destroy"
              onClick={() => onRemove(todo.id)}
            ></button>
          </>
        ) : (
          <TodoInput
            initialValue={todo.label}
            onBlur={() => setIsEdit(false)}
            onSubmit={(e) => (onSubmitUpdate(todo.id, e), setIsEdit(false))}
          />
        )}
      </div>
    </li>
  );
};

export default TodoList;
