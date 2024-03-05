import React, { useState, useEffect } from 'react';
import Navbar from '../Template/Navbar'
import Home from './Home';

const DailyEntry = () => {
  const usertoken = sessionStorage.getItem('token')
  const [data, setData] = useState();
  const [selectedDate, setSelectedDate] = useState('');
  const [today, settoday] = useState(getTodayDate());
  const [editedQuantities, setEditedQuantities] = useState({});

  function getTodayDate() {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    return `${day}-${month}-${year}`;
  }

  const handleDateChange = (event) => {
    setSelectedDate(event.target.value);
  };




  
  const getcustomer = () => {
    fetch(`http://localhost:6060/api/v1/get-customer`)
      .then((res) => res.json())
      .then((data) => {
        setData(data);
console.log(data);
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
    getTodayDate();
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

  console.log(data)
  const addbulkentry = () => {
    if (!selectedDate) {
      return alert("please select data first")
    }
    const bulkData = {
      dailyEntries: data?.data?.map((val) => ({
        id: val?._id,
        date: selectedDate,
        products: val?.product?.map((productVal) => ({
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

    fetch("http://localhost:6060/api/v1/milk-buyer/bulk-daily-product-entry", requestOptions)
      .then((res) => res.text())
      .then((data) => {
        alert(data);
        getcustomer();
      });
  };

  const getLastSevenDates = () => {
    // Assuming dailyEntries is already sorted by date
    const lastSevenDates = data?.data[0]?.dailyEntries?.slice(-7).map((entry) => entry?.date) || [];
    return lastSevenDates?.reverse();
  };

  const lastSevenDates = getLastSevenDates();

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
                  <h2 className="banner-heading-h2">Daily Entry </h2>
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
                <h4 className='mb-0 me-3'>Today Date : {today}</h4>
              </div>
              <div className="table-responsive">
                <table className="table table-striped tbl-blue-theme w-max-content daily-entry-data-tbl">
                  <thead>
                    <tr>
                      <th>S.no</th>
                      <th>Name</th>
                      <th className='d-none-mobile'>Product</th>
                      <th>Today Qty</th>

                      {lastSevenDates?.map((date, index) => (
                        // new Date(date).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })
                        // new Date(date).toLocaleDateString('en-US', {  day: '2-digit', month: 'short', year: 'numeric' })
                        //  <th key={index}>{new Date(date).toLocaleDateString('en-IN',{day: '2-digit', month: 'short', year: 'numeric' })}</th>
                        <th key={index}>{new Date(date).toLocaleDateString('en-IN', { day: '2-digit' })}/{new Date(date).toLocaleDateString('en-IN', { month: 'numeric' })}</th>



                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {data?.data.map((val, index) => (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{val?.name}</td>
                        <td className='text-center'>
                        {val.product.map(product => (
                            <li key={product._id._id}>
                                <p>{product?.product_name?.name}</p>
                               
                            </li>
                        ))}
                        </td>
                        <td className=''>
                          {val?.product?.map((productVal) => {
                            const customerId = val?._id;
                            const productId = productVal?.product_name?._id;
                            const quantity = editedQuantities[customerId]?.[productId] || productVal?.product_quantity;

                            return (
                              <input
                                key={productId}
                                type="number"
                                className="form-control my-2 mx-auto"
                                value={quantity}
                                onChange={(e) => handleQuantityChange(customerId, productId, e.target.value)}
                              />
                            );
                          })}
                        </td>
                        {lastSevenDates.map((date, index) => (
                          <td key={index}>
                            {val?.dailyEntries.find(entry => entry?.date === date) ? (
                              val?.dailyEntries.find(entry => entry?.date === date)?.products?.map((entry) => (
                                <p key={entry?.type}>{entry?.quantity}</p>
                              ))
                            ) : (
                              <p>0</p>
                            )}
                          </td>
                        ))}
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
