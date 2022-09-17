import express from "express";
import sModelController from "../controllers/s-models.js";
import {validateRequestBody, validateDataIntegrity } from "./../middleware.js"

const router = express.Router();

router.get("/getAll", sModelController.getAll);
router.get(
  "/get",
  validateRequestBody,
  validateDataIntegrity,
  sModelController.get
);
router.put(
  "/update",
  validateRequestBody,
  validateDataIntegrity,
  sModelController.update
);
router.post(
  "/create",
  validateRequestBody,
  validateDataIntegrity,
  sModelController.create
);

export default router;
