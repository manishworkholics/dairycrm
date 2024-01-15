import React, { useState, useEffect } from 'react'
import dateFormat from "dateformat";
import { Modal } from "react-bootstrap";
import Navbar from '../Template/Navbar'
import { Link } from 'react-router-dom';

const Cutomer = () => {
  const [inputData, setInputData] = useState({ id: 1, product_name: '', product_quantity: '' })
  const [deleteid, Setdeleteid] = useState('')
  const [data, setData] = useState();
  const [product, setproduct] = useState();
  const [post, setPost] = useState({ name: '', number: '', adress: '', product: [] });

  const [showModal, setShowModal] = useState(false);
  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);


  const [catArray, setCatArray] = useState([])
  const [index, setIndex] = useState()
  const [bolin, setBolin] = useState(false)

  const catChange = (e) => {
    setInputData({ ...inputData, [e.target.name]: e.target.value })
  }

  let { product_name, product_quantity } = inputData
  const addinputdata = () => {
    if (product_name === '' && product_quantity === '') {
      alert('Please fill the fields')
    } else {
      setCatArray([...catArray, { product_name, product_quantity }])
      setInputData({ product_name: '', product_quantity: '' })
    }
  }
  const deleteCat = (i) => {
    let total = [...catArray]
    total.splice(i, 1)
    setCatArray(total)
  }
  const updateCat = (i) => {
    let { product_name, product_quantity } = catArray[i]
    setInputData({ product_name, product_quantity })
    setBolin(true)
    setIndex(i)
  }
  const updateinfo = () => {
    let total = [...catArray]
    total.splice(index, [1], { product_name, product_quantity })
    setCatArray(total)
    setBolin(false)
    setInputData({ product_name, product_quantity })

  }



  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setPost({ ...post, [name]: value });
  };

  const getproduct = () => {
    fetch(`http://206.189.130.102:6060/api/v1/get-product`)
      .then((res) => {
        return res.json()
      }).then((data) => {
        setproduct(data)
      })
  }

  const addcustomer = async (e) => {
    e.preventDefault();
    const { name, number, adress } = post
    const fetchdata = fetch('http://206.189.130.102:6060/api/v1/add-customer', {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: name, number: number, adress: adress, product: catArray }),
    })
    const response = await fetchdata;
    await response.json();
    if (response.status === 200) {
      alert('cutomer add successfully')
      handleClose();
      getcustomer();
      setPost({ name: '', number: '', adress: '' })
    } else {
      alert("Invalid Credentials");
    }
  }

  const getcustomer = () => {
    fetch(`http://206.189.130.102:6060/api/v1/get-customer`)
      .then((res) => {
        return res.json()
      }).then((data) => {
        setData(data)
      })
  }

  function deleteproduct(_id) {
    fetch(`http://206.189.130.102:6060/api/v1/delete-customer/${_id}`, {
      method: "DELETE"
    }).then((result) => {
      result.json().then((res) => {
        getcustomer();
      })
    })
  }

  useEffect(() => {
    getcustomer();
    getproduct();
  }, [])

  const renderProductName = (productId) => {
    const productItem = product?.product?.find((val) => val._id === productId);
    return productItem?.name || '';
  };

  return (
    <>
      < Navbar />
      <div className="container-fluid p-0">
        <div className="page-banner">
          <div className="banner-content-area">
            <div className="container">
              <div className="row">
                <div className="col-12">
                  <h2 className="banner-heading-h2">Customer</h2>
                  <h3 className="banner-subheading-h3">Home <span className='mx-3'><i class="fa-solid fa-angle-right"></i></span>Customer</h3>
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
              <button type="button" className="btn btn-info my-1" onClick={handleShow}>Add <span><i class="fa-solid fa-plus"></i></span></button>
            </div>
            <div className="card tbl-card mt-3">
              <div className="table-responsive">
                <table className="table table-striped tbl-blue-theme">
                  <thead>
                    <tr>
                      <th>S.no</th>
                      <th>Name</th>
                      <th>Number</th>
                      <th>Date</th>
                      <th className='text-center'>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data?.data?.map((val, index) => {
                      return (
                        <tr key={index}>
                          <td>{index + 1}</td>
                          <td>{val.name}</td>
                          <td>{val.number}</td>
                          <td>{dateFormat(val.createdAt)}</td>
                          <td className='d-flex justify-content-center'>
                            <Link to={`/home/edit-customer/${val?._id}`} state={{ data: val }} className="btn btn-warning mx-1" >edit <span class="material-symbols-outlined">edit</span></Link>
                            <button type="button" className="btn btn-danger mx-1" data-bs-toggle="modal" data-bs-target="#myModal" onClick={() => { Setdeleteid(val._id) }}>delete <span class="material-symbols-outlined"> delete </span></button>
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
          <Modal.Title> <span className="text-red">Add Cutomer</span>  </Modal.Title>
          <button type="button" className="close modal-closebtn" data-dismiss="modal" aria-label="Close" onClick={handleClose}>
            <span aria-hidden="true"><i class="fa-solid fa-xmark"></i></span>
          </button>
        </Modal.Header>
        <Modal.Body>
          <div className="container">
            <div className="row">
              <div className="col-md-12">

                <div className="mb-3 mt-3">
                  <label htmlFor="name" className="form-label"> Name:</label>
                  <input type="text" className="form-control" id="name" placeholder="Cutomer Name" name="name" value={post.name} onChange={handleChange} />
                </div>
                <div className="mb-3 mt-3">
                  <label htmlFor="name" className="form-label">Number:</label>
                  <input type="text" className="form-control" id="name" placeholder="Cutomer Number" name="number" value={post.number} onChange={handleChange} />
                </div>
                <div className="mb-3 mt-3">
                  <label htmlFor="name" className="form-label">Adress:</label>
                  <input type="text" className="form-control" id="name" placeholder="Cutomer address" name="adress" value={post.adress} onChange={handleChange} />
                </div>

                <div className="mb-3 mt-3">
                  <div className="col-md-4">
                    <label htmlFor="name" className='inputHead'>Product</label> <br />
                    <select class="form-select inputAdd" name='product_name' value={inputData.product_name || product_name || ''} onChange={catChange}>
                      <option value="">Select product</option>
                      {product?.product?.map((val, index) => {
                        return (
                          <>
                            <option key={index} value={val?._id} >{val.name}</option>
                          </>
                        )
                      })}
                    </select>
                  </div>
                  <div className="col-md-4">
                    <label htmlFor="name" className='inputHead'>Quantity</label> <br />
                    <input type="number" className='inputAdd' name='product_quantity' placeholder='Enter number' value={inputData.product_quantity || ''} onChange={catChange} />
                  </div>
                  <div className="col-md-4 ">
                    <div className="row addfarmHead placebtn">
                      <div>
                        <button className='addmultis' onClick={!bolin ? addinputdata : updateinfo}>
                          {!bolin ? `Add product` : `Update product`}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mb-3 mt-3">
                  <table class="table">
                    <thead className='tableBord cattable'>
                      <tr className='fcolor'>
                        <th>Product</th>
                        <th>Quantity</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {catArray &&
                        catArray.map((item, i) => {
                          return (
                            <tr key={i}>
                              <td>{renderProductName(item.product_name)}</td>
                              <td>{item.product_quantity}</td>
                              <td>
                                <button onClick={() => updateCat(i)} className="delbtn">
                                  <span className="material-symbols-outlined action-icon">edit</span>
                                </button>
                                <button onClick={() => deleteCat(i)} className="delbtn">
                                  <span className="material-symbols-outlined action-icon">delete</span>
                                </button>
                              </td>
                            </tr>
                          );
                        })}
                    </tbody>
                  </table>
                </div>

                <button type="submit" className="btn btn-info" onClick={addcustomer}>Submit</button>
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



export default Cutomer