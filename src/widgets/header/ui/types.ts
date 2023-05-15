export type User = {
  obj:
    | {
        id: number;
        exp: number;
        iat: number;
        email: string;
        password: string;
        role: string;
      }
    | unknown;
};
