import { User } from "../types";
export default interface IUser {
  createUser(user: User): Promise<User | undefined>;
  getUserById(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  getUserByEmail(Email: string): Promise<User | undefined>;
  deleteUser(id: number): Promise<void>;
  updateUser(id: number, user: object): Promise<User | undefined>;
}
