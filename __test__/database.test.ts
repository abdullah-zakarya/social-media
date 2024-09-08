// import { User, Follow, Post, Comment, Like } from './'
import dotenv from "dotenv";
import Database from "../dataStore/Postgers";
import { User, Follow, Post, Comment, Like } from "../types";
dotenv.config();
const db = new Database();
db.connet();

describe("Database Operations", () => {
  let userId : number ;  
  const user: User = {
    userName: "User-One",
    password: "password",
    email: "user1@example.com",
    bio: "This is user one",
    photo: "photo_url",
    name: "User One",
  };
  // const a = await setTimeout(() => 1, 4);
  it("should allow us to add a user", async () => {
    const createdUser = await db.createUser(user);
    expect(createdUser).toBeDefined();
    console.log(createdUser);
    userId = user.userID = createdUser?.userID || 0;
    expect(createdUser!.userName).toBe(user.userName);
    expect(createdUser!.email).toBe(user.email);
  });

  it('should not throw erorr if we create user with the same value it should be uniqe'){

  }

  // it("should allow us to retrieve the user by ID", async () => {
  //   const fetchedUser = await db.getUserById(user.userID || 0);
  //   expect(fetchedUser).toBeDefined();
  //   expect(fetchedUser!.userName).toBe(user.userName);
  //   expect(fetchedUser!.email).toBe(user.email);
  // });

  afterAll(async () => {
    await db.deleteUser(user.userID!);
    // db.end();
  });
});

// db.end();
