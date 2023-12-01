import { IUser, MOCK_USERS } from "../mock/user.mock";
import { delay } from "../utilities/delay.utility";

class UserService {
  async findAll(): Promise<IUser[]> {
    console.log("get all users");
    await delay(500);
    return MOCK_USERS;
  }

  async findById(id: number): Promise<IUser | null> {
    console.log("get user by id", id);
    await delay(500);
    return MOCK_USERS.find((user) => user.id === id) || null;
  }
}

export const userService = new UserService();
