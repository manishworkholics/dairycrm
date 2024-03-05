import React, { useState, useEffect } from 'react'
// import dateFormat from "dateformat";
import { Modal } from "react-bootstrap";
import Navbar from '../Template/Navbar'
import Home from './Home';

const Product = () => {
  const usertoken = sessionStorage.getItem('token')
  const [deleteid, Setdeleteid] = useState('')
  const [data, setData] = useState();
  const [unit, setUnit] = useState();
  const [post, setPost] = useState({ name: '', price: '', unit: '' });
  const [edit, setedit] = useState({ name: '', price: '', unit: '' });
  const [showModal, setShowModal] = useState(false);
  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);
  const [showeditModal, seteditShowModal] = useState(false);
  const handleeditClose = () => seteditShowModal(false);

  const handleeditShow = (val) => {
    seteditShowModal(true);
    setedit(val)
  }

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setPost({ ...post, [name]: value });
  };

  const handleChanges = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setedit({ ...edit, [name]: value });
  };

  const addproduct = async (e) => {
    e.preventDefault();
    const { name, price, unit } = post
    const fetchdata = fetch('http://localhost:6060/api/v1/add-product', {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: name, price: price, unit: unit }),
    })
    const response = await fetchdata;
    await response.json();
    if (response.status === 200) {
      alert('product add successfully')
      handleClose();
      getproduct();
      setPost({ name: '', price: '', unit: '' })
    } else {
      alert("Invalid Credentials");
    }
  }

  const upadateproduct = async (id) => {
    const { name, price, unit } = edit
    const fetchdata = fetch(`http://localhost:6060/api/v1/update-product/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: name, price: price, unit: unit }),
    })
    const response = await fetchdata;
    await response.json();
    if (response.status === 200) {
      handleeditClose();
      getproduct();
    } else {
      alert("Invalid Credentials");
    }
  }

  const getproduct = () => {
    fetch(`http://localhost:6060/api/v1/get-product`)
      .then((res) => {
        return res.json()
      }).then((data) => {
        setData(data)
      })
  }
  const getunit = () => {
    fetch(`http://localhost:6060/api/v1/get-unit`)
      .then((res) => {
        return res.json()
      }).then((data) => {
        setUnit(data)
      })
  }

  function deleteproduct(_id) {
    fetch(`http://localhost:6060/api/v1/delete-product/${_id}`, {
      method: "DELETE"
    }).then((result) => {
      result.json().then((res) => {
        getproduct();
      })
    })
  }

  useEffect(() => {
    getproduct();
    getunit();
  }, [])

  if (!usertoken) {
    return <Home />
  }
  return (
    <>
      < Navbar />
      <div className="container-fluid p-0">
        <div className="page-banner">
          <div className="banner-content-area">
            <div className="container">
              <div className="row">
                <div className="col-12">
                  <h2 className="banner-heading-h2">Products</h2>
                  <h3 className="banner-subheading-h3">Home <span className='mx-3'><i class="fa-solid fa-angle-right"></i></span>Products</h3>
                </div>
              </div>
            </div>
          </div>
          <div className="banner-btm-img">
            <img src={require("../img/banner-btm-img.png")} alt="" />
          </div>
        </div>
      </div>
      <div className='container my-5 pb-5'>
        <div className='row'>
          <div className='col-md-12'>
            <div className='d-flex justify-content-end'>
              <button type="button" class="btn btn-info my-2 text-white" onClick={handleShow}>Add <span><i class="fa-solid fa-plus "></i></span></button>
            </div>
            <div className="card tbl-card mt-3">
              <div className="table-responsive">
                <table class="table table-striped tbl-blue-theme">
                  <thead>
                    <tr>
                      <th>S.no</th>
                      <th>Product</th>
                      <th>Product Rate</th>
                    
                      <th className='text-center'>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data?.product?.map((val, index) => {
                      return (
                        <tr key={index}>
                          <td>{index + 1}</td>
                          <td className='text-capitalize'>{val.name}</td>
                          <td className='text-capitalize'>{val.price}/{val.unit}</td>
                        
                          <td>
                            <div className='d-flex justify-content-center'>
                              <button type="button" class="btn btn-warning mx-1" onClick={() => { handleeditShow(val) }}>Edit <span class="material-symbols-outlined">Edit</span></button>
                              <button type="button" class="btn btn-danger mx-1" data-bs-toggle="modal" data-bs-target="#myModal" onClick={() => { Setdeleteid(val._id) }}>Delete <span class="material-symbols-outlined"> delete </span></button>
                            </div>
                          </td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>


      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header >
          <Modal.Title> <span className="text-red">Add Product</span>  </Modal.Title>
          <button type="button" className="close modal-closebtn" data-dismiss="modal" aria-label="Close" onClick={handleClose}>
            <span aria-hidden="true"><i class="fa-solid fa-xmark"></i></span>
          </button>
        </Modal.Header>
        <Modal.Body>


          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <form >
                  <div class="mb-3 mt-3">
                    <label for="name" class="form-label">Product Name:</label>
                    <input type="text" class="form-control" id="name" placeholder="Product Name" name="name" value={post.name} onChange={handleChange} />
                  </div>
                  <div class="mb-3 mt-3">
                    <label for="name" class="form-label">Product Price:</label>
                    <input type="text" class="form-control" id="name" placeholder="Product Price" name="price" value={post.price} onChange={handleChange} />
                  </div>
                  <div class="mb-3 mt-3">
                    <label for="name" class="form-label" >Product Unit:</label>
                    <select class="form-select" name="unit" onChange={handleChange}>
                      <option value="" disabled selected hidden>Add unit</option>
                      {unit?.data?.map((val, index) => {
                        return (
                          <option className='text-capitalize' key={index} value={val.name} >{val.name}</option>
                        )
                      })}


                    </select>
                  </div>
                  <button type="submit" class="btn btn-info" onClick={addproduct}>Submit</button>
                </form>
              </div>
            </div>
          </div>



        </Modal.Body>
      </Modal>

      <Modal show={showeditModal} onHide={handleeditClose}>
        <Modal.Header >
          <Modal.Title> <span className="text-red">Edit Product</span>  </Modal.Title>
          <button type="button" className="close modal-closebtn" data-dismiss="modal" aria-label="Close" onClick={handleeditClose}>
            <span aria-hidden="true"><i class="fa-solid fa-xmark"></i></span>
          </button>
        </Modal.Header>
        <Modal.Body>


          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <form >
                  <div class="mb-3 mt-3">
                    <label for="name" class="form-label">Product Name:</label>
                    <input type="text" class="form-control" id="name" placeholder="Product Name" name="name" value={edit.name} onChange={handleChanges} />
                  </div>
                  <div class="mb-3 mt-3">
                    <label for="name" class="form-label">Product Price:</label>
                    <input type="text" class="form-control" id="name" placeholder="Product Price" name="price" value={edit.price} onChange={handleChanges} />
                  </div>
                  <div class="mb-3 mt-3">
                    <label for="name" class="form-label" name="unit" onChange={handleChanges}>Product Unit:</label>
                    <select class="form-select">
                      <option value="" disabled selected hidden>{edit.unit}</option>
                      {unit?.data?.map((val, index) => {
                        return (
                          <option className='text-capitalize' value={val.name} key={index}>{val.name}</option>
                        )
                      })}


                    </select>
                  </div>
                  <button type="submit" class="btn btn-info" onClick={() => { upadateproduct(edit._id) }}>Submit</button>
                </form>
              </div>
            </div>
          </div>



        </Modal.Body>
      </Modal>


      <div className="modal fade" id="myModal">
        <div className="modal-dialog">
          <div className="modal-content">


            <div className="modal-header">

              <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
            </div>


            <div className="modal-body">
              Do You Want To Delete Permanently
            </div>


            <div className="modal-footer">
              <button type="button" className="btn" data-bs-dismiss="modal" onClick={() => deleteproduct(deleteid)}>Yes</button>
            </div>

          </div>
        </div>
      </div>


    </>
  )
}

export default Product