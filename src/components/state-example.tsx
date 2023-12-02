import { useEffect, useState } from "react";
import { ITodo, MOCK_TODOS } from "../mock/todos.mock";

const StateExample = () => {
  const [todos, setTodos] = useState<ITodo[]>(MOCK_TODOS);

  useEffect(() => {
    console.log("todos changed");
  }, [todos]);

  const handleEditTodoName = (id: number, name: string) => {
    const todo = todos.find((todo) => todo.id == id);

    if (todo) {
      todo.title = name;
    }

    setTodos(todos);
  };

  return (
    <div>
      <h2>State Example</h2>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            <input
              value={todo.title}
              onChange={(e) => handleEditTodoName(todo.id, e.target.value)}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default StateExample;
