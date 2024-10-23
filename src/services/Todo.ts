import { TodoItem } from "../context/TodoContext";

export const getTodos = (): TodoItem[] => {
  const todoRaw = localStorage.getItem('todos');
  return todoRaw ? (JSON.parse(todoRaw) as TodoItem[]) : [];
};

export const setTodos = (todos: TodoItem[]) => {
  localStorage.setItem('todos', JSON.stringify(todos));
};
