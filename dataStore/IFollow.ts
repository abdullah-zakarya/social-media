import { Follow, User } from "../types";
export default interface IFollow {
  createFollow(user: Follow): Promise<Follow | undefined>;
  deleteFollow(followeeID: string, followerID: string): Promise<void>;
  listFollower(followeeID: string): Promise<User[]>;
  listFollowee(followerID: string): Promise<User[]>;
}
