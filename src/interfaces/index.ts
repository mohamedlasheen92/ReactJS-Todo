export interface IRegisterInput {
  name: "username" | "email" | "password";
  placeholder: string;
}
export interface ILoginInput {
  name: "identifier" | "password";
  placeholder: string;
}

export interface IErrorResponse {
  error: {
    message: string;
  };
}

export interface ITodo {
  id: number;
  documentId: string;
  title: string;
  description?: string;
}
