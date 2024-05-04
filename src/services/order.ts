import { connect } from "../database";
import { Order } from "../models/Order";

//add order
export async function addOrder(order: {
  userId: number;
  amount: number;
}): Promise<{ insertId: number }> {
  const connection = await connect();

  const [rows] = await connection.query(
    "INSERT INTO Orders (userId, orderDate, amount) VALUES (?,?, ?)",
    [order.userId, new Date(), order.amount]
  );
  connection.end();
  return rows as { insertId: number };
}

//add order_item
export async function addOrderItems(order: {
  orderId: number;
  itemId: number;
  quantity: number;
}): Promise<{ insertId: number }> {
  const connection = await connect();

  const [rows] = await connection.query(
    "INSERT INTO Order_Items (orderId, itemId, quantity) VALUES (?, ?, ?)",
    [order.orderId, order.itemId, order.quantity]
  );
  connection.end();
  return rows as { insertId: number };
}

//get order history
export async function getOrderHistory(order: { userId: number }): Promise<[]> {
  const connection = await connect();

  const [rows] = await connection.query(
    "SELECT oi.orderId, o.amount,oi.itemId, oi.quantity, i.name AS itemName,o.orderDate FROM Orders AS o JOIN Order_Items AS oi ON o.id = oi.orderId JOIN Items AS i ON i.id = oi.itemId WHERE o.userId = ?;",
    [order.userId]
  );
  connection.end();
  return rows as [];
}
