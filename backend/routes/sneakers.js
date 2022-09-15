import express from "express";
import SneakersController from "../controllers/sneakers.js";

const router = express.Router();

router.get("/get", SneakersController.get);
router.get("/getAll", SneakersController.getAll);
router.post("/update", SneakersController.update);
router.put("/create", SneakersController.create);
router.delete("/delete", SneakersController.remove);

export default router;
