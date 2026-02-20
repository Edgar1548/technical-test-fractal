import { Router, Request, Response } from "express";
import { pool } from "../db.js";

const router = Router();

router.get("/", async (_: Request, res: Response) => {
  const { rows } = await pool.query("SELECT * FROM products ORDER BY id");
  res.json(rows);
});

router.get("/:id", async (req: Request, res: Response) => {
  const { rows } = await pool.query(
    "SELECT * FROM products WHERE id=$1",
    [req.params.id]
  );
  res.json(rows[0]);
});

router.post("/", async (req: Request, res: Response) => {
  const { name, unit_price } = req.body;
  const { rows } = await pool.query(
    "INSERT INTO products(name, unit_price) VALUES($1,$2) RETURNING *",
    [name, unit_price]
  );
  res.json(rows[0]);
});

router.put("/:id", async (req: Request<{ id: string }>, res: Response) => {
  const client = await pool.connect();

  try {
    const id = Number(req.params.id);
    const { order_number, products } = req.body;

    await client.query("BEGIN");

    const orderCheck = await client.query(
      "SELECT * FROM orders WHERE id=$1",
      [id]
    );

    if (orderCheck.rows[0].status === "Completed") {
      throw new Error("Cannot modify completed order");
    }

    await client.query(
      "UPDATE orders SET order_number=$1 WHERE id=$2",
      [order_number, id]
    );

    await client.query("DELETE FROM order_products WHERE order_id=$1", [id]);

    let finalPrice = 0;

    for (const item of products) {
      const productData = await client.query(
        "SELECT * FROM products WHERE id=$1",
        [item.product_id]
      );

      const unitPrice = productData.rows[0].unit_price;
      const totalPrice = unitPrice * item.qty;

      finalPrice += totalPrice;

      await client.query(
        `INSERT INTO order_products(order_id, product_id, qty, unit_price, total_price)
         VALUES($1,$2,$3,$4,$5)`,
        [id, item.product_id, item.qty, unitPrice, totalPrice]
      );
    }

    await client.query(
      "UPDATE orders SET final_price=$1 WHERE id=$2",
      [finalPrice, id]
    );

    await client.query("COMMIT");

    res.json({ message: "Order updated" });

  } catch (error) {
    await client.query("ROLLBACK");
    res.status(400).json({ message: "Update failed" });
  } finally {
    client.release();
  }
});

router.delete("/:id", async (req: Request, res: Response) => {
  await pool.query("DELETE FROM products WHERE id=$1", [req.params.id]);
  res.json({ message: "Deleted" });
});

export default router;