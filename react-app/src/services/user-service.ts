import create from "./http-service";

const userService = create("/users");

export interface User {
  id: number;
  name: string;
}

export default userService;
