import React, { useState, useEffect } from 'react'
import dateFormat from "dateformat";
import { Modal } from "react-bootstrap";

const Cutomer = () => {
  const [deleteid, Setdeleteid] = useState('')
  const [data, setData] = useState();
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

  const addcustomer = async (e) => {
    e.preventDefault();
    const { name, number, adress } = post
    const fetchdata = fetch('http://localhost:4000/api/v1/add-customer', {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: name, number: number, adress: adress, product: more }),
    })
    const response = await fetchdata;
    await response.json();
    if (response.status === 200) {
      alert('cutomer add successfully')
      handleClose();
      getcustomer();
      setmore([]);
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
  }, [])


  // add more code

  const [inputdata, setinputdata] = useState({ name: '', quantity: '' });
  const [more, setmore] = useState([]);

  function handlemore(e) {
    setinputdata({ ...inputdata, [e.target.name]: e.target.value })
  }

  let { name, quantity } = inputdata
  function addmore() {
    setmore([...more, { name, quantity }])
  }


  return (
    <>
      <div className='container mt-5'>
        <div className='row'>
          <div className='col-md-12'>
            <h1 className='text-center mb-5'>Cutomer</h1>
            <button type="button" className="btn btn-info" onClick={handleShow}>Add</button>
            <table className="table table-hover">
              <thead>
                <tr>
                  <th>S.no</th>
                  <th>Name</th>
                  <th>Number</th>
                  <th>Date</th>
                  <th>Action</th>
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
                      <td>
                        <button type="button" className="btn btn-warning mx-1" onClick={() => { handleeditShow(val) }}>edit</button>
                        <button type="button" className="btn btn-danger mx-1" data-bs-toggle="modal" data-bs-target="#myModal" onClick={() => { Setdeleteid(val._id) }}>delete</button>

                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
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

                <div className="mb-3 mt-3" style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <div style={{ width: '120px' }}>
                    <label htmlFor="name" className="form-label" >product:</label>
                    <input type="text" className="form-control" id="name" placeholder="product" name="name" onChange={handlemore} />
                  </div>
                  <div style={{ width: '120px' }}>
                    <label htmlFor="name" className="form-label">quantity:</label>
                    <input type="text" className="form-control" id="quantity" placeholder="quantity" name="quantity" onChange={handlemore} />
                  </div>
                  <div style={{ width: '120px' }}>
                    <label htmlFor="name" className="form-label" >Add more:</label>
                    <button className="btn btn-primary" onClick={addmore} >Add </button>
                  </div>
                </div>
                <div className="mb-3 mt-3">
                  <table class="table">
                    <thead>
                      <tr>
                        <th>product</th>
                        <th>quantity</th>
                        <th>action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {more.map((val, index) => {
                        return (
                          <tr key={index}>
                            <td>{val.name}</td>
                            <td>{val.quantity}</td>
                            <td>action</td>
                          </tr>
                        )
                      })}
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