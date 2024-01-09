import React, { useState, useEffect } from 'react'

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
      <div className='container mt-3'>
        <div className='row'>
          <h1 className='text-center'>Reports</h1>
          <div className='col-md-3'>

            <select class="form-select" onChange={selectcustomer}>
              <option value="" disabled selected hidden>Select Name</option>
              {data?.data?.map((val, index) => {
                return (
                  <option key={index} value={val._id}>{val.name}</option>
                )
              })}
            </select>

          </div>

          <div className='col-md-3 '>
            <input class="form-control" type='date' />
          </div>

          <div className='col-md-3 '>
            <input class="form-control" type='date' />
          </div>

          <div className='col-md-3 '>
            <div className='d-flex'>
              <button className='btn btn-primary mx-2'>Find</button>
              <button className='btn btn-primary'>clear</button>
            </div>
          </div>

          <div className='col-md-12 mt-3'>
            <table class="table table-hover">

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
    </>
  )
}

export default Reports