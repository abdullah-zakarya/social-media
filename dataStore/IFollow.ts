import { Follow, User } from "../types";
export default interface IFollow {
  createFollow(user: Follow): Follow | undefined;
  deleteFollow(id: string): Follow | undefined;
  listFollower(followeeID: string): User[];
  listFollowee(followerID: string): User[];
}
