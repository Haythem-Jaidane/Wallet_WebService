import express from "express";

import { getWallets,
         deleteWallet,
         getWalletById,
         updateWallet,
         addWallet,
         getWalletByUserId,
         checkPayment,
         webHook,
         Withdraw,
         Deposit } from "../controllers/Wallet.js";

const router = express.Router();

router
    .route("/")
    .get(getWallets)

router
    .route("/:id")
    .post(addWallet)
    .get(getWalletById)
    .delete(deleteWallet)
    .put(updateWallet)

router
    .route("/user/:id")
    .get(getWalletByUserId)

router
    .route("/money/withdraw")
    .post(Withdraw)

router
    .route("/hook")
    .get(webHook)

router
    .route("/check/:token/:id")
    .get(checkPayment)

router
    .route("/money/deposit")
    .post(Deposit)

export default router;