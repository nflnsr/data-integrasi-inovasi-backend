type EmployeeType = {
  id: string;
  image: string;
  name: string;
  phone: string;
  position: string;
  division: {
    id: string;
    name: string;
  };
};

export type { EmployeeType };