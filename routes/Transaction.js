import express from "express";

import { getTransactions,
         setFeesRate,
         getTransactionById,
         getTransactionByIdSender,
         getTransactionByIdReceiver,
         getTransactionByUser,
         createTransaction,
         Deposit } 
from "../controllers/Transaction.js";

const router = express.Router();

router
    .route("/")
    .get(getTransactions)

router
    .route("/fees")
    .post(setFeesRate)

router
    .route("/:id")
    .get(getTransactionById)

router
    .route("/sender/:id")
    .get(getTransactionByIdSender)

router
    .route("/user/:id")
    .get(getTransactionByUser)


router
    .route("/receiver/:id")
    .get(getTransactionByIdReceiver)

router
    .route("/withdraw")
    .post(Deposit)

router
    .route("/test")
    .post(createTransaction)

export default router;