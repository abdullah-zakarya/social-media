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

// (async () => {
//   try {
//     await client.connect();
//     console.log("Connected to PostgreSQL database");

//     // تنفيذ استعلام
//     const result = await client.query("SELECT NOW()");
//     console.log("Current time:", result.rows[0].now);
//   } catch (error) {
//     if (error instanceof Error) {
//       // التعامل مع الخطأ ككائن Error
//       console.error("Error connecting to the database", error.stack);
//     } else {
//       // التعامل مع الأخطاء الأخرى
//       console.error("An unexpected error occurred", error);
//     }
//   } finally {
//     // إنهاء الاتصال
//     await client.end();
//   }
// })();

// async function getStudent() {
//   const student = await client.query("SElECT * from student");
//   console.log(student);
// }
// getStudent();
