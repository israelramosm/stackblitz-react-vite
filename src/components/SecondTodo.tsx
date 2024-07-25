import { useEffect, useState } from 'react';

interface Todos {
  id: number;
  value: string;
  active: boolean;
}

type Filter = 'all' | 'active' | 'completed';
type Action = 'add' | 'edit';

function SecondTodo() {
  const [value, setValue] = useState('');
  const [todoList, setTodoList] = useState<Array<Todos> | []>([]);
  const [currenTodo, setCurrentTodo] = useState<Todos | null>();
  const [action, setAction] = useState<Action>('add');
  const [filter, setFilter] = useState<Filter>('all');
  const [todoFilterList, setTodoFilterList] = useState<Array<Todos> | []>([]);

  const handleInputChange = ({ target }: { target: HTMLInputElement }) =>
    setValue(target.value);

  const handleClickUpdateTodo = (todo: Todos) => {
    setValue(todo.value);
    setAction('edit');
    setCurrentTodo(todo);
  };

  const handleAddTodo = () => {
    setTodoList((prev) => [
      ...prev,
      { id: Math.floor(Math.random() * 100), value, active: true },
    ]);
    setValue('');
  };

  const handleUpdateTodo = () => {
    setTodoList((prev) =>
      prev.map((todo) => {
        if (todo.id === currenTodo?.id) {
          return { ...currenTodo, value };
        }
        return todo;
      })
    );
    setAction('add');
    setCurrentTodo(null);
    setValue('');
  };

  const handleDeleteTodo = (id: number) => {
    setTodoList((prev) => prev.filter((todo) => todo.id !== id));
  };

  const handleCompletedTodo = (todo: Todos) => {
    setTodoList((prev) =>
      prev.map((t) => {
        if (t.id === todo.id) return { ...todo, active: false };
        return t;
      })
    );
  };

  const handleTodoFilter = (f: Filter) => {
    setFilter(f);
    switch (f) {
      case 'active':
        setTodoFilterList(todoList.filter((todo) => todo.active));
        break;
      case 'completed':
        setTodoFilterList(todoList.filter((todo) => !todo.active));
        break;
      default:
        setTodoFilterList(todoList);
        break;
    }
  };

  useEffect(() => {
    handleTodoFilter(filter);
  }, [todoList]);

  return (
    <>
      <input value={value} onChange={handleInputChange}></input>
      <button
        onClick={() =>
          action === 'add' ? handleAddTodo() : handleUpdateTodo()
        }
        disabled={value === ''}
      >
        {action === 'add' ? 'Add' : 'Update'}
      </button>

      <div>
        <button
          onClick={() => handleTodoFilter('all')}
          style={{ backgroundColor: filter === 'all' ? 'green' : '' }}
        >
          All
        </button>
        <button
          onClick={() => handleTodoFilter('active')}
          style={{ backgroundColor: filter === 'active' ? 'green' : '' }}
        >
          Active
        </button>
        <button
          onClick={() => handleTodoFilter('completed')}
          style={{ backgroundColor: filter === 'completed' ? 'green' : '' }}
        >
          Completed
        </button>
      </div>
      <ul>
        {todoFilterList.map((todo, i) => (
          <li key={i}>
            <p style={{ textDecoration: todo.active ? '' : 'line-through' }}>
              {todo.value}
            </p>
            <button onClick={() => handleDeleteTodo(todo.id)}>delete</button>
            {todo.active && (
              <>
                <button onClick={() => handleClickUpdateTodo(todo)}>
                  edit
                </button>
                <button onClick={() => handleCompletedTodo(todo)}>
                  completed
                </button>
              </>
            )}
          </li>
        ))}
      </ul>
    </>
  );
}

export default SecondTodo;
