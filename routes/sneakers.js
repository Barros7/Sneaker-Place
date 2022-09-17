import express from "express";
import SneakersController from "../controllers/sneakers.js";
import { validateRequestBody, validateDataIntegrity } from "./../middleware.js";

const router = express.Router();

router.get("/getAll", SneakersController.getAll);
router.get("/get",validateRequestBody, validateDataIntegrity, SneakersController.get);
router.put("/update", validateRequestBody, validateDataIntegrity, SneakersController.update);
router.post("/create",validateRequestBody, validateDataIntegrity, SneakersController.create);
router.delete("/delete",validateRequestBody, validateDataIntegrity, SneakersController.remove);

export default router;
