import { useEffect } from "react";
import { createSignal, signalEffect } from "../utilities/signal.utility";

const userSignal = createSignal({
  name: "John",
  age: 20,
  address: {
    street: "123 Main St",
    city: "Anytown",
    state: "CA",
    zip: "12345",
  },
});

const handleClick = () => {
  userSignal.value.name = "Jane";
  userSignal.value.age = 21;
  userSignal.value.address.street = "456 Main St";
};

signalEffect(() => {
  console.log("user changed in signalEffect", userSignal.value);
});

const BatchExample = () => {
  const user = userSignal.useStateAdapter();

  useEffect(() => {
    console.log("user changed in useEffect", user.value);
  }, [user]);

  return (
    <div>
      <h1>Batch Example</h1>
      <button onClick={handleClick}>Change User</button>
    </div>
  );
};

export default BatchExample;
