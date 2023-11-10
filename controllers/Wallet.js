import Wallet from "../models/Wallet.js"

export function getWallets(req,res){
    Wallet.find({})
        .then((wallets) =>{
            let wallet_list = [];
            for (let i = 0; i < wallets.length; i++) {
                wallet_list.push({
                    id: wallets[i].id,
                    balance: wallets[i].balance,
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

export function getWalletById(req,res){
    Wallet.findOne({_id:req.params.id})
        .then((wallet) =>{
            res.status(200).json(wallet);
        })
        .catch((err) => {
            res.status(500).json({ error: err });
        });
}

export function addWallet(){
    Wallet.create({
        balance: 0
    })
      .then((wallet) => {
            return wallet;
        }
      )   
      .catch((err) => {
            return null;
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

    let new_Wallet = {
        linked_bank: req.body.linked_bank,
        cashflow_type : req.body.cashflow_type
    } 

    Wallet.findByIdAndUpdate(req.params.id, new_Wallet)
        .then((wallet) => {
            Wallet.findById(req.params.id)
                .then((updatedWallet) => {
                    res.status(200).json(updatedWallet);
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
    Wallet.findByIdAndDelete(req.params.id)
        .than(wallet => {
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