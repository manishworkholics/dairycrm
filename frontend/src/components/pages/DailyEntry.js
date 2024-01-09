import React, { useState, useEffect } from 'react';

const DailyEntry = () => {
  const [data, setData] = useState();
  const [editedQuantities, setEditedQuantities] = useState({});

  const getcustomer = () => {
    fetch(`http://localhost:4000/api/v1/get-customer`)
      .then((res) => res.json())
      .then((data) => {
        setData(data);

        // Populate editedQuantities with default quantities from data
        const defaultQuantities = {};
        data.data.forEach((customer) => {
          customer.product.forEach((product) => {
            defaultQuantities[customer._id] = {
              ...defaultQuantities[customer._id],
              [product.product_name._id]: product.product_quantity
            };
          });
        });
        setEditedQuantities(defaultQuantities);
      });
  };

  useEffect(() => {
    getcustomer();
  }, []);

  const handleQuantityChange = (customerId, productId, newValue) => {
    setEditedQuantities(prevState => ({
      ...prevState,
      [customerId]: {
        ...prevState[customerId],
        [productId]: newValue
      }
    }));
  };

  const addbulkentry = () => {
    const bulkData = {
      dailyEntries: data?.data?.map((val) => ({
        id: val._id,
        date: "2024-01-02",
        products: val.product?.map((productVal) => ({
          type: productVal?.product_name?.name,
          quantity: editedQuantities[val._id]?.[productVal.product_name._id] || productVal?.product_quantity
        }))
      }))
    };

    const requestOptions = {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(bulkData),
      redirect: 'follow'
    };

    fetch("http://localhost:4000/api/v1/milk-buyer/bulk-daily-product-entry", requestOptions)
      .then((res) => res.text())
      .then((data) => {
        alert(data);
        getcustomer();
      });
  };

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
                    {data?.data?.map((val, index) => (
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
                        <td>
                          {val?.product?.map((productVal) => {
                            const customerId = val._id;
                            const productId = productVal.product_name._id;
                            const quantity = editedQuantities[customerId]?.[productId] || productVal.product_quantity;

                            return (
                              <input
                                type="number"
                                className="form-control my-2"
                                value={quantity}
                                onChange={(e) => handleQuantityChange(customerId, productId, e.target.value)}
                              />
                            );
                          })}
                        </td>
                        {val?.dailyEntries[0] ? <td>{val?.dailyEntries[0]?.products?.map((val) => { return <p>{val?.quantity}</p> })}</td> : <td>0</td>}
                        {val?.dailyEntries[1] ? <td>{val?.dailyEntries[1]?.products?.map((val) => { return <p>{val?.quantity}</p> })}</td> : <td>0</td>}
                        {val?.dailyEntries[2] ? <td>{val?.dailyEntries[2]?.products?.map((val) => { return <p>{val?.quantity}</p> })}</td> : <td>0</td>}
                        {val?.dailyEntries[3] ? <td>{val?.dailyEntries[3]?.products?.map((val) => { return <p>{val?.quantity}</p> })}</td> : <td>0</td>}
                        {val?.dailyEntries[4] ? <td>{val?.dailyEntries[4]?.products?.map((val) => { return <p>{val?.quantity}</p> })}</td> : <td>0</td>}
                        {val?.dailyEntries[5] ? <td>{val?.dailyEntries[5]?.products?.map((val) => { return <p>{val?.quantity}</p> })}</td> : <td>0</td>}
                        {val?.dailyEntries[6] ? <td>{val?.dailyEntries[6]?.products?.map((val) => { return <p>{val?.quantity}</p> })}</td> : <td>0</td>}
                      </tr>
                    ))}
                  </tbody>
                </table>
                <button type='button' className='btn btn-primary mt-3' onClick={addbulkentry}>
                  Add Entry
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DailyEntry;
