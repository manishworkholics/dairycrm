import React, { useState, useEffect } from 'react'


const DailyEntry = () => {
  const [data, setData] = useState();

  const getcustomer = () => {
    fetch(`http://localhost:4000/api/v1/get-customer`)
      .then((res) => {
        return res.json()
      }).then((data) => {
        setData(data)
      })
  }

  useEffect(() => {
    getcustomer();
  }, [])

  return (
    <>
      <div className='container mt-5'>
        <div className='row'>
          <div className='col-md-12'>
            <h1 className='text-center mb-5 page-heading'>Daily Entry</h1>
            <div className="table-card">
              <div className="table-responsive">
                <table className="table table-hover">
                  <thead>
                    <tr>
                      <th>S.no</th>
                      <th>Name</th>
                      <th>Product</th>
                      <th>Unit</th>
                      <th>Today Quantity</th>
                      <th>Quantity</th>
                      <th>Quantity</th>
                      <th>Quantity</th>
                      <th>Quantity</th>
                      <th>Quantity</th>
                      <th>Quantity</th>
                      <th>Quantity</th>
                    
             
                    </tr>
                  </thead>
                  <tbody>
                    {data?.data?.map((val, index) => {
                      return (
                        <tr key={index}>
                          <td>{index + 1}</td>
                          <td>{val?.name}</td>
                          <td>{val?.product?.map((val) => {
                            return (
                              <p>{val?.product_name?.name},</p>
                            )
                          })}</td>
                          <td>{val?.product?.map((val) => {
                            return (
                              <p>{val?.product_name?.unit},</p>
                            )
                          })}</td>
                          <td>{val?.product?.map((val) => {
                            return (
                              <input type="text" class="form-control my-2" id="text" value={val?.product_quantity} name="text" />

                            )
                          })}</td>
                          {val?.dailyEntries[0] ? <td>{val?.dailyEntries[0]?.products?.map((val) => { return <p>{val?.quantity}</p> })}</td> : <td>0</td>}
                          {val?.dailyEntries[1] ? <td>{val?.dailyEntries[1]?.products?.map((val) => { return <p>{val?.quantity}</p> })}</td> : <td>0</td>}
                          {val?.dailyEntries[2] ? <td>{val?.dailyEntries[2]?.products?.map((val) => { return <p>{val?.quantity}</p> })}</td> : <td>0</td>}
                          {val?.dailyEntries[3] ? <td>{val?.dailyEntries[3]?.products?.map((val) => { return <p>{val?.quantity}</p> })}</td> : <td>0</td>}
                          {val?.dailyEntries[4] ? <td>{val?.dailyEntries[4]?.products?.map((val) => { return <p>{val?.quantity}</p> })}</td> : <td>0</td>}
                          {val?.dailyEntries[5] ? <td>{val?.dailyEntries[5]?.products?.map((val) => { return <p>{val?.quantity}</p> })}</td> : <td>0</td>}
                          {val?.dailyEntries[6] ? <td>{val?.dailyEntries[6]?.products?.map((val) => { return <p>{val?.quantity}</p> })}</td> : <td>0</td>}
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
    </>
  )
}

export default DailyEntry