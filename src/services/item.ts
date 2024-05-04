import { RowDataPacket } from "mysql2";
import { connect } from "../database";
import { Item } from "../models/Item";

//add single item
export async function addItem(
  item: Item & { createdBy: number }
): Promise<{ insertId: number }> {
  const connection = await connect();

  const [rows] = await connection.query(
    "INSERT INTO Items(name,quantity, price,createdDate, createdBy, isActive) VALUES (?,?,?,?,?,?)",
    [item.name, item.quantity, item.price, new Date(), item.createdBy, true]
  );
  connection.end();
  return rows as { insertId: number };
}

//add in inventory
export async function addInventory(item: {
  insertItemId: number;
  quantity: number;
}): Promise<{ insertId: number }> {
  const connection = await connect();
  const [rows] = await connection.query(
    "INSERT INTO Inventory(itemId, available_quantity,createdDate, updatedDate) VALUES (?,?,?,?)",
    [item.insertItemId, item.quantity, new Date(), new Date()]
  );
  connection.end();
  return rows as { insertId: number };
}

//get all items
export async function getAllItems(): Promise<Item[]> {
  const connection = await connect();
  const [rows] = await connection.query(
    "SELECT it.id AS itemId, it.name AS itemName,it.quantity as itemQuantity, it.price AS itemPrice, inv.available_quantity AS available_quantity FROM Items AS it LEFT JOIN Inventory AS inv ON it.id = inv.itemId WHERE it.isActive = 1"
  );
  connection.end();
  return rows as Item[];
}

//get single item details by name
export async function getItem(item: { name: string }): Promise<Item[]> {
  const connection = await connect();
  const [rows] = await connection.query(
    "SELECT * FROM Items WHERE name = ? AND isActive = 1",
    [item.name]
  );
  connection.end();
  return rows as Item[];
}

//get single item by id
export async function getItemById(item: { itemId: number }): Promise<Item[]> {
  const connection = await connect();
  const [rows] = await connection.query(
    "SELECT * FROM Items WHERE id = ? AND isActive = 1",
    [item.itemId]
  );
  connection.end();
  return rows as Item[];
}

//Get Available Item qty by Id
export async function getAvailableItemQty(item: {
  itemId: number;
}): Promise<{ available_quantity: number } | undefined> {
  const connection = await connect();

  try {
    const [rows] = await connection.query<RowDataPacket[]>(
      "SELECT available_quantity FROM Inventory WHERE itemId = ? FOR UPDATE",
      [item.itemId]
    );

    if (rows.length === 0) {
      return undefined;
    }

    return rows[0] as { available_quantity: number };
  } catch (error) {
    throw error;
  } finally {
    connection.end();
  }
}

//Update Inventory
export async function updateInventory(item: {
  itemId: number;
  quantity: number;
}): Promise<[]> {
  const connection = await connect();

  const [rows] = await connection.query(
    "UPDATE Inventory SET available_quantity = available_quantity - ? WHERE itemId = ?",
    [item.quantity, item.itemId]
  );
  connection.end();
  return rows as [];
}

//direct admin Inventory update
export async function directInventoryUpdate(item: {
  itemId: number;
  quantity: number;
}): Promise<[]> {
  const connection = await connect();

  const [rows] = await connection.query(
    "UPDATE Inventory SET available_quantity = ? WHERE itemId = ?",
    [item.quantity, item.itemId]
  );
  connection.end();
  return rows as [];
}

//update item qty and updateInventory
export async function updateItemAndInventory(item: {
  itemId: number;
  quantity: number;
}): Promise<[]> {
  const connection = await connect();

  const [rows] = await connection.query(
    "UPDATE Inventory SET available_quantity = available_quantity + ? WHERE itemId = ?",
    [item.quantity, item.itemId]
  );
  connection.end();
  return rows as [];
}

//Get all available Items
export async function getAvailableItemList(): Promise<
  [
    {
      itemId: number;
      itemName: string;
      itemPrice: number;
      available_quantity: number;
    }
  ]
> {
  const connection = await connect();

  try {
    const [rows] = await connection.query<RowDataPacket[]>(
      "SELECT it.id AS itemId, it.name AS itemName, it.price AS itemPrice, inv.available_quantity AS available_quantity FROM Items AS it LEFT JOIN Inventory AS inv ON it.id = inv.itemId WHERE inv.available_quantity > 0 AND it.isActive = 1;"
    );

    return rows as [
      {
        itemId: number;
        itemName: string;
        itemPrice: number;
        available_quantity: number;
      }
    ];
  } catch (error) {
    throw error;
  } finally {
    connection.end();
  }
}

//remove single item (deactive item)
export async function removeItem(item: { itemId: number }): Promise<Item[]> {
  const connection = await connect();
  try {
    const [rows] = await connection.query(
      "UPDATE Items SET isActive = 0 WHERE id = ?",
      [item.itemId]
    );

    return rows as Item[];
  } catch (error) {
    throw error;
  } finally {
    connection.end();
  }
}

//Update Item
export async function updateItem(item: {
  itemId: number;
  name?: string;
  quantity?: number;
  price?: number;
}): Promise<[]> {
  const connection = await connect();
  let query = "UPDATE Items SET";

  // Array to store parameter values for the query
  const values = [];

  // Handle name update
  if (item.name) {
    query += " name = ?,";
    values.push(item.name);
  }

  // Handle quantity update
  if (item.quantity !== undefined) {
    query += " quantity = ?,";
    values.push(item.quantity);
  }

  // Handle price update
  if (item.price !== undefined) {
    query += " price = ?,";
    values.push(item.price);
  }

  // Remove the trailing comma from the query string
  query = query.slice(0, -1);

  // Add the WHERE clause to specify the item to update
  query += " WHERE id = ?";
  values.push(item.itemId);

  const [rows] = await connection.query(query, values);
  connection.end();
  return rows as [];
}
