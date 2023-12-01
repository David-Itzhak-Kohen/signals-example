import { useSignal } from "../utilities/signal.utility";

const InternalCounter = () => {
  const count = useSignal(0);

  return (
    <>
      <div>
        <br />
        <p>Internal</p>
        <p>Count: {count.value}</p>
        <button onClick={() => count.value++}>Increment</button>
      </div>
    </>
  );
};

export default InternalCounter;
