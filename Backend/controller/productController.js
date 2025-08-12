const Product = require("../models/Product");

//get /api/product
exports.getAllProduct = async (req, res) => {
  try {
    const { category, featured, search } = req.query;
    const filter = {};

    if (category) filter.category = category;
    if (featured) filter.featured = featured === "true";

    if (search) {
      filter.$or = [
        { title: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
        { category: { $regex: search, $options: "i" } },
      ];
    }

    const products = await Product.find(filter);
    res.status(200).json(products);
  } catch (error) {
    console.error("Error fetching products", error.message);
    res.status(500).json({ message: "Server error", error });
  }
};


//get /api/product/:id
exports.getProductId = async(req, res) =>{
    try {
        const product = await Product.findOne({_id:req.params.id});
        if(!product) return res.status(404).json({message:"Product not found"})

        res.status(200).json(product);
    } catch (error) {
        console.error("Error fetching products",error.message);
        res.status(500).json({message:"Server error",error});
    }
};

//post /api/product
exports.addProduct = async(req, res) =>{
    try {
        const {title, description, price, category, image} = req.body;
        const product = await Product.create({
            title, 
            description, 
            price, 
            category, 
            image
        });
        res.status(201).json(product);
    } catch (error) {
        res.status(500).json({message:"Error : Unable to add the Product", error});
    }
};

//put /api/product/:id
exports.updateProduct = async(req, res) =>{
    try {
        const {id} = req.params;
        const {title, description, price, category, image} = req.body;

        const product = await Product.findOne({_id:id});
        if(!product) return res.status(404).json({message:"Product not found"});

        product.title = title;
        product.description = description;
        product.price = price;
        product.category = category;
        product.image = image;

        await product.save();
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({message:"Failed to edit product",error});
    }
};

//delete /api/product/:id
exports.deleteProduct = async(req, res) =>{
    try {
        const deleted = await Product.findOneAndDelete({_id:req.params.id});
        if(!deleted) return res.status(404).json({message:"Product not found"});
        res.status(200).json({message:"Product deleted sucessfully"});
    } catch (error) {
        res.status(500).json({message:"Product delete failed",error});
    }
};