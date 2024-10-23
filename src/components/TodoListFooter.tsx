export const filters = ['', 'active', 'complete'];

const TodoListFooter = ({
  onClearComplete,
  activeItemCount,
  completedItemCount,
  filter,
}: {
  filter: string;
  onClearComplete: () => void;
  activeItemCount: number;
  completedItemCount: number;
}) => {
  return (
    <footer className="footer">
      <span className="todo-count">
        {activeItemCount} item{activeItemCount > 1 ? 's' : ''} left!
      </span>
      <ul className="filters">
        {filters.map((f) => (
          <li key={f}>
            <a className={`filter-text ${f === filter ? 'selected' : ''}`} href={`#/${f}`}>
              {f === '' ? 'all' : f}
            </a>
          </li>
        ))}
      </ul>
      <button
        className="clear-completed"
        onClick={onClearComplete}
        disabled={completedItemCount <= 0}
      >
        Clear completed
      </button>
    </footer>
  );
};

export default TodoListFooter;
