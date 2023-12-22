import { useEffect } from "react";
import { createSignal } from "../utilities/signal.utility";

interface IMember {
  id: string;
  name: string;
  age: string;
}

type IState = Record<string, IMember>;

const membersSignal = createSignal<IState>({});

const DeleteExample = () => {
  const members = membersSignal.useStateAdapter();

  useEffect(() => {
    console.log("members", members.peek());
  }, [members.value]);

  const handleDelete = (id: string) => {
    if (members.value[id]) {
      delete members.value[id];
    }
  };

  const handleAdd = () => {
    const id = Math.random().toString(36).substr(2, 9);
    members.value[id] = {
      id,
      name: "",
      age: "",
    };
  };

  return (
    <div>
      <button onClick={handleAdd}>Add</button>
      <ul>
        {Object.values(members.value).map((member) => (
          <li key={member.id}>
            <input
              value={member.name}
              onChange={(e) => {
                member.name = e.target.value;
              }}
            />
            <input
              value={member.age}
              onChange={(e) => {
                member.age = e.target.value;
              }}
            />
            <button onClick={() => handleDelete(member.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DeleteExample;
