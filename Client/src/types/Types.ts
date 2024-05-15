export interface Users {
  id: number;
  image: string;
  name: string;
  email: string;
  number: string;
  DateOfBirth: string;
}

export type dom= {
  form:boolean;
  delete:boolean;
}

export type UserType = {
  data: Users[];
};

export type Data={
  inputs:{
    image: string;
  name: string;
  email: string;
  number: string;
  DateOfBirth: string;
  }
}