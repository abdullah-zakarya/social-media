import { Comment, Post, Like, User, Follow } from "../../types";
import DataModel from "../DataMudel";
import { Pool } from "pg";

class pgDataBase {
  private static instance: Pool | null = null;

  public static getInstance(): Pool {
    if (!this.instance) this.instance = new Pool();
    return this.instance;
  }
}

class Database implements DataModel {
  pool: Pool;

  constructor() {
    this.pool = pgDataBase.getInstance(); // استخدم Singleton بدلًا من new Pool()
  }

  // ================== User Methods ==================
  async createUser(user: User): Promise<User | undefined> {
    return await this.insertFactor(user, "user");
  }

  async getUserById(id: string): Promise<User | undefined> {
    const query = `SELECT * FROM users WHERE userID = $1`;
    const result = await this.pool.query(query, [id]);
    return result.rows[0];
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const query = `SELECT * FROM users WHERE username = $1`;
    const result = await this.pool.query(query, [username]);
    return result.rows[0];
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    const query = `SELECT * FROM users WHERE email = $1`;
    const result = await this.pool.query(query, [email]);
    return result.rows[0];
  }

  async deleteUser(id: number): Promise<void> {
    return await this.deleteFactor(id, "user");
  }

  async updateUser(id: number, user: User): Promise<User | undefined> {
    return await this.updateFactor(id, "user", user); 
  }

  // ================== Follow Methods ==================
  async createFollow(follow: Follow): Promise<Follow | undefined> {
    return await this.insertFactor(follow, "follow");
  }

  async deleteFollow(followeenumber number, followerID: number): Promise<void> {
    await this.pool.query(
      `DELETE FROM follows WHERE followeeID = $1 AND followerID = $2`,
      [followeeID, followerID]
    );
  }

  async listFollower(followeeID: string): Promise<User[]> {
    const query = `SELECT * FROM follows WHERE followeeID = $1`;
    const result = await this.pool.query(query, [followeeID]);
    return result.rows;
  }

  async listFollowee(followerID: number): Promise<User[]> {
    const query = `SELECT * FROM follows WHERE followerID = $1`;
    const result = await this.pool.query(query, [followerID]);
    return result.rows;
  }

  // ================== Post Methods ==================
  async createPost(post: Post): Promise<Post | undefined> {
    return await this.insertFactor(post, "post");
  }

  async getPost(id: string): Promise<Post | undefined> {
    const query = `SELECT * FROM posts WHERE postID = $1`;
    const result = await this.pool.query(query, [id]);
    return result.rows[0];
  }

  async deletePost(id: number): Promise<void> {
    return await this.deleteFactor(id, "post");
  }

  async updatePost(id: string, post: Post): Promise<Post | undefined> {
    return await this.updateFactor(id, "post", post); 
  }

  // ================== Comment Methods ==================
  async createComment(comment: Comment): Promise<Comment | undefined> {
    return await this.insertFactor(comment, "comment");
  }

  async getComment(id: number): Promise<Comment | undefined> {
    const query = `SELECT * FROM comments WHERE commentID = $1`;
    const result = await this.pool.query(query, [id]);
    return result.rows[0];
  }

  async listComments(postID: number): Promise<Comment[]> {
    const query = `SELECT * FROM comments WHERE postID = $1`;
    const result = await this.pool.query(query, [postID]);
    return result.rows;
  }

  async deleteComment(id: number): Promise<void> {
    return await this.deleteFactor(id, "comment");
  }

  async updateComment(
    id: string,
    comment: Comment
  ): Promise<Comment | undefined> {
    return await this.updateFactor(id, "comment", comment); 
  }

  // ================== Like Methods ==================
  async createLike(like: Like): Promise<Like | undefined> {
    return await this.insertFactor(like, "like");
  }

  async deleteLike(postId: number, userId: number): Promise<void> {
    await this.pool.query(
      `DELETE FROM likes WHERE postID = $1 AND userID = $2`,
      [postId, userId]
    );
  }

  // ================== General CRUD Helpers ==================
  private async insertFactor(obj: any, table: string): Promise<typeof obj> {
    const keys = Object.keys(obj).join(", ");
    const values = Object.values(obj);
    const symbols = values.map((_, i) => `$${i + 1}`).join(", ");
    const query = `INSERT INTO ${table}s (${keys}) VALUES (${symbols}) RETURNING *`;
    const result = await this.pool.query(query, values);
    return result.rows[0];
  }

  private async deleteFactor(id: number, table: string): Promise<void> {
    const query = `DELETE FROM ${table}s WHERE ${table}ID = $1`;
    await this.pool.query(query, [id]);
  }

  private async updateFactor(
    id: number,
    table: string,
    obj: any
  ): Promise<typeof obj | undefined> {
    const keys = Object.keys(obj)
      .map((key, i) => `${key} = $${i + 1}`)
      .join(", ");
    const values = Object.values(obj);
    const query = `UPDATE ${table}s SET ${keys} WHERE ${table}ID = $${
      values.length + 1
    } RETURNING *`;
    values.push(id);
    const result = await this.pool.query(query, values);
    return result.rows[0];
  }
}

export default Database;

// export default database;
