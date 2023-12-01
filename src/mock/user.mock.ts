export interface IUser {
  id: number;
  name: string;
  conact: {
    email?: string;
    phone?: string;
  };
}

export const MOCK_USERS: IUser[] = [
  {
    id: 1,
    name: "User 1",
    conact: {
      email: "test@example.com",
    },
  },
  {
    id: 2,
    name: "User 2",
    conact: {
      phone: "1234567890",
    },
  },
  {
    id: 3,
    name: "User 3",
    conact: {},
  },
];
