import React, { useState } from "react";
import "./ProductCard.css";
import MoreAction from "../images/more-action.PNG";
import Carousel from "react-bootstrap/Carousel";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import Modal from "react-bootstrap/Modal";
import { API_BASE_URL } from "../config";
import axios from 'axios'
import Swal from 'sweetalert2'
import { useNavigate } from "react-router-dom";


const ProductCard = (props) => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const navigate=useNavigate();

  const [name, setName] = useState();
  const [description, setDescription] = useState();
  const [price, setPrice] = useState();
  const [category, setCategory] = useState();
  const [addProduct, setAddProduct] = useState(false);
  const [imageDataPreview, setImageDataPreview] = useState([])
  const [images, setImages] = useState([])
  const handleCloseUpdate = () => setAddProduct(false);
  const handleShowUpdate = (e) => {
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
    const result = await axios.put(`${API_BASE_URL}/updateproduct/${props.productData._id}`, requestData)
    
    if (result) {
      Swal.fire({
        icon: 'success',
        title: 'Product created successfully!'
      })

      setAddProduct(false)
      navigate('/products');
    }
  }



  return (
    <div>
      <div className="card shadow-sm ">
        <div className="card-body px-2 ">
          <div className="row">
            <div className="col-md-6 d-flex">
              <div className="d-flex flex-column justify-content-start my-4">
                <p className="fs-6 text-muted">Product Name <i className="fa-solid fa-caret-down"></i></p>
                <p className="fs-5 fw-bold">{props.productData.productName}</p>
              </div>
            </div>
            <div className="col-md-6 d-flex justify-content-end">
              <a
                className="btn"
                href="#"
                role="button"
                id="dropdownMenuLink"
                data-bs-toggle="dropdown"
              >
                <img
                  src={MoreAction}
                  className="float-end fs-3 p-2 mt-2 fa-solid fa-info"
                  alt="more-img"
                />
              </a>
              <ul className="dropdown-menu" aria-labelledby="dropdownMenuLink">
                <li onClick={(e) => handleShowUpdate(e)}>
                  <a className="dropdown-item" href="#" >
                    <i className="fa-solid fa-pen-to-square me-1"></i> Edit
                  </a>
                </li>
                <li
                  onClick={() => {
                    props.deleteProduct(props.productData._id);
                  }}
                >
                  <a className="dropdown-item" href="#">
                    <i className="fa-solid fa-trash-can me-1"></i> Delete{" "}
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="row">
            <div className="col-12">
              {/*   <img style={{borderRadius:"15px"}} onClick={handleShow}  className='img-fluid p-2' src="https://etc.usf.edu/techease/wp-content/uploads/2017/12/daylily-flower-and-buds-sharp.jpg" alt="Product Img" />
               */}
              <Carousel>
                {props.productData.images.map((imageName) => {
                  return (
                    <Carousel.Item>
                      <img
                        style={{ borderRadius: "15px" }}
                        onClick={handleShow}
                        className="d-block w-100"
                        src={`${API_BASE_URL}/files/${imageName}`}
                        alt="First slide"
                      />
                    </Carousel.Item>
                  );
                })}
              </Carousel>
            </div>
          </div>
          <div className="row my-3">
            <div className="col-6 d-flex ">
              <h5 className="fw-lighter fs-5">
              <p className="text-muted px-1 fs-5">Price <i className="fa-solid fa-caret-down"></i></p>
                <i className="fa-solid fa-indian-rupee-sign fw-5 mx-1"></i> {props.productData.productPrice.$numberDecimal}
              </h5>
            </div>
            <div className="col-md-6">
            <p className="text-muted float-end pe-2 ">Category <i className="fa-solid fa-caret-down"></i></p>
              <span className="fw-bold fs-6 float-end pe-2">
                {props.productData.category}
              </span>
            </div>
          </div>
          <div className="row">
            <div className="col-12">
            <p className="text-muted  fs-6">Description <i className="fa-solid fa-caret-down"></i></p>
              <p className="location"> {props.productData.description}</p>
            </div>
          </div>
        </div>
      </div>
      {/*Popup */}
      <Modal show={show} onHide={handleClose} size="lg">
        <Modal.Header closeButton></Modal.Header>
        <Modal.Body>
          <div className="row">
            <div className="col-md-6">
              <div>
                <Carousel className="d-flex justify-content-center align-items-center">
                  {props.productData.images.map((imageName) => {
                    return (
                      <Carousel.Item>
                        <img
                          className="d-block w-100"
                          src={`${API_BASE_URL}/files/${imageName}`}
                          alt="First slide"
                        />
                      </Carousel.Item>
                    );
                  })}
                </Carousel>
              </div>
            </div>
            <div className="col-md-6 ">
              <div className="row">
                <div className="col-md-6 d-flex">
                  <div className="d-flex flex-column justify-content-center mt-2 ms-2">
                <p className="fs-6 text-muted">Product Name <i className="fa-solid fa-caret-down"></i></p>  
                  <p className="fs-5 fw-bold">
                      {props.productData.productName}
                    </p>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-12 ">
                <p className="fs-6 text-muted">Price <i className="fa-solid fa-caret-down"></i></p>

                  <span className="text-muted p-2 fs-5">
                    <i className="fa-solid fa-indian-rupee-sign fs-5 mx-1"></i>
                    {props.productData.productPrice.$numberDecimal}
                  </span>
                </div>
              </div>
              <div className="row">
                <div className="col-12 ms-2 mt-2">
                <p className="fs-6 text-muted">Description <i className="fa-solid fa-caret-down"></i></p>
                  <p>{props.productData.description}</p>
                </div>
              </div>
              <div className="row my-3">
              <p className="fs-6 text-muted">Category <i className="fa-solid fa-caret-down"></i> </p>
                <div className="col-6 d-flex  ">
                  <h5>{props.productData.category}</h5>
                </div>
                 
              </div>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    {/*Update Popup */}
    <Modal show={addProduct} onHide={handleCloseUpdate}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>
            <span className='fw-bold fs-5'> Update Product</span>
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
                  <h3 className='fs-5 text-center mb-2 text-muted'><u>Enter the Product Details to Update</u></h3>
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
                      <span className='fs-6 fw-600'>Update Product</span>
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
  );
};

export default ProductCard;
