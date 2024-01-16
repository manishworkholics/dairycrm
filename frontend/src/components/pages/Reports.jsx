import React, { useState, useEffect } from 'react'
import Navbar from '../Template/Navbar'
import Home from './Home';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

const Reports = () => {
  const usertoken = sessionStorage.getItem('token')
  const [data, setData] = useState();
  const [datas, setDatas] = useState();
  const [customer, setcustomer] = useState();
  const [startdate, setstartdate] = useState('');
  const [enddate, setenddate] = useState('');

  const getcustomer = () => {
    fetch(`http://206.189.130.102:6060/api/v1/get-customer`)
      .then((res) => {
        return res.json()
      }).then((data) => {
        setData(data)
      })
  }

  const getcustomerbyid = () => {
    fetch(`http://206.189.130.102:6060/api/v1/get-customer/${customer}?startDate=${startdate}&endDate=${enddate}`)
      .then((res) => {
        return res.json()
      }).then((data) => {
        setDatas(data)
      })
  }

  function selectcustomer(e) {
    setcustomer(e.target.value)
  }
  function selectstartdate(e) {
    setstartdate(e.target.value)
  }
  function selectenddate(e) {
    setenddate(e.target.value)
  }

  function clear() {
    window.location.reload()
  }

  useEffect(() => {
    getcustomer();
  }, [])// eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    getcustomerbyid();
  }, [customer])// eslint-disable-line react-hooks/exhaustive-deps

  const exportReport = () => {
    if (!datas?.data?.dailyEntries || datas.data.dailyEntries.length === 0) {
      alert('No data to export.');
      return;
    }

    let totalAmount = 0;

    const pdf = new jsPDF();

    pdf.text('Report Data', 20, 10);

    const headers = [['S.no', 'Product', 'Quantity', 'Price/per unit', 'Amount', 'Order date']];
    const rows = datas.data.dailyEntries.map((val, index) => {
      const amount = val?.products
        ?.map((product) => (parseFloat(product.quantity) || 0) * (parseFloat(product.price) || 0))
        .reduce((acc, curr) => acc + curr, 0);

      totalAmount += amount;

      return [
        index + 1,
        val?.products?.map((product) => product.type).join(', '),
        val?.products?.map((product) => product.quantity).join(', '),
        val?.products?.map((product) => product.price).join(', '),
        amount.toFixed(2), // Display the amount directly in the row
        val.date === null ? 'N/A' : val.date.slice(0, 10),
      ];
    });

    pdf.autoTable({
      head: headers,
      body: rows,
      startY: 20,
      margin: { top: 20 },
    });

    pdf.text(`Total Amount: ${totalAmount.toFixed(2)}`, 20, pdf.autoTable.previous.finalY + 10);

    pdf.save('report.pdf');
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
                    <input class="form-control" type='date' onChange={selectstartdate} />
                  </div>

                  <div className='col-md-3 my-4'>
                    <input class="form-control" type='date' onChange={selectenddate} />
                  </div>

                  <div className='col-lg-3 col-md-12 my-4'>
                    <div className='d-flex'>
                      <button className='btn btn-success rounded-pill mx-3 px-4' onClick={getcustomerbyid}>Find</button>
                      <button className='btn btn-secondary rounded-pill px-4' onClick={clear}>clear</button>
                      <button className='btn btn-primary rounded-pill px-4 mx-3' onClick={exportReport}>Export</button>
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