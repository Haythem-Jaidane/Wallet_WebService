import express from "express";

import { getSubscriptions,
         deleteSubscription,
         getSubscriptionsById,
         getSubscriptionsByIdWallet,
         addSubscriptionMedicament,
         addMicroCredit,
         addSaving,
         updateSubscription } from "../controllers/Subscription.js";

const router = express.Router();

router
    .route("/")
    .get(getSubscriptions)

router
    .route("wallet/:id")
    .get(getSubscriptionsByIdWallet)

router
    .route("/:id")
    .get(getSubscriptionsById)
    .delete(deleteSubscription)
    .put(updateSubscription)

router
    .route("/medicament")
    .post(addSubscriptionMedicament)

router
    .route("/microcredit")
    .post(addMicroCredit)

router
    .route("/saving")
    .post(addSaving)



export default router;