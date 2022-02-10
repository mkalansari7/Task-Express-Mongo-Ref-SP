const Product = require("../../models/Product");
const Shop = require("../../models/Shop");

exports.getShop = async (req, res) => {
  try {
    const shops = await Shop.find().populate({
      path: "products",
      select: ["name", "image"],
    });
    return res.json(shops);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

exports.createShop = async (req, res, next) => {
  try {
    if (req.file) {
      req.body.image = `/${req.file.path}`;
      req.body.image = req.body.image.replace("\\", "/");
    }
    const newShop = await Shop.create(req.body);
    return res.status(201).json(newShop);
  } catch (error) {
    next(error);
  }
};

exports.productCreate = async (req, res, next) => {
  try {
    if (req.file) {
      req.body.image = `/${req.file.path}`;
      req.body.image = req.body.image.replace("\\", "/");
    }
    const { shopId } = req.params;
    req.body.shop = shopId;
    const newProduct = await Product.create(req.body);
    await Shop.findByIdAndUpdate(shopId, {
      $push: { products: newProduct._id },
    });
    return res.status(201).json(newProduct);
  } catch (error) {
    next(error);
  }
};
