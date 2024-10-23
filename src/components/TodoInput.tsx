import React, { useEffect, useRef } from 'react';

const TodoInput = ({
  initialValue = '',
  onSubmit,
  onBlur,
  placeholder = '',
}: {
  initialValue?: string;
  placeholder?: string;
  onSubmit: (value: string) => void;
  onBlur?: () => void;
}) => {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current!.value = initialValue;
  }, []);

  const handleKeyUp: React.KeyboardEventHandler<HTMLInputElement> = (e) => {
    const value = e.currentTarget.value.trim()
    if (e.key === 'Enter' && value) {
      onSubmit(value);
      e.currentTarget.value = '';
    }
  };

  return (
    <div className="input-container">
      <input
        className="new-todo"
        id="todo-input"
        type="text"
        data-testid="text-input"
        placeholder={placeholder}
        onKeyUp={handleKeyUp}
        onBlur={onBlur}
        autoFocus
        ref={inputRef}
      />
      <label className="visually-hidden" htmlFor="todo-input">
        New Todo Input
      </label>
    </div>
  );
};

export default TodoInput;
