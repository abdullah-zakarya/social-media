import { User } from "../types";
export default interface IUser {
  createUser(user: User): Promise<User | undefined>;
  getUserById(id: string): Promise<User | undefined>;
  getUserByUsername(id: string): Promise<User | undefined>;
  getUserByEmail(Email: string): Promise<User | undefined>;
  deleteUser(id: string): Promise<void>;
  updateUser(id: string, user: User): Promise<User | undefined>;
}
