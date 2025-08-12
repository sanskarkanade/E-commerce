const Order = require("../models/orders");

//get /api/orders/
exports.getOrders = async(req ,res) =>{
  const userId = req.user.id;

  try {
    const order = await Order.findOne({userId});

    if(!order)
      return res.status(404).json({message:"Orders not found"});

    res.status(200).json(order);
  } catch (error) {
    res.status(500).json({message:"Server error",error});
  }
};