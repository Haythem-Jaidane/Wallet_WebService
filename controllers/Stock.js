import  Stock from '../models/Stock.js'; 

  
export const createStock = async (req, res) => {
    try {
      const newStock = new Stock(req.body);
      const savedStock = await newStock.save();
      res.status(201).json(savedStock);
    } catch (error) {
      res.status(500).json({ error: 'Could not create Stock', error });
    }
  };



  export const getAllStocks = async (req, res) => {
    try {
      const Stocks = await Stock.find();
      res.status(200).json(Stocks);
    } catch (error) {
      res.status(500).json({ error: 'Could not fetch Stocks' });
    }
  };


  

  export const getStockById = async (req, res) => {
    try {
        
      const stock = await Stock.findOne({id : req.params.id});
    
      if (!stock) {
        return res.status(404).json({ error: 'Stock not found' });
      }
      res.status(200).json(stock);
    } catch (error) {
      res.status(500).json({ errorMessage: 'Could not fetch Stock' });
    }
};



  export const updateStock = async (req, res) => {
    try {
      const updatedStock = await Stock.findOneAndUpdate({id : req.params.id} , req.body, {
        new: true,//true ==> the update object vs false ==> the object not updated
      });
      res.status(200).json(updatedStock);
    } catch (error) {
      res.status(500).json({ error: 'Could not update Stock' });
    }
  };



  export const deleteStock = async (req, res) => {
    try {
      await Stock.findOneAndDelete({id: req.params.id});
      res.status(204).end();
    } catch (error) {
      res.status(500).json({ error: 'Could not delete Stock' });
    }
  };