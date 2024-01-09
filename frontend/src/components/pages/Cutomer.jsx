import React, { useState, useEffect } from 'react'
import dateFormat from "dateformat";
import { Modal } from "react-bootstrap";

const Cutomer = () => {
  const [deleteid, Setdeleteid] = useState('')
  const [data, setData] = useState();
  const [product, setproduct] = useState();
  const [post, setPost] = useState({ name: '', number: '', adress: '', product: '' });
  const [edit, setedit] = useState({ name: '', number: '', adress: '' });
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

  const getproduct = () => {
    fetch(`http://localhost:4000/api/v1/get-product`)
      .then((res) => {
        return res.json()
      }).then((data) => {
        setproduct(data)
      })
  }

  const addcustomer = async (e) => {
    e.preventDefault();
    const { name, number, adress } = post
    const fetchdata = fetch('http://localhost:4000/api/v1/add-customer', {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: name, number: number, adress: adress, product: inputList }),
    })
    const response = await fetchdata;
    await response.json();
    if (response.status === 200) {
      alert('cutomer add successfully')
      handleClose();
      getcustomer();
      setInputList([{ id: 1, product_name: '', product_quantity: '' },])
      setPost({ name: '', number: '', adress: '' })
    } else {
      alert("Invalid Credentials");
    }
  }

  const upadateproduct = async (id) => {
    const { name, number, adress } = edit
    const fetchdata = fetch(`http://localhost:4000/api/v1/update-customer/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: name, number: number, adress: adress }),
    })
    const response = await fetchdata;
    await response.json();
    if (response.status === 200) {
      handleeditClose();
      getcustomer();
    } else {
      alert("Invalid Credentials");
    }
  }

  const getcustomer = () => {
    fetch(`http://localhost:4000/api/v1/get-customer`)
      .then((res) => {
        return res.json()
      }).then((data) => {
        setData(data)
      })
  }

  function deleteproduct(_id) {
    fetch(`http://localhost:4000/api/v1/delete-customer/${_id}`, {
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


  const [inputList, setInputList] = useState([{ id: 1, product_name: '', product_quantity: '' },]);

  // Add new input fields
  const handleAddInput = () => {
    const newId = inputList[inputList.length - 1].id + 1;
    setInputList([...inputList, { id: newId, product_name: '', product_quantity: '' }]);
  };

  // Remove input fields
  const handleRemoveInput = (id) => {
    const updatedList = inputList.filter((item) => item.id !== id);
    setInputList(updatedList);
  };

  // Handle input change for both fields
  const handleInputChange = (id, field, event) => {
    const newInputList = inputList.map((item) =>
      item.id === id ? { ...item, [field]: event.target.value } : item
    );
    setInputList(newInputList);
  };

  return (
    <>
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
              <button type="button" className="btn btn-info px-5 my-1" onClick={handleShow}>Add <span><i class="fa-solid fa-plus"></i></span></button>
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
                            <button type="button" className="btn btn-warning mx-1" onClick={() => { handleeditShow(val) }}>edit <span class="material-symbols-outlined">edit</span></button>
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
          <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={handleClose}>
            <span aria-hidden="true">&times;</span>
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
                  <table>
                    <thead>
                      <tr className='row d-flex justify-content-between'>
                        <th className='col-4 text-center'>Product</th>
                        <th className='col-4 text-center'>Quantity</th>
                        <th className='col-4 text-center'>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {inputList.map((item, index) => (
                        <tr key={index} className='row d-flex justify-content-between mb-3'>
                          <td className='col-4 text-center'>
                            <select className='me-4' style={{ width: '120px' }} class="form-select" onChange={(e) => handleInputChange(item.id, 'product_name', e)}>
                              <option value="" disabled selected hidden>Select Product</option>
                              {product?.product?.map((val, index) => {
                                return (
                                  <option key={index} value={val._id}>{val.name}/{val.unit}</option>
                                )
                              })}


                            </select>

                          </td>

                          <td className='col-4 text-center'>
                            <input
                              type="text"
                              value={item.product_quantity}
                              onChange={(e) => handleInputChange(item.id, 'product_quantity', e)}
                              placeholder="quantity"
                              style={{ width: '120px' }}
                              className='me-4 form-control'
                            />
                          </td>
                          <td className='col-4 '>
                            {inputList.length > 1 && (
                              <div> <button className="btn btn-secondary" onClick={() => handleRemoveInput(item.id)}>Remove</button></div>
                            )}
                            {index === inputList.length - 1 && (
                              <div> <button className='btn btn-success mt-3' onClick={handleAddInput}>Add More</button></div>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <button type="submit" className="btn btn-primary" onClick={addcustomer}>Submit</button>
              </div>
            </div>
          </div>
        </Modal.Body>
      </Modal>

      <Modal show={showeditModal} onHide={handleeditClose}>
        <Modal.Header >
          <Modal.Title> <span className="text-red">Edit Cutomer</span>  </Modal.Title>
          <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={handleeditClose}>
            <span aria-hidden="true">&times;</span>
          </button>
        </Modal.Header>
        <Modal.Body>
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <form >
                  <div className="mb-3 mt-3">
                    <label htmlFor="name" className="form-label">Cutomer Name:</label>
                    <input type="text" className="form-control" id="name" name="name" value={edit.name} onChange={handleChanges} />
                  </div>
                  <div className="mb-3 mt-3">
                    <label htmlFor="name" className="form-label">Cutomer Number:</label>
                    <input type="text" className="form-control" id="name" name="number" value={edit.number} onChange={handleChanges} />
                  </div>
                  <div className="mb-3 mt-3">
                    <label htmlFor="name" className="form-label">Cutomer Adress:</label>
                    <input type="text" className="form-control" id="name" name="adress" value={edit.adress} onChange={handleChanges} />
                  </div>
                  <button type="submit" className="btn btn-primary" onClick={() => { upadateproduct(edit._id) }}>Submit</button>
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



export default Cutomer