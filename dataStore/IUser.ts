import { User } from "../types";
export default interface IUser {
  createUser(user: User): User | undefined;
  getUser(id: string): User | undefined;
  deleteUser(id: string): User | undefined;
  updateUser(id: string): User | undefined;
}
