import { createSignal, signalEffect } from "../utilities/signal.utility";

const todosStore = createSignal([
  { id: 1, text: "Learn React", completed: false },
  { id: 3, text: "Learn GraphQL", completed: false },
  { id: 2, text: "Learn TypeScript", completed: false },
]);

const handleAdd = () => {
  todosStore.value = [
    ...todosStore.value,
    {
      id: Math.random(),
      text: "Learn Svelte",
      completed: false,
    },
  ];
};

const handleRemove = (id: number) => {
  todosStore.value = todosStore.value.filter((todo) => todo.id !== id);
};

signalEffect(() => {
  todosStore.value;
  console.log("todosStore.value", todosStore.peek());
});

const DereferenceExample = () => {
  const todos = todosStore.useStateAdapter();

  return (
    <div>
      <h1>Dereference Example</h1>
      <ul>
        {todos.value.map((todo) => (
          <li key={todo.id}>
            <button onClick={() => handleRemove(todo.id)}>X</button>
            <span>{todo.text}</span>
          </li>
        ))}
      </ul>
      <button onClick={handleAdd}>Add</button>
      <button onClick={todos.reset}>Reset</button>
    </div>
  );
};

export default DereferenceExample;
