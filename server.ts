import exprss from "express";
import dotenv from "dotenv";
dotenv.config();
// import {Pool} from "pg";
import { Client } from "pg";
const client = new Client();

const main = async (): Promise<void> => {
  await client.connect();
  const date = await client.query("select now()");
  console.log(date.rows[0].now);
};
main();

const testing = async () => {
  const values: string[] = ["sami", "sami@gmail.com", "sami samoaa"];
  const query = "INSERT INTO users(name, password, email) VALUES($1, $2, $3)";
  const user = await client.query(query, values);
  console.log(user);

  const users = await client.query("SELECT * FROM users");
  console.log("\n\n\n\n\n", users.rows);
};

testing();
