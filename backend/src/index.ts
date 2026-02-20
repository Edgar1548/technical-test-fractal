import "dotenv/config";
import express, { Application } from "express";
import cors from "cors";

import orderRoutes from "./routes/orders.routes.js";
import productsRoutes from "./routes/products.routes.js";

const app: Application = express();
const PORT = process.env.PORT || 3000;
app.use(cors({
  origin: process.env.FRONTEND_URL,
}));

app.use(express.json());

app.use("/api/orders", orderRoutes);
app.use("/api/products", productsRoutes);

app.listen(PORT, () => {
  console.log("Server running on port 3000");
});