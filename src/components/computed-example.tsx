import { useEffect } from "react";
import {
  createSignal,
  signalEffect,
  computedSignal,
} from "../utilities/signal.utility";

const x = createSignal(0);
const y = createSignal(0);

const sum = computedSignal(() => x.value + y.value);

signalEffect(() => {
  console.log("x changed", x.value);
});

signalEffect(() => {
  console.log("y changed", y.value);
});

signalEffect(() => {
  console.log("sum changed", sum.value);
});

const handleMutate = () => {
  sum.value++;
};

const ComputedExample = () => {
  const sumSignal = sum.useStateAdapter();

  useEffect(() => {
    console.log("sum changed in useEffect", sumSignal.value);
  }, [sumSignal]);

  return (
    <div>
      <h1>Computed Example</h1>
      <p>
        x: {x.value}, y: {y.value}, sum: {sumSignal.value}
      </p>
      <button onClick={() => x.value++}>Increment x</button>
      <button onClick={() => y.value++}>Increment y</button>
      <button onClick={handleMutate}>Mutate sum</button>
    </div>
  );
};

export default ComputedExample;
