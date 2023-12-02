import ComplexState from "./components/complex-state";
import StateExample from "./components/state-example";
import InternalTodos from "./components/internal-todos";
import ExternalTodos from "./components/external-todos";
import ExternalCounter from "./components/external-counter";
import InternalCounter from "./components/internal-counter";

function App() {
  return <StateExample />;

  return (
    <>
      <ExternalCounter />
      <InternalCounter />
      <ExternalTodos />
      <InternalTodos />
    </>
  );
}

export default App;
