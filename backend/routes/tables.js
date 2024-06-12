import express from "express";
import {getTable, createTable, getTableInfo, editTable, deleteTable} from "../controllers/table.js";

const router = express.Router();

router.get("/:id", getTable);
router.get("/", getTableInfo);
router.put("/:id", editTable);
router.post("/", createTable);
router.delete("/:id", deleteTable);

export default router;