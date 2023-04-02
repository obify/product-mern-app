const express = require('express');
const app = express();
const productRouter = express.Router();
const multer = require('multer')
const file_controler = require("../controllers/file_controller");
const product_controller = require("../controllers/product_controller");


// productRouter.post('/createproduct',product_controller.create_product);
productRouter.post('/createproduct', product_controller.create_product);

productRouter.get("/allproducts", product_controller.get_allproducts);
productRouter.put("/updateproduct/:productId", product_controller.update_product);
productRouter.delete("/deleteproduct/:productId", product_controller.delete_product);
productRouter.post('/upload', file_controler.upload.array('files', 10), (req, res) => {
    console.log(req);
    res.status(200).json({ filesJson: req.files });
})
productRouter.get('/files/:filename', file_controler.downloadFile);
module.exports = productRouter;