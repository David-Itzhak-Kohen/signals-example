import { MOCK_TODOS } from "../mock/todos.mock";
import { delay } from "../utilities/delay.utility";

class TodosService {
  async getAll() {
    await delay(500);
    return MOCK_TODOS;
  }

  async getById(id: number) {
    await delay(500);
    return MOCK_TODOS.find((todo) => todo.id === id) || null;
  }
}

export const todosService = new TodosService();
