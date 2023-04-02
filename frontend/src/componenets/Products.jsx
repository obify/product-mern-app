import React, { useEffect, useState } from 'react'
import ProductCard from './ProductCard'
import axios from 'axios'
import { API_BASE_URL } from '../config';
import Swal from "sweetalert2";

const Products = () => {
  const [allproducts, setAllProducts] = useState([]);

  const getAllProducts = async () => {
    const response = await axios.get(`${API_BASE_URL}/allproducts`);
    console.log(response.data.productList)
    if (response.status == 200) {
      setAllProducts(response.data.productList)
    }
    else {
      Swal.fire({
        icon: 'error',
        title: 'Some error occured while getting all!'
      })
    }
  }
  const deleteProduct = async (postId) => {
    const response = await axios.delete(`${API_BASE_URL}/deleteproduct/${postId}`);
    if (response.status === 200) {
      getAllProducts();
    }
  }

  useEffect(() => {
    getAllProducts()

  }, [])

  return (
    <div className="container">
      <div className='row my-5'>
        {
          allproducts.length > 0 ? allproducts.map((product) => {
            return <div className='col-md-4 mb-2' key={product._id}>
              {/* <Card postData={post} deletePost={deletePost} getAllPosts={getAllPosts} />*/}
              <ProductCard productData={product} deleteProduct={deleteProduct} />
            </div>

          }) : <h3>No Products Found</h3>
        }

      </div>

    </div>
  )
}

export default Products