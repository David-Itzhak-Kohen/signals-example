import { MOCK_TODOS } from "../mock/todos.mock";
import { delay } from "../utilities/delay.utility";

class TodosService {
  async getAll() {
    console.log("get all todos");
    await delay(500);
    return MOCK_TODOS;
  }

  async getById(id: number) {
    console.log("get todo by id", id);
    await delay(500);
    return MOCK_TODOS.find((todo) => todo.id === id) || null;
  }
}

export const todosService = new TodosService();
