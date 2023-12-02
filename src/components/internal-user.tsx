import { useEffect } from "react";
import { useSignal } from "../utilities/signal.utility";

const InternalUser = () => {
  const count = useSignal(0);
  const user = useSignal({
    name: "John Doe",
    age: 42,
    address: {
      street: "123 Main St",
      city: "New York",
      state: "NY",
      zip: "10001",
    },
  });

  const handleUpdateName = (name: string) => {
    user.value.name = name;
  };

  const handleUpdateStreet = (street: string) => {
    user.value.address.street = street;
  };

  useEffect(() => {
    console.log("updated internal user in use effect");
  }, [user.value]);

  useEffect(() => {
    console.log("internal count updated in use effect");
  }, [count.value]);

  return (
    <>
      <div>
        <br />
        <p>Internal</p>
        <p>Count: {count.value}</p>
        <button onClick={() => count.value++}>Increment</button>
      </div>
      <div>
        <h2>Internal User</h2>
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
    </>
  );
};

export default InternalUser;
