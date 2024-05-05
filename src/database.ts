import { createConnection } from "mysql2/promise";

export async function connect() {
  const connection = await createConnection({
    host: process.env.MYSQL_HOST || "localhost",
    port: 3306,
    user: process.env.MYSQL_USER || "root",
    password: process.env.MYSQL_PASSWORD || "password",
    database: process.env.MYSQL_DATABASE || "grocery_booking",
  });
  return connection;
}
