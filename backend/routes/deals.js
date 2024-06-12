import express from "express";
import {createDeal,editDeal,getDeals,deleteDeal} from "../controllers/deal.js";

const router = express.Router();

router.get("/:id", getDeals);
router.post("/:id", createDeal);
router.put("/:id", editDeal);
router.delete("/:id", deleteDeal);

export default router;