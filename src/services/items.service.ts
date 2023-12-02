import { MOCK_ITEMS } from "../mock/items.mock";
import { delay } from "../utilities/delay.utility";

class ItemService {
  async getBySackId(sackId: string) {
    console.log("get items by sack id", sackId);
    await delay(500);
    return MOCK_ITEMS.filter((item) => item.sackId === sackId);
  }
}

export const itemService = new ItemService();
