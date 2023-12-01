import { IUser, MOCK_USERS } from "../mock/user.mock";
import { delay } from "../utilities/delay.utility";

class UserService {
  async findAll(): Promise<IUser[]> {
    await delay(500);
    return MOCK_USERS;
  }

  async findById(id: number): Promise<IUser | null> {
    await delay(500);
    return MOCK_USERS.find((user) => user.id === id) || null;
  }
}

export const userService = new UserService();
