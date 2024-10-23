import { useContext, useEffect, useMemo, useState } from 'react';
import { TodoContext, TodoItem } from '../context/TodoContext';
import Todo from './Todo';
import TodoInput from './TodoInput';
import TodoListFooter, { filters } from './TodoListFooter';

const TodoList = () => {
  const { state: todos, dispatch } = useContext(TodoContext);

  const [filter, setFilter] = useState(window.location.hash.substring(2));
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.substring(2);
      if (filters.includes(hash)) {
        setFilter(hash);
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => {
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, []);

  const addTodo = (text: string) => {
    const newTodo: TodoItem = {
      id: new Date().getTime() + '',
      label: text,
      completed: false,
    };
    dispatch({ type: 'ADD_TODO', payload: newTodo });
  };

  const updateTodo = (id: string, label: string) => {
    const payload = {
      id,
      label,
    };
    dispatch({ type: 'UPDATE_TODO', payload: payload });
  };

  const changeTodoStatus = (id: string) => {
    dispatch({ type: 'TOGGLE_COMPLETED', payload: id });
  };

  const removeTodo = (id: string) => {
    dispatch({ type: 'REMOVE_TODO', payload: id });
  };

  const removeCompletedTodos = () => {
    dispatch({ type: 'REMOVE_COMPLETED_TODOS' });
  };

  const filteredTodos = useMemo(() => {
    switch (filter) {
      case '':
        return todos;
      case 'active':
        return todos.filter((todo) => !todo.completed);
      case 'complete':
        return todos.filter((todo) => todo.completed);
      default:
        return todos;
    }
  }, [todos, filter]);

  const activeItemCount = useMemo(() => {
    return todos.filter((todo) => !todo.completed).length;
  }, [todos]);

  const completedItemCount = useMemo(() => {
    return todos.length - activeItemCount;
  }, [todos, activeItemCount]);

  return (
    <section className="todoapp" id="root">
      <header className="header">
        <h1>todos</h1>
        <TodoInput placeholder="What needs to be done?" onSubmit={addTodo} />
      </header>
      <main className="main">
        <ul className="todo-list">
          {filteredTodos.map((todo) => (
            <Todo
              todo={todo}
              onChange={changeTodoStatus}
              onRemove={removeTodo}
              onSubmitUpdate={updateTodo}
              key={todo.id}
            />
          ))}
        </ul>
      </main>
      {todos.length > 0 && (
        <TodoListFooter
          filter={filter}
          onClearComplete={removeCompletedTodos}
          completedItemCount={completedItemCount}
          activeItemCount={activeItemCount}
        />
      )}
    </section>
  );
};

export default TodoList;
