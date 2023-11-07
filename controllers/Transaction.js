import Transaction from "../models/Transaction.js"
import {earnMoney , spendMoney} from "./Wallet.js"

export var FEES_RATE = 0.05;

export function getTransactions(req,res){
    Transaction.find({})
        .then((transaction) =>{
            let transaction_list = [];
            for (let i = 0; i < transaction.length; i++) {
                transaction_list.push({
                    id: transaction[i].id,
                    id_sender: transaction[i].balance,
                    id_receiver: transaction[i].linked_bank,
                    amount : transaction[i].cashflow_type,
                    fees : transaction[i].fees,
                    type : transaction[i].type
                });
            }
            res.status(200).json(transaction_list);
        })
        .catch((err) => {
            res.status(500).json({ error: err });
        });
}

export function setFeesRate(req,res){
    FEES_RATE = req.body.fees
    res.status(200).json(`fees changed to ${req.body.fees}`);
}

export function getTransactionById(req,res){
    Transaction.find({id:req.body.id})
        .then((transaction) =>{
            res.status(200).json(transaction);
        })
        .catch((err) => {
            res.status(500).json({ error: err });
        });
}

export function getTransactionByIdSender(req,res){
    Transaction.find({id_sender:req.body.id})
        .then((transaction) =>{
            res.status(200).json(transaction);
        })
        .catch((err) => {
            res.status(500).json({ error: err });
        });
}

export function getTransactionByIdReceiver(req,res){
    Transaction.find({id_receiver:req.body.id})
        .then((transaction) =>{
            res.status(200).json(transaction);
        })
        .catch((err) => {
            res.status(500).json({ error: err });
        });
}

export function getTransactionByUser(req,res){
    Transaction.find({
        $or: [
            { id_receiver: req.body.id },
            { id_sender: req.body.id },
        
        ]})
        .then((transaction) =>{
            res.status(200).json(transaction);
        })
        .catch((err) => {
            res.status(500).json({ error: err });
        });
}

export function addTransaction(id_sender,id_receiver,amount,type){
    Transaction.create({
        id_sender: id_sender,
        id_receiver: id_receiver,
        amount : amount,
        fees : FEES_RATE,
        type : type
    })
        .than((transaction) => {
            receiverWallet = earnMoney(id_receiver,amount-(amount*FEES_RATE)/2)
            senderWallet = spendMoney(id_sender,amount-(amount*FEES_RATE)/2)
            
            if(senderWallet == null){
                return null;
            }
            return transaction;
        }
        )   
        .catch((err) => {
            return null
        });
}