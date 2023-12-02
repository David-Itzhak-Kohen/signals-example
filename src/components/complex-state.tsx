import { useEffect } from "react";
import { IItem } from "../interfaces/item.interface";
import { ISack } from "../interfaces/sack.interface";
import { sackService } from "../services/sack.service";
import { itemService } from "../services/items.service";
import { createSignal } from "../utilities/signal.utility";

interface IComplexState {
  sack: ISack | null;
  items: IItem[];
}

const componentState = createSignal<IComplexState>({
  sack: null,
  items: [],
});

const updateSackName = (name: string) => {
  if (componentState.value.sack) {
    componentState.value.sack.name = name;
  }
};

const updateItemName = (id: string, name: string) => {
  const item = componentState.value.items.find((item) => item.id == id);
  console.log("item", item);

  if (item) {
    item.name = name;
  }
};

const ComplexState = () => {
  const state = componentState.useStateAdapter();

  useEffect(() => {
    console.log("ComplexState mounted");
    sackService.getActiveSack().then((sack) => {
      console.log("set sack", sack);
      state.value.sack = sack;
    });
  }, []);

  useEffect(() => {
    console.log("sack changed", state.value.sack);

    if (state.value.sack) {
      itemService.getBySackId(state.value.sack.id).then((items) => {
        state.value.items = items;
      });
    }
  }, [state.value.sack?.id]);

  useEffect(() => {
    console.log("sack value changed", state.value.sack);
  }, [state.value.sack]);

  useEffect(() => {
    console.log("items changed", state.value.items);
  }, [state.value.items]);

  useEffect(() => {
    console.log("items length changed", state.value.items.length);
  }, [state.value.items.length]);

  useEffect(() => {
    console.log("state value changed", state.value);
  }, [state.value]);

  useEffect(() => {
    console.log("state changed", state);
  }, [state]);

  return (
    <div>
      {state.value.sack && (
        <div>
          <h1>{state.value.sack.name}</h1>
          <input
            type="text"
            value={state.value.sack.name}
            onChange={(e) => updateSackName(e.target.value)}
          />
        </div>
      )}

      <h2>Items</h2>
      <ul>
        {state.value.items.map((item) => (
          <li key={item.id}>
            {item.name}
            <input
              type="text"
              value={item.name}
              onChange={(e) => updateItemName(item.id, e.target.value)}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ComplexState;
