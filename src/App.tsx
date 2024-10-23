import './App.css';
import Footer from './components/Footer';
import TodoList from './components/TodoList';
import { TodoProvider } from './context/TodoContext';

function App() {
  return (
    <TodoProvider>
      <TodoList />
      <Footer />
    </TodoProvider>
  );
}

export default App;
