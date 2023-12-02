import ExternalUser from "./components/external-user";
import InternalUser from "./components/internal-user";
import InternalTodos from "./components/internal-todos";
import ExternalTodos from "./components/external-todos";

function App() {
  return (
    <>
      <ExternalTodos />
      <InternalTodos />
      <InternalUser />
      <ExternalUser />
    </>
  );
}

export default App;
