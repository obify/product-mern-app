import React, { useState } from 'react'
import Modal from 'react-bootstrap/Modal';
import { NavLink } from 'react-router-dom';
import "./Navbar.css"
import axios from 'axios'
import Swal from 'sweetalert2'
import { API_BASE_URL } from '../config';

const Navbar = () => {

  const [name, setName] = useState();
  const [description, setDescription] = useState();
  const [price, setPrice] = useState();
  const [category, setCategory] = useState();
  const [addProduct, setAddProduct] = useState(false);
  const [imageDataPreview, setImageDataPreview] = useState([])
  const [images, setImages] = useState([])
  const handleClose = () => setAddProduct(false);
  const handleShow = (e) => {
    e.preventDefault();
    setAddProduct(true);

  }
  const onChangeImageUpload = (e) => {
    e.preventDefault();
    setImages((img) => [...img, e.target.files[0]])
    setImageDataPreview((data) => [...data, URL.createObjectURL(e.target.files[0])])
  }
  const submitProduct = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    images.forEach(file => {
      formData.append("files", file);
    });

    const response = await axios({
      method: 'POST',
      url: `${API_BASE_URL}/upload`,
      data: formData,
      headers: { "Content-Type": "multipart/form-data" }
    })

    let imageNames = [];
    response.data.filesJson.forEach(file => {
      imageNames.push(file.filename)
    });

    const requestData = { productName: name, description: description, productPrice: price, images: imageNames, category: category }
    const result = await axios.post(`${API_BASE_URL}/createproduct`, requestData);
    if (result) {
      Swal.fire({
        icon: 'success',
        title: 'Product created successfully!'
      })
      setAddProduct(false)
    }
  }
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary bg-gradient">
        <div className="container-fluid">
          <NavLink className="navbar-brand" to={"/"}>Obify Consulting</NavLink>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <NavLink className="nav-link " aria-current="page" to={"/products"}>Products</NavLink>
              </li>
            </ul>
            <form className="d-flex">
              <button className="btn btn-warning" type="submit" onClick={(e) => handleShow(e)}>Add Product</button>
            </form>
          </div>
        </div>
      </nav>
      {/*Popup for Add Product */}
      <Modal show={addProduct} onHide={handleClose}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>
            <span className='fw-bold fs-5'> Add Product</span>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={(e) => submitProduct(e)}>
            <div className='row'>
              <div className='col-md-6 col-sm-12 mb-3 p-2'>
                <div className="upload-box">
                  <div className='dropZoneContainer'>
                    <input onChange={(e) => onChangeImageUpload(e)} multiple name="files" type="file" id="drop_zone" className="FileUpload" accept=".jpg,.png,.gif" />
                    <div className='dropZoneOverlay'>
                      {
                        imageDataPreview.map((img) => {
                          return (
                            <img key={img.name} src={img} width='100' height='100' />
                          )
                        })
                      }
                      <i className="fa-solid fa-cloud-arrow-up fs-1"></i> <br />Upload Photo from Computer</div>
                  </div>
                </div>
              </div>
              <div className="col-md-6 col-sm-12 d-flex flex-column justify-content-between mb-3">
                <div className='row'>
                  <h3 className='fs-5 text-center mb-2 text-muted'><u>Enter the Product Details</u></h3>
                  <div className="col-sm-12 mb-3">
                    <div className="form-floating">
                      <input onChange={(e) => setName(e.target.value)} type="text" className="form-control" placeholder="Product Name" id="floatingTextarea"></input>
                      <label htmlFor="floatingTextarea">Product Name</label>
                    </div>
                  </div>
                  <div className="col-sm-12 mb-3">
                    <div className="form-floating">
                      <textarea onChange={(e) => setDescription(e.target.value)} className="form-control" placeholder="Add Product Description" id="floatingTextarea"></textarea>
                      <label htmlFor="floatingTextarea">Product Description</label>
                    </div>
                  </div>
                  <div className="col-sm-12 mb-3">
                    <div className="form-floating">
                      <input onChange={(e) => setPrice(e.target.value)} type="number" className="form-control" placeholder="Add Price" id="floatingTextarea"></input>
                      <label htmlFor="floatingTextarea">Product Price</label>
                    </div>
                  </div>
                  <div className="col-sm-12 mb-3">
                    <div className="form-floating">
                      <input onChange={(e) => setCategory(e.target.value)} type="text" className="form-control" placeholder="Add Category" id="floatingTextarea"></input>
                      <label htmlFor="floatingTextarea">Product Category</label>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-sm-12 mb-3">
                    <button className="custom-btn custom-btn-post float-end " type='submit'>
                      <span className='fs-6 fw-600'>Add Product</span>
                    </button>
                  </div>

                </div>

              </div>
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <div className='footer-text '>

          </div>
        </Modal.Footer>
      </Modal>
    </div>

  )
}

export default Navbar