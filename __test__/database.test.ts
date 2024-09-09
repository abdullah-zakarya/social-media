// import { User, Follow, Post, Comment, Like } from './'
import dotenv from "dotenv";
import Database from "../dataStore/Postgers";
import { User, Follow, Post, Comment, Like } from "../types";
dotenv.config();
const db = new Database();
db.connet();

describe("Database User Operations", () => {
  let userid: number;
  const user: User = {
    username: "User-One",
    password: "password",
    email: "user1@example.com",
    bio: "This is user one",
    photo: "photo_url",
    name: "User One",
  };
  let another: User | undefined;
  it("should allow us to add a user", async () => {
    const createdUser = await db.createUser(user);
    expect(createdUser).toBeDefined();
    userid = user.userid = createdUser?.userid || 0;
    expect(createdUser!.username).toBe(user.username);
    expect(createdUser!.email).toBe(user.email);
  });

  it("should not throw error if we create user with the same value it should be unique", async () => {
    await expect(db.createUser(user)).rejects.toThrow();
  });

  it("should allow us to find the user by id", async () => {
    const fetchedUser = await db.getUserById(userid);
    expect(fetchedUser).toBeDefined();
    expect(fetchedUser!.username).toBe(user.username);
    expect(fetchedUser!.email).toBe(user.email);
  });

  it("should allow us to find the user by username", async () => {
    const fetchedUser = await db.getUserByUsername(user.username);
    expect(fetchedUser).toBeDefined();
    expect(fetchedUser!.username).toBe(user.username);
    expect(fetchedUser!.email).toBe(user.email);
  });

  it("should allow us to find the user by email", async () => {
    const fetchedUser = await db.getUserByEmail(user.email);
    expect(fetchedUser).toBeDefined();
    expect(fetchedUser!.username).toBe(user.username);
    expect(fetchedUser!.email).toBe(user.email);
  });

  it("should allow us to update the user information", async () => {
    const updatedUser = { bio: "Updated bio" };
    const result = await db.updateUser(userid, updatedUser);
    expect(result).toBeDefined();
    expect(result!.bio).toBe(updatedUser.bio);
  });

  it("should not allow us to update to a unique value if it is already used", async () => {
    const anotherUser = {
      username: "User-Two",
      password: "password",
      email: "user2@example.com",
      bio: "Another user",
      photo: "photo_url",
      name: "User Two",
    };
    another = await db.createUser(anotherUser);
    await expect(
      db.updateUser(userid, { username: anotherUser.username })
    ).rejects.toThrow(); // Assuming it should throw an error if the username is not unique
  });

  it("should allow us to delete the user", async () => {
    await db.deleteUser(userid);
    db.deleteUser(another?.userid!);
    const deletedUser = await db.getUserById(userid);
    expect(deletedUser).toBeUndefined();
  });
});

// === follow type = ===
// export interface Follow {
//   followerid: number;
//   followeeid: number;
// }

// ======= follow opration =====

// export default interface IFollow {
//   createFollow(user: Follow): Promise<Follow | undefined>;
//   deleteFollow(followeeID: number, followerID: number): Promise<void>;
//   listFollower(followeeID: number): Promise<User[]>;
//   listFollowee(followerID: number): Promise<User[]>;
// }

// ========= database
// CREATE TABLE follows (
// 	followerID INT,
// 	followeeID INT,
// 	PRIMARY KEY (followerID, followeeID),
// 	FOREIGN KEY (followerID) REFERENCES users(userID) ON DELETE CASCADE,
// 	FOREIGN KEY (followeeID) REFERENCES users(userID) ON DELETE CASCADE );

describe("follow opration", () => {
  let user1: User | undefined;
  let user2: User | undefined;
  let user3: User | undefined;
  let follow1: Follow | undefined;
  let follow2: Follow | undefined;
  it("initlize", async () => {
    user1 = await db.createUser({
      username: "ahmedBnAli",
      email: "ahmed@example.com",
      password: "password",
      name: "Ahemd",
    });
    user2 = await db.createUser({
      username: "mohammedBnAli",
      email: "mohammed@example.com",
      password: "password",
      name: "mohammed",
    });
    user3 = await db.createUser({
      username: "saiedBnAli",
      email: "saied@example.com",
      password: "password",
      name: "saied",
    });
  });
  it("should allow us to create follow", async () => {
    follow1 = await db.createFollow({
      followeeid: user1?.userid!,
      followerid: user2?.userid!,
    });
    expect(follow1).toBeDefined();
    follow2 = await db.createFollow({
      followeeid: user1?.userid!,
      followerid: user3?.userid!,
    });
    expect(follow2).toBeDefined();
  });
  it("shoud show the followers", async () => {
    const followers = await db.listFollower(user1?.userid!);
    expect(followers).toStrictEqual([user2, user3]);
  });
  it("shoud show the followers", async () => {
    const followees = await db.listFollowee(user2?.userid!);
    const followees2 = await db.listFollowee(user3?.userid!);
    expect(followees).toStrictEqual([user1]);
    expect(followees2).toStrictEqual([user1]);
  });
  it("shold allow us to delete the follow", async () => {
    await db.deleteFollow(user1?.userid!, user2?.userid!);
    const followers = await db.listFollower(user1?.userid!);
    const followees = await db.listFollowee(user2?.userid!);
    expect(followers).toStrictEqual([user3]);
    expect(followees).toStrictEqual([]);
  });
  it("should allow us to add follow agian", async () => {
    follow1 = await db.createFollow({
      followeeid: user1?.userid!,
      followerid: user2?.userid!,
    });
    expect(follow1).toBeDefined();
  });
  it("shold delete the follow if follower deleted", async () => {
    await db.deleteUser(user2?.userid!);
    const followers = await db.listFollower(user1?.userid!);
    expect(followers.length).toBe(1);
  });
  it("should delete the follow if the followee deleted", async () => {
    await db.deleteUser(user1?.userid!);
    const followee = await db.listFollowee(user3?.userid!);
    expect(followee).toStrictEqual([]);
  });
  afterAll(() => {
    db.deleteUser(user3?.userid!);
  });
});
