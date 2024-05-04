import { connect } from "../database";
import { User } from "../models/User";

//register
export const register = async (user: User): Promise<User[]> => {
  try {
    const connection = await connect();
    const [rows] = await connection.query(
      "INSERT INTO Users(name,mobile, password, role, createdDate) VALUES (?,?,?,?,?)",
      [user.name, user.mobile, user.password, user.role, new Date()]
    );
    connection.end();

    return rows as User[];
  } catch (error) {
    console.error("Error while fetching users:", error);
    throw error;
  }
};

export const isUserValid = async (user: {
  mobile: string;
}): Promise<User[]> => {
  try {
    const connection = await connect();
    const [rows] = await connection.query(
      "SELECT * FROM Users WHERE mobile = ?",
      [user.mobile]
    );
    connection.end();

    return rows as User[];
  } catch (error) {
    console.error("Error while fetching users:", error);
    throw error;
  }
};

export const getUserById = async (user: {
  userId: number;
}): Promise<User[]> => {
  try {
    const connection = await connect();
    const [rows] = await connection.query("SELECT * FROM Users WHERE id = ?", [
      user.userId,
    ]);
    connection.end();

    return rows as User[];
  } catch (error) {
    console.error("Error while fetching user:", error);
    throw error;
  }
};
