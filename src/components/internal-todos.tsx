import { useEffect } from "react";
import { ITodo } from "../mock/todos.mock";
import { useSignal } from "../utilities/signal.utility";
import { todosService } from "../services/todos.service";

const InternalTodos = () => {
  const todos = useSignal<ITodo[]>([]);

  const updateIsDone = (id: number, isDone: boolean) => {
    todos.value = todos.value.map((todo) =>
      todo.id === id ? { ...todo, isDone } : todo
    );
  };

  useEffect(() => {
    todosService.getAll().then((result) => {
      todos.value = result;
    });
  }, []);

  useEffect(() => {
    console.log("internal todos updated", todos.value);
  }, [todos.value]);

  return (
    <>
      <div>
        <br />
        <p>Internal Todos</p>
        <ul>
          {todos.value.map((todo) => (
            <li key={todo.id}>
              {todo.title}
              <input
                type="checkbox"
                onChange={(e) => updateIsDone(1, e.target.checked)}
              />
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default InternalTodos;
