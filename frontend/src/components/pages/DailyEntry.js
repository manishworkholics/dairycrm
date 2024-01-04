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
            <h1 className='text-center mb-5'>Customer</h1>

            <table className="table table-hover">
              <thead>
                <tr>
                  <th>S.no</th>
                  <th>Name</th>
                  <th>Product</th>
                  <th>Unit</th>
                  <th>Quantity</th>
                  <th>Total Qty</th>
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
                          <input type="text" class="form-control" id="text" value={val?.product_quantity} name="text" />
                         
                        )
                      })}</td>
                      <td><input type="text" class="form-control" id="text" name="text" /></td>
                    
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

export default DailyEntry