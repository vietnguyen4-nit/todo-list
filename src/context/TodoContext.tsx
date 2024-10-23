import React, { createContext, useReducer, useEffect, ReactNode } from 'react';
import { getTodos, setTodos } from '../services/Todo';

export interface TodoItem {
  id: string;
  label: string;
  completed: boolean;
}

interface AddTodoAction {
  type: 'ADD_TODO';
  payload: TodoItem;
}

interface UpdateTodoAction {
  type: 'UPDATE_TODO';
  payload: { id: string; label: string };
}

interface RemoveTodoAction {
  type: 'REMOVE_TODO';
  payload: string;
}

interface RemoveCompletedTodosAction {
  type: 'REMOVE_COMPLETED_TODOS';
}

interface ToggleCompletedTodoAction {
  type: 'TOGGLE_COMPLETED';
  payload: string;
}

type TodoAction =
  | AddTodoAction
  | UpdateTodoAction
  | RemoveTodoAction
  | ToggleCompletedTodoAction
  | RemoveCompletedTodosAction;

const todoReducer = (state: TodoItem[], action: TodoAction): TodoItem[] => {
  switch (action.type) {
    case 'ADD_TODO':
      return [...state, action.payload];
    case 'REMOVE_TODO':
      return state.filter((todo) => todo.id !== action.payload);
    case 'UPDATE_TODO':
      const { id, label } = action.payload;
      return state.map((todo) =>
        todo.id === id ? { ...todo, label: label } : todo
      );
    case 'TOGGLE_COMPLETED':
      return state.map((todo) =>
        todo.id === action.payload
          ? { ...todo, completed: !todo.completed }
          : todo
      );
    case 'REMOVE_COMPLETED_TODOS':
      return state.filter((todo) => !todo.completed);
    default:
      return state;
  }
};

const TodoContext = createContext<{
  state: TodoItem[];
  dispatch: React.Dispatch<TodoAction>;
}>({
  state: [],
  dispatch: () => {},
});

const TodoProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(todoReducer, [], () => {
    return getTodos();
  });

  useEffect(() => {
    setTodos(state);
  }, [state]);

  return (
    <TodoContext.Provider value={{ state, dispatch }}>
      {children}
    </TodoContext.Provider>
  );
};

export { TodoContext, TodoProvider };
