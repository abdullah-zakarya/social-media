import { Follow, User } from "../types";
export default interface IFollow {
  createFollow(user: Follow): Promise<Follow | undefined>;
  deleteFollow(followeeID: number, followerID: number): Promise<void>;
  listFollower(followeeID: number): Promise<User[]>;
  listFollowee(followerID: number): Promise<User[]>;
}
