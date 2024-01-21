import { Router } from "express";
import productsfsRouter from "./productsfs.router.js";
import cartfsRouter from "./cartsfs.router.js";
import productsRouter from "./products.router.js";
import cartRouter from "./carts.router.js";

const router = Router();

// router.use("/users", userRoutes);
router.use("/productsfs", productsfsRouter);
router.use("/cartsfs", cartfsRouter);

router.use("/carts", cartRouter);
router.use("/products", productsRouter);

export default router;