import { createConnection } from "mysql2/promise";

export async function connect() {
  const connection = await createConnection({
    host: "mysql",
    port: 3306,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
  });
  return connection;
}
