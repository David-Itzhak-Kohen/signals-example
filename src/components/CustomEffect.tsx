import { useEffect, useState } from "react";
import useCustomEffect from "../hooks/custom-effect";

const CustomEffect = () => {
  const [count, setCount] = useState(0);

  useCustomEffect(() => {
    console.log("useCustomEffect");

    return () => {
      console.log("cleanup");
    };
  });

  return (
    <div>
      <h1>Custom Effect</h1>
      <p>{count}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  );
};

export default CustomEffect;
