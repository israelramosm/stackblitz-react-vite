import { useEffect, useState } from 'react';

// https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,litecoin&vs_currencies=usd

interface Todos {
  id?: number;
  text?: string;
  completed?: boolean;
}

type Filter = 'all' | 'completed' | 'active';
type Action = 'add' | 'edit';

function FirstTodo() {
  const [todo, setTodo] = useState('');
  const [editTodo, setEditTodo] = useState<Todos>({});
  const [todoList, setTodoList] = useState<Array<Todos> | []>([]);
  const [filteredList, setFilteredList] = useState<Array<Todos> | []>([]);
  const [filter, setFilter] = useState<Filter>('all');
  const [action, setAction] = useState<Action>('add');

  const handleOnChangeTodo = ({ target }: { target: any }) =>
    setTodo(target.value);

  const handleActionTodo = () => {
    if (todo !== '') {
      if (action === 'add')
        setTodoList((prev) => [
          ...prev,
          {
            id: Math.floor(Math.random() * 100),
            text: todo,
            completed: false,
          },
        ]);

      if (action === 'edit') {
        console.log('edit', { todo, editTodo });
        setTodoList((prev) => [
          ...prev.map((ele) => {
            if (ele.id === editTodo.id) return { ...editTodo, text: todo };
            return ele;
          }),
        ]);
        setAction('add');
      }
    }
    setTodo('');
  };

  const handleDeleteTodo = (id: number | undefined) => {
    setTodoList((prev) => prev.filter((ele) => ele.id !== id));
  };

  const handleEditTodo = (ele: Todos) => {
    console.log('edit', ele);
    setAction('edit');
    setTodo(ele.text);
    setEditTodo(ele);
  };

  const handleCompleteTodo = (id: number | undefined) => {
    setTodoList((prev) => [
      ...prev.map((ele) => {
        if (ele.id === id) {
          return {
            ...ele,
            completed: true,
          };
        }

        return ele;
      }),
    ]);
  };

  const handleFilterState = (state: Filter) => {
    console.log(state);
    setFilter(state);
    switch (state) {
      case 'active':
        setFilteredList(todoList.filter((ele) => !ele.completed));
        break;
      case 'completed':
        setFilteredList(todoList.filter((ele) => ele.completed));
        break;
      default:
        setFilteredList(todoList);
    }
  };

  useEffect(() => {
    console.log(todo);
    handleFilterState(filter);
  }, [todoList]);

  return (
    <>
      <input type="text" onChange={handleOnChangeTodo} value={todo}></input>
      <button onClick={handleActionTodo}>
        {action === 'add' ? 'Add' : 'Update'}
      </button>

      <div>
        <button
          style={{ backgroundColor: filter === 'all' ? 'green' : 'inherit' }}
          onClick={() => handleFilterState('all')}
        >
          All
        </button>
        <button
          style={{
            backgroundColor: filter === 'completed' ? 'green' : 'inherit',
          }}
          onClick={() => handleFilterState('completed')}
        >
          Completed
        </button>
        <button
          style={{ backgroundColor: filter === 'active' ? 'green' : 'inherit' }}
          onClick={() => handleFilterState('active')}
        >
          Active
        </button>
      </div>

      <ul>
        {filteredList.map((ele, i) => {
          return (
            <li
              key={i}
              style={{ textDecoration: ele.completed ? 'line-through' : '' }}
            >
              <span>{ele.text}</span>
              <button onClick={() => handleDeleteTodo(ele.id)}>delete</button>

              {!ele.completed && (
                <>
                  <button onClick={() => handleEditTodo(ele)}>edit</button>
                  <button onClick={() => handleCompleteTodo(ele.id)}>
                    complete
                  </button>
                </>
              )}
            </li>
          );
        })}
      </ul>
    </>
  );
}

export default FirstTodo;
