import Subscription from "../models/Subscription.js"

let FEES_RATE = 0.1

export function getSubscriptions(req,res){
    Subscription.find({})
        .then((subscription) =>{
            let subscription_list = [];
            for (let i = 0; i < subscription.length; i++) {
                subscription_list.push({
                    id           : subscription[i].id,
                    id_wallet    : subscription[i].id_wallet,
                    type         : subscription[i].type,
                });
            }
            res.status(200).json(transaction_list);
        })
        .catch((err) => {
            res.status(500).json({ error: err });
        });
}

export function getSubscriptionsById(req,res){
    Subscription.find({id:req.params.id})
        .then((subscription) =>{
            res.status(200).json(subscription);
        })
        .catch((err) => {
            res.status(500).json({ error: err });
        });
}

export function getSubscriptionsByIdWallet(req,res){
    Subscription.find({id_wallet:req.params.id_wallet})
        .then((subscription) =>{
            res.status(200).json(subscription);
        })
        .catch((err) => {
            res.status(500).json({ error: err });
        });
}

export function addSubscriptionMedicament(req,res){
    Subscription.create({
        id_wallet    : req.body.id_wallet,
        type         : "Subscription Medicament",
        id_medicament: req.body.id_medicament,
        each_in_days : req.body.each_in_days
    })
      .than((subscription) => {
            res.status(200).json(subscription);
        }
      )   
      .catch((err) => {
            res.status(500).json({ error: err });
      });
}

export function addMicroCredit(req,res){
    Subscription.create({
        id_wallet    : req.body.id_wallet,
        type         : "Micro-Credit",
        amount : req.body.amout,
        fees   : FEES_RATE

    })
      .than((subscription) => {
            res.status(200).json(subscription);
        }
      )   
      .catch((err) => {
            res.status(500).json({ error: err });
      });
}

export function addSaving(req,res){
    Subscription.create({
        type         : "Saving",
        amount : req.body.amout

    })
      .than((subscription) => {
            res.status(200).json(subscription);
        }
      )   
      .catch((err) => {
            res.status(500).json({ error: err });
      });
}


export function deleteSubscription(req,res){
    Subscription.findOneAndRemove({id:req.params.id})
        .than((subscription) => {
            if (!subscription) {
              res.status(400).send(req.params.id + ' was not found');
            } else {
              res.status(200).send(req.params.id + ' was deleted.');
            }
          })
        .catch((err) => {
            res.status(500).json({ error: err });
        })
}

export function updateSubscription(req,res){
    let new_subscription = {
        type         : req.body.type,
        amount       : req.body.amout,
        id_medicament: req.body.id_medicament
    } 

    Subscription.findByIdAndUpdate(req.params.id, new_subscription)
        .then((wallet) => {
            Subscription.findById(req.params.id)
                .then((updatedSubscription) => {
                    res.status(200).json(updatedSubscription);
                })
                .catch((err) => {
                    res.status(500).json({ error: err });
                });
        })
        .catch((err) => {
            res.status(500).json({ error: err });
        });
}