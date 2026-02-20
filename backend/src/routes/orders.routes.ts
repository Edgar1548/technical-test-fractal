import { Router, Request, Response } from "express";
import { pool } from "../db.js";

const router = Router();
router.get("/", async (_: Request, res: Response) => {
    const { rows } = await pool.query(`
    SELECT o.*,
    COUNT(op.id) as products_count
    FROM orders o
    LEFT JOIN order_products op ON o.id = op.order_id
    GROUP BY o.id
    ORDER BY o.id
  `);

    res.json(rows);
});

router.get("/:id", async (req: Request, res: Response) => {
    const order = await pool.query(
        "SELECT * FROM orders WHERE id=$1",
        [req.params.id]
    );

    const products = await pool.query(
        `SELECT op.*, p.name 
     FROM order_products op
     JOIN products p ON p.id = op.product_id
     WHERE order_id=$1`,
        [req.params.id]
    );

    res.json({
        ...order.rows[0],
        products: products.rows,
    });
});

router.post("/", async (req: Request, res: Response) => {
    const client = await pool.connect();

    try {
        const { order_number, products } = req.body;

        await client.query("BEGIN");

        const orderResult = await client.query(
            "INSERT INTO orders(order_number) VALUES($1) RETURNING *",
            [order_number]
        );

        const order = orderResult.rows[0];

        let finalPrice = 0;

        if (products && products.length > 0) {
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
                    [order.id, item.product_id, item.qty, unitPrice, totalPrice]
                );
            }
        }

        await client.query(
            "UPDATE orders SET total=$1 WHERE id=$2",
            [finalPrice, order.id]
        );

        await client.query("COMMIT");

        res.json({ ...order, total: finalPrice });

    } catch (error) {
        await client.query("ROLLBACK");
        res.status(500).json({ message: "Transaction failed" });
    } finally {
        client.release();
    }
});

router.put("/:id/status", async (req: Request<{ id: string }>, res: Response) => {
    const id: string = req.params.id;

    const { status } = req.body;
    await pool.query(
        "UPDATE orders SET status=$1 WHERE id=$2",
        [status, id]
    );

    res.json({ message: "Status updated" });
});

router.delete("/:id", async (req: Request, res: Response) => {
    await pool.query("DELETE FROM orders WHERE id=$1", [
        req.params.id,
    ]);
    res.json({ message: "Deleted" });
});

export default router;