import express from "express";
import { getDefaultRoom, getRoomByID, createWorkspace, deleteWorkspace, updateWorkspace, shareWorkspace} from "../controllers/room.js";

const router = express.Router();

router.get("/", getDefaultRoom);
router.get("/:id", getRoomByID);
router.post("/", createWorkspace)
router.put("/", shareWorkspace)
router.put("/:id", updateWorkspace)
router.delete("/:id", deleteWorkspace)

export default router;