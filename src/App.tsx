import ExternalTodos from "./components/external-todos";
import ExternalCounter from "./components/external-counter";
import InternalCounter from "./components/internal-counter";

function App() {
  return (
    <>
      <ExternalCounter />
      <InternalCounter />
      <ExternalTodos />
    </>
  );
}

export default App;
