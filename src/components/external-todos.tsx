import { useEffect } from "react";
import { ITodo } from "../mock/todos.mock";
import { createSignal } from "../utilities/signal.utility";
import { todosService } from "../services/todos.service";

const todosSignal = createSignal<ITodo[]>([]);

const updateIsDone = (id: number, isDone: boolean) => {
  todosSignal.value = todosSignal.value.map((todo) =>
    todo.id === id ? { ...todo, isDone } : todo
  );
};

const ExternalTodos = () => {
  const todos = todosSignal.useStateAdapter();

  useEffect(() => {
    todosService.getAll().then((todos) => {
      todosSignal.value = todos;
    });
  }, []);

  useEffect(() => {
    console.log("external todos updated", todos.value);
  }, [todos.value]);

  return (
    <>
      <div>
        <br />
        <p>External Todos</p>
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

export default ExternalTodos;
