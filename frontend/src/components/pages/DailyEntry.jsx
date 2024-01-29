import React, { useState, useEffect } from 'react';
import Navbar from '../Template/Navbar'
import Home from './Home';

const DailyEntry = () => {
  const usertoken = sessionStorage.getItem('token')
  const [data, setData] = useState();
  const [selectedDate, setSelectedDate] = useState('');
  const [editedQuantities, setEditedQuantities] = useState({});


  const handleDateChange = (event) => {
    setSelectedDate(event.target.value);
  };
  const getcustomer = () => {
    fetch(`http://206.189.130.102:6060/api/v1/get-customer`)
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
    if (!selectedDate) {
      return alert("please select data first")
    }
    const bulkData = {
      dailyEntries: data?.data?.map((val) => ({
        id: val._id,
        date: selectedDate,
        products: val.product?.map((productVal) => ({
          type: productVal?.product_name?.name,
          price: productVal?.product_name?.price,
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

    fetch("http://206.189.130.102:6060/api/v1/milk-buyer/bulk-daily-product-entry", requestOptions)
      .then((res) => res.text())
      .then((data) => {
        alert(data);
        getcustomer();
      });
  };

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
                  <h2 className="banner-heading-h2">Daily Entry</h2>
                  <h3 className="banner-subheading-h3">Home <span className='mx-3'><i class="fa-solid fa-angle-right"></i></span>Daily Entry</h3>
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
            <div className="card tbl-card my-3">
              <div className='card-date-selector p-4'>
                <div className="card-heading">
                  <h4 className='mb-0 me-3'>Selected Date : {selectedDate}</h4>
                </div>
                <div className="">
                  <input
                    className="form-control "
                    type='date'
                    value={selectedDate}
                    onChange={handleDateChange}
                  />
                </div>
              </div>
              <div className="table-responsive">
                <table className="table table-striped tbl-blue-theme w-max-content daily-entry-data-tbl">
                  <thead>
                    <tr>
                      <th>S.no</th>
                      <th>Name</th>
                      <th>Product</th>
                      {/* <th>Unit</th> */}
                      <th>Today Quantity</th>
                      {data?.data[0]?.dailyEntries.slice(0, 7).reverse().map((entry, index) => (
                        <th key={index}>{new Date(entry.date).toLocaleDateString()}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {data?.data?.map((val, index) => (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{val?.name}</td>
                        <td className='text-start'>{val?.product?.map((val) => {
                          return (
                            <p>{val?.product_name?.name},</p>
                          )
                        })}</td>
                        {/* <td>{val?.product?.map((val) => {
                          return (
                            <p>{val?.product_name?.unit},</p>
                          )
                        })}</td> */}
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
              </div>
            </div>
            <div className='d-flex justify-content-end'>
              <button type='button' className='btn btn-info my-lg-3 mt-md-3' onClick={addbulkentry}> Add Entry <span><i class="fa-solid fa-plus"></i></span></button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DailyEntry;
