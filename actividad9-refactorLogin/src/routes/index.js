import { Router } from "express";
import productsfsRouter from "./productsfs.routes.js";
import cartfsRouter from "./cartsfs.routes.js";
import productsRouter from "./products.routes.js";
import cartRouter from "./carts.routes.js";
import users from "./users.routes.js";
import auth from "./auth.routes.js";
import testRouter from "./test.routes.js";

const router = Router();

// router.use("/users", userRoutes);
router.use("/productsfs", productsfsRouter);
router.use("/cartsfs", cartfsRouter);

router.use("/carts", cartRouter);
router.use("/products", productsRouter);

router.use("/users", users)
router.use("/auth", auth)
router.use("/test", testRouter)

export default router;