const Product = require('../Model/Products')
const Cart = require('../Model/Cart')

const addproduct = async (req, res) => {
  const { Name,price,id } = req.body

  try {
    const event = await Product.create({
      id,
      Name,
      price
    })
    res.status(200).json(event)  
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
}

const getproduct = async (req, res) => {
  try {
    const event = await Product.find()
    res.status(200).json(event)  
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
}

const addcart =  async (req, res) => {
  const { productId,quantity } = req.body
  try {
    const event = await Cart.create({
      pid:productId,qyt:quantity
    })
    res.status(200).json(event)  
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
}



const processcart = async (req, res) => {
  try {
    const cartItems = await Cart.find().populate('pid');

    const processed = cartItems.map(item => ({
      _id: item._id,
      Name:item.pid.Name,
      pid: item.pid.id,
      qyt: item.qyt,
      total: item.pid.price * item.qyt, 
      createdAt: item.createdAt,
      updatedAt: item.updatedAt
    }));

    res.status(200).json(processed);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const removecart = async (req, res) => {
  try {
    const {id} = req.params
    const cartItems = await Cart.findByIdAndDelete({_id:id})
    res.status(200).json(cartItems);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};


const checkout =async (req, res) => {
  try {
    const { cartIds } = req.body;

  
    const items = await Cart.find({ _id: { $in: cartIds } }).populate('pid');

  
    const receipt = items.map(item => ({
      name: item.pid.Name,
      price: item.pid.price,
      quantity: item.qyt,
      total: item.pid.price * item.qyt
    }));


    const grandTotal = receipt.reduce((sum, i) => sum + i.total, 0);

    

    res.status(200).json({ receipt, grandTotal });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {addproduct,getproduct,addcart,processcart,removecart,checkout}