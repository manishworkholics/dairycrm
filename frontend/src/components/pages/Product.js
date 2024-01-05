import React, { useState, useEffect } from 'react'
import dateFormat from "dateformat";
import { Modal } from "react-bootstrap";


const Product = () => {
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
    const fetchdata = fetch('http://localhost:4000/api/v1/add-product', {
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
    const fetchdata = fetch(`http://localhost:4000/api/v1/update-product/${id}`, {
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
    fetch(`http://localhost:4000/api/v1/get-product`)
      .then((res) => {
        return res.json()
      }).then((data) => {
        setData(data)
      })
  }
  const getunit = () => {
    fetch(`http://localhost:4000/api/v1/get-unit`)
      .then((res) => {
        return res.json()
      }).then((data) => {
        setUnit(data)
      })
  }

  function deleteproduct(_id) {
    fetch(`http://localhost:4000/api/v1/delete-product/${_id}`, {
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


  return (
    <>
      
              <div className='container mt-5'>
                <div className='row'>
                  <div className='col-md-12'>
                    <h1 className='text-center mb-5 page-heading'>Products</h1>
                    <button type="button" class="btn btn-info px-5 my-4" onClick={handleShow}>Add <span><i class="fa-solid fa-plus"></i></span></button>
                    <div className="table-card">
                      <div className="table-responsive">
                        <table class="table table-hover">
                          <thead>
                            <tr>
                              <th>S.no</th>
                              <th>Product</th>
                              <th>Product Rate</th>
                              <th>Date</th>
                              <th>Action</th>
                            </tr>
                          </thead>
                          <tbody>
                            {data?.product?.map((val, index) => {
                              return (
                                <tr key={index}>
                                  <td>{index + 1}</td>
                                  <td>{val.name}</td>
                                  <td>{val.price}/{val.unit}</td>
                                  <td>{dateFormat(val.createdAt)}</td>
                                  <td className='d-flex'>
                                    <button type="button" class="btn btn-warning mx-1" onClick={() => { handleeditShow(val) }}>edit <span class="material-symbols-outlined">edit</span></button>
                                    <button type="button" class="btn btn-danger mx-1" data-bs-toggle="modal" data-bs-target="#myModal" onClick={() => { Setdeleteid(val._id) }}>delete <span class="material-symbols-outlined"> delete </span></button>
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
          <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={handleClose}>
            <span aria-hidden="true">&times;</span>
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
                      <option value="" disabled selected hidden>add unit</option>
                      {unit?.data?.map((val, index) => {
                        return (
                          <option key={index} value={val.name} >{val.name}</option>
                        )
                      })}


                    </select>
                  </div>
                  <button type="submit" class="btn btn-primary" onClick={addproduct}>Submit</button>
                </form>
              </div>
            </div>
          </div>



        </Modal.Body>
      </Modal>

      <Modal show={showeditModal} onHide={handleeditClose}>
        <Modal.Header >
          <Modal.Title> <span className="text-red">Edit Product</span>  </Modal.Title>
          <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={handleeditClose}>
            <span aria-hidden="true">&times;</span>
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
                          <option value={val.name} key={index}>{val.name}</option>
                        )
                      })}


                    </select>
                  </div>
                  <button type="submit" class="btn btn-primary" onClick={() => { upadateproduct(edit._id) }}>Submit</button>
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