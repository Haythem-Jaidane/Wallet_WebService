import express from "express";

import { getWallets,deleteWallet,getWalletById,updateWallet } from "../controllers/Wallet.js";

const router = express.Router();

router
    .route("/")
    .get(getWallets)

router
    .route("/:id")
    .get(getWalletById)
    .delete(deleteWallet)
    .put(updateWallet)

export default router;