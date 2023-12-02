import { MOCK_SACK } from "../mock/sack.mock";
import { delay } from "../utilities/delay.utility";
import { ISack } from "../interfaces/sack.interface";

class SackService {
  async getActiveSack(): Promise<ISack> {
    console.log("get active sack");
    await delay(500);
    return MOCK_SACK;
  }
}

export const sackService = new SackService();
