type User = {
  id: number;
  name: string;
  email: string;
  password: string;
  roleId?: number | number[];
  roles?: string[];
};

export type { User };