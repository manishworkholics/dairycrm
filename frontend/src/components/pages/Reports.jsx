import React, { useState, useEffect } from 'react'
import Navbar from '../Template/Navbar'
const Reports = () => {
  const [data, setData] = useState();
  const [datas, setDatas] = useState();
  const [customer, setcustomer] = useState();

  const getcustomer = () => {
    fetch(`http://206.189.130.102:6060/api/v1/get-customer`)
      .then((res) => {
        return res.json()
      }).then((data) => {
        setData(data)
      })
  }

  const getcustomerbyid = () => {
    fetch(`http://206.189.130.102:6060/api/v1/get-customer/${customer}`)
      .then((res) => {
        return res.json()
      }).then((data) => {
        setDatas(data)
      })
  }

  function selectcustomer(e) {
    setcustomer(e.target.value)
  }

  useEffect(() => {
    getcustomer();
  }, [])// eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    getcustomerbyid();
  }, [customer])// eslint-disable-line react-hooks/exhaustive-deps



  return (
    <>
    < Navbar/>
      <div className="container-fluid p-0">
        <div className="page-banner">
          <div className="banner-content-area">
            <div className="container">
              <div className="row">
                <div className="col-12">
                  <h2 className="banner-heading-h2">Reports</h2>
                  <h3 className="banner-subheading-h3">Home <span className='mx-3'><i class="fa-solid fa-angle-right"></i></span>Reports</h3>
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
          <div className="card tbl-card mt-3">
            <div className="row">
              <div className="col-md-12 px-4">
                <div className="row">
                  <div className='col-md-3 my-4'>

                    <select class="form-select" onChange={selectcustomer}>
                      <option value="" disabled selected hidden>Select Name</option>
                      {data?.data?.map((val, index) => {
                        return (
                          <option key={index} value={val._id}>{val.name}</option>
                        )
                      })}
                    </select>

                  </div>

                  <div className='col-md-3 my-4'>
                    <input class="form-control" type='date' />
                  </div>

                  <div className='col-md-3 my-4'>
                    <input class="form-control" type='date' />
                  </div>

                  <div className='col-lg-3 col-md-12 my-4'>
                    <div className='d-flex'>
                      <button className='btn btn-success rounded-pill mx-3 px-4'>Find</button>
                      <button className='btn btn-secondary rounded-pill px-4'>clear</button>
                    </div>
                  </div>
                </div>
              </div>
              <div className='col-md-12 mt-3 p-0'>
                <div className="table-responsive">
                  <table class="table table-striped tbl-blue-theme">

                    <thead>
                      <tr>
                        <th>S.no</th>
                        <th>Product</th>
                        <th>Quantity</th>
                        <th>Price/per unit</th>
                        <th>Amount</th>
                        <th>Order date</th>
                      </tr>
                    </thead>

                    <tbody>
                      {datas?.data?.dailyEntries?.map((val, index) => {
                        return (
                          <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{val?.products?.map((val) => {
                              return (
                                <p>{val?.type},</p>
                              )
                            })}</td>
                            <td>{val?.products?.map((val) => {
                              return (
                                <p>{val?.quantity},</p>
                              )
                            })}</td>
                            <td>{val?.products?.map((val) => {
                              return (
                                <p>{val?.price},</p>
                              )
                            })}</td>
                            <td>{val?.products?.map((val) => {
                              return (
                                <p>{(parseFloat(val?.quantity) || 0) * (parseFloat(val?.price) || 0)}</p>
                              )
                            })}</td>
                            {val?.date === null ? 0 : <td>{val?.date.slice(0, 10)}</td>}

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
      </div>
    </>
  )
}

export default Reports