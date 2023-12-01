export interface ITodo {
  id: number;
  title: string;
  completed: boolean;
}

export const MOCK_TODOS: ITodo[] = [
  {
    id: 1,
    title: "Todo 1",
    completed: false,
  },
  {
    id: 2,
    title: "Todo 2",
    completed: true,
  },
  {
    id: 3,
    title: "Todo 3",
    completed: false,
  },
  {
    id: 4,
    title: "Todo 4",
    completed: false,
  },
];
