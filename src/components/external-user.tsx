import { useEffect } from "react";
import { createSignal, signalEffect } from "../utilities/signal.utility";

const countSignal = createSignal(0);

export const userSignal = createSignal({
  name: "John Doe",
  age: 42,
  address: {
    street: "123 Main St",
    city: "New York",
    state: "NY",
    zip: "10001",
  },
});

export const handleUpdateName = (name: string) => {
  userSignal.value.name = name;
};

export const handleUpdateStreet = (street: string) => {
  userSignal.value.address.street = street;
};

signalEffect(() => {
  console.log("test infinite loop");
  userSignal.value.name = "Jane Doe";
});

signalEffect(() => {
  console.log("updated external user in signal effect", userSignal.value);
});

signalEffect(() => {
  console.log("updated external count in signal effect", countSignal.value);
});

const ExternalUser = () => {
  const user = userSignal.useStateAdapter();
  const count = countSignal.useStateAdapter();

  useEffect(() => {
    console.log("updated external user in use effect");
  }, [user.value]);

  useEffect(() => {
    console.log("updated external count in use effect");
  }, [count.value]);

  return (
    <div>
      <div>
        <br />
        <p>External</p>
        <p>Count: {count.value}</p>
        <button onClick={() => count.value++}>Increment</button>
      </div>
      <h2>External User</h2>
      <div>
        <label>Name</label>
        <input
          value={user.value.name}
          onChange={(e) => handleUpdateName(e.target.value)}
        />
      </div>
      <div>
        <label>Street</label>
        <input
          value={user.value.address.street}
          onChange={(e) => handleUpdateStreet(e.target.value)}
        />
      </div>
    </div>
  );
};

export default ExternalUser;
