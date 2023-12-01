import { createSignal } from "../utilities/signal.utility";

const countSignal = createSignal(0);

const ExternalCounter = () => {
  const count = countSignal.useStateAdapter();

  return (
    <>
      <div>
        <br />
        <p>External</p>
        <p>Count: {count.value}</p>
        <button onClick={() => count.value++}>Increment</button>
      </div>
    </>
  );
};

export default ExternalCounter;
