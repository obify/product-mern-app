const mongoose = require('mongoose');
const SchemaTypes = mongoose.Schema.Types;

const productSchema = new mongoose.Schema({

    productName: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    productPrice: {
        type: SchemaTypes.Decimal128,
        required: true
    },
    category: {
        type: String,
        required: true
    }, images: []
});

mongoose.model("ProductModel", productSchema);