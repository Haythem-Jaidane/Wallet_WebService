import fetch from 'node-fetch';

import Transaction from "../models/Transaction.js"
import {earnMoney , spendMoney} from "./Wallet.js"


export var FEES_RATE = 0.05;

export function getTransactions(req,res){
    Transaction.find({})
        .then((transaction) =>{
            let transaction_list = [];
            for (let i = 0; i < transaction.length; i++) {
                transaction_list.push({
                    id_sender: transaction[i].id_sender,
                    id_receiver: transaction[i].id_receiver,
                    amount : transaction[i].amount,
                    fees : transaction[i].fees,
                    type : transaction[i].type,
                    hour : transaction[i].hour
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
            { id_receiver: req.params.id },
            { id_sender: req.params.id },
        
        ]})
        .then((transaction) =>{
            res.status(200).json(transaction);
        })
        .catch((err) => {
            res.status(500).json({ error: err });
        });
}

export function addTransaction(id_sender,id_receiver,amount,type){
    
    const date = new Date();
    const fees_transaction = amount * FEES_RATE

    Transaction.create({
        id_sender: id_sender,
        id_receiver: id_receiver,
        year: date.getFullYear(),
        month : date.getMonth(),
        day : date.getDay(),
        hour : date.getHours(),
        minute : date.getMinutes(),
        amount : amount - fees_transaction,
        fees : fees_transaction
    })
        .then((transaction) => {
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


export function createTransaction(req,res){
    let newTransaction = addTransaction(req.body.id_sender,req.body.id_receiver,req.body.amount,req.body.type);
    res.status(201).json(newTransaction);
}

export function Deposit(req,res){
    const postData = {
        amount: req.body.amount,
        note: "Deposit",
        first_name: req.body.firstName,
        last_name: req.body.lastName,
        email: req.body.email,
        phone: req.body.phone,
        return_url: "https://www.return_url.tn",
        cancel_url: "https://www.cancel_url.tn",
        webhook_url: "https://www.webhook_url.tn",
        order_id: "244557"
      };
      
      fetch('https://sandbox.paymee.tn/api/v2/payments/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Token ${req.body.token}`
        },
        body: JSON.stringify(postData),
      })
        .then(response => {
            res.status(200).json(response.json())}
        )
        .then(data => console.log('Server response:', data))
        .catch(error => console.error('Error:', error));
}