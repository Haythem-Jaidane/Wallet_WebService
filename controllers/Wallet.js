import fetch from 'node-fetch';

import {FEES_RATE} from "./Transaction.js"

import Wallet from "../models/Wallet.js"
import { Types } from 'mongoose';

const { ObjectId } = Types;

const treasuryPaymeeAccount = 3180 

export function getWallets(req,res){
    Wallet.find({})
        .then((wallets) =>{
            let wallet_list = [];
            for (let i = 0; i < wallets.length; i++) {
                wallet_list.push({
                    id_user : wallets[i].id_user,
                    num_paymee: wallets[i].num_paymee,
                    token : wallets[i].token
                });
            }
            res.status(200).json(wallet_list);
        })
        .catch((err) => {
            res.status(500).json({ error: err });
        });
}

export function getWalletById(req,res){
    Wallet.findOne({_id:req.params.id})
        .then((wallet) =>{
            res.status(200).json(wallet);
        })
        .catch((err) => {
            res.status(500).json({ error: err });
        });
}

export function getWalletByUserId(req,res){
    Wallet.find({id_user:req.params.id})
        .then((wallets) =>{
            let wallet_list = [];
            for (let i = 0; i < wallets.length; i++) {
                wallet_list.push({
                    id: wallets[i].id,
                    balance: wallets[i].balance,
                    id_user : wallets[i].id_user,
                    linked_bank: wallets[i].linked_bank,
                    cashflow_type : wallets[i].cashflow_type
                });
            }
            res.status(200).json(wallet_list);
        })
        .catch((err) => {
            res.status(500).json({ error: err });
        });
}

export function addWallet(req,res){
    Wallet.create({
        id_user: req.params.id
    })
      .then((wallet) => {
            res.status(201).json(wallet);
        }
      )   
      .catch((err) => {
            res.status(500).json({ error: err });
      });
}

export function spendMoney(id,amount){

    Wallet.findById(id)
        .then((wallet) => {
            if(wallet.balance < amount){
                return null;
            };
            
            let newWallet = {
                balance: wallet.balance - amount
            };

            Wallet.findByIdAndUpdate(id,newWallet)
                .then((walletUpdate) =>{
                    return walletUpdate;
                })
                .catch((err) => {
                    return null;
                });
        })
        .catch((err) => {
            return null;
        })
    
}

export function earnMoney(id,amount){

    Wallet.findById(id)
        .then((wallet) => {
            
            let newWallet = {
                balance: wallet.balance + amount
            };

            Wallet.findByIdAndUpdate(id,newWallet)
                .then((walletUpdate) =>{
                    return walletUpdate;
                })
                .catch((err) => {
                    return null;
                });
        })
        .catch((err) => {
            return null;
        })

    
}

export function updateWallet(req,res){

    const postData = {
        receiver: treasuryPaymeeAccount,
        amount: 1,
        note: "test send"
      };

    const postRecive = {
        receiver: req.body.num_paymee,
        amount: 1,
        note: "test recive"
      };
      
      fetch('https://sandbox.paymee.tn/api/v1/OTRequest', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Token ${req.body.token}`
        },
        body: JSON.stringify(postData),
      })
      .then((response) => {
        fetch('https://sandbox.paymee.tn/api/v1/OTRequest', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${process.env.PAYMEE_TOKEN}`
            },
            body: JSON.stringify(postRecive),
        })
        .then((response_) => {
            let new_Wallet = {
                num_paymee: req.body.num_paymee,
                token : req.body.token
            } 
        
            const id = new ObjectId(req.params.id);
        
            Wallet.findOneAndUpdate({ _id : id}, new_Wallet)
                .then((wallet) => {
                    res.status(200).json(wallet);
                })
                .catch((err) => {
                    res.status(500).json({ error: err });
                });
        })
        .catch((err) => {
            res.status(500).json({ error: err });
        });
      })
      .catch((err) => {
           res.status(500).json({ error: err });
       });

}

export function deleteWallet(req,res){

    const id = new ObjectId(req.params.id);

    Wallet.findByIdAndDelete(id)
        .then(wallet => {
            if (!wallet) {
              res.status(400).send(req.params.id + ' was not found');
            } else {
              res.status(200).send(req.params.id + ' was deleted.');
            }
          })
        .catch(err => {
            res.status(500).json({ error: err });
        })
}

export function webHook(req,res){
    res.status(200).json(req.body)
}

export function checkPayment(req,res){
    fetch(`https://sandbox.paymee.tn/api/v2/payments/${req.params.token}/check`,{
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Token ${process.env.PAYMEE_TOKEN}`
          }
        }
    )
    .then(
        (response) =>{
            return response.json();
        }
    )
    .then(
        (responseBody) => {
            console.log(responseBody)
            if(responseBody.message == "Success"){
                Wallet.findById(req.params.id)
                    .then((wallet) => {
                        let newWallet = {
                            balance: wallet.balance + responseBody.data.amount
                        };

                        console.log(wallet);

                        Wallet.findByIdAndUpdate(wallet._id,newWallet)
                            .then((walletUpdate) =>{
                                console.log(walletUpdate);
                                res.status(200).json({message:responseBody.message});
                            })
                            .catch((err) => {
                                res.status(500).json({ error: err });
                            });
                
                    })
                    .catch((err) => {
                        res.status(500).json({ error: err });
                    });
            }
        }
    )
    .catch(err => {
        res.status(500).json({ error: err });
    })
}

export function Withdraw(req,res){

    console.log(req.body);

    const withdrawBody = {
        amount: req.body.amount,
        note: "Order #123",
        first_name: "John",
        last_name: "Doe",
        email: "haythemhassine.jaidane@esprit.com",
        phone: "+21692047367",
        webhook_url: "https://192.168.137.1:9090/wallet/hook",
        order_id: "6000"
    };
      
    fetch('https://sandbox.paymee.tn/api/v2/payments/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Token ${process.env.PAYMEE_TOKEN}`
        },
        body: JSON.stringify(withdrawBody),
    })
    .then(
        (response) =>{
            console.log(response);
            return response.json();
        }
    )
    .then(
        (responseBody) => {
            res.status(200).json({
                                  link:responseBody.data.payment_url,
                                  token:responseBody.data.token
                                });
        }
    )
    .catch(err => {
        res.status(500).json({ error: err });
    })

}

export function Deposit(req,res){

    Wallet.findById(req.body.id)
        .then((wallet) => {

            console.log(wallet)

            if(wallet.balance < req.body.amount){
                res.status(500).json({ message : "not enough money"});
            };

            const depositBody = {
                amount: req.body.amount - req.body.amount * FEES_RATE,
                receiver: wallet.num_paymee,
                note: "string",
            };
              
            fetch('https://sandbox.paymee.tn/api/v1/OTRequest', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                  'Authorization': `Token ${process.env.PAYMEE_TOKEN}`
                },
                body: JSON.stringify(depositBody),
            })
            .then(
                (response) =>{
                    return response.json();
                }
            )
            .then(
                (responseBody) => {
                    console.log(FEES_RATE)

                    let newWallet = {
                        balance: wallet.balance - req.body.amount
                    };

                    Wallet.findByIdAndUpdate(wallet._id,newWallet)
                        .then((walletUpdate) =>{
                            res.status(200).json({message : "Success"});
                        })
                        .catch((err) => {
                            res.status(500).json({ error: err });
                        });
                    
                }
            )
            .catch(err => {
                res.status(500).json({ error: err });
            })
            
        })
        .catch((err) => {
            res.status(500).json({ error: err });
    })
}