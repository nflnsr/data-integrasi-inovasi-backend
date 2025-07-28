type LoginType = {
  token: string;
  admin: {
    id: string;
    name: string;
    username: string;
    phone: string;
    email: string;
  };
};

export type { LoginType  };
