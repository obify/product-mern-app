const mongoose = require('mongoose');
const ProductModel = mongoose.model("ProductModel");

// add product

exports.create_product = (req, res) => {
    const { productName, description, productPrice, images, category } = req.body;
    const productModel = new ProductModel({
        productName: productName,
        description: description,
        productPrice: productPrice,
        category: category,
        images: images
    });

    productModel.save()
        .then((savedProduct) => {
            res.status(201).json({ "createdProduct": savedProduct })
        })
        .catch(function (err) {
            return res.status(500).json({ error: "Some error occured while saving product!" });
        });
};

// get all products

exports.get_allproducts = (req, res) => {
    ProductModel.find()
        .then((products => {
            res.status(200).json({ productList: products })
        }))
        .catch((error) => {
            console.log(error)
        })
};

// update product

exports.update_product = (req, res) => {
    const productUpdated = {
        productName: req.body.productName,
        description: req.body.description,
        productPrice: req.body.productPrice,
        category: req.body.category
    };
    ProductModel.findByIdAndUpdate(req.params.productId, { $set: productUpdated })
        .then(((productUpdated) => {
            res.status(200).json({ message: "Product Updated Successfully" })
        })).catch(error => {
            return res.status(400).json({ error: "Unable to update the product" })
        })
}



// delete User
exports.delete_product = (req, res) => {
    ProductModel.findOneAndRemove({ _id: req.params.productId })
        .then((response) => {
            res.status(200).json({ message: "product deleted successfully" })
        })
        .catch(error => {
            res.status(400).json({ error: "Unable to delete)" })
        })

}