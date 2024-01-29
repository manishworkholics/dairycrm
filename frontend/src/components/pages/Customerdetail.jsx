import React, { useState, useEffect } from 'react'
// import dateFormat from "dateformat";
import { Modal } from "react-bootstrap";
import Navbar from '../Template/Navbar'
import { Link } from 'react-router-dom';
import Home from './Home';

const Customerdetail = () => {
    const usertoken = sessionStorage.getItem('token')

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
                                    <h2 className="banner-heading-h2">Customer</h2>
                                    <h3 className="banner-subheading-h3">Home <span className='mx-3'><i class="fa-solid fa-angle-right"></i></span>Customer Detail</h3>
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
                    <div className="col-12 col-md-4">
                        <div className="card customer-detail-left-card">
                            <div className="customer-img">
                                <img src={require("../img/customer-img.png")} alt="" />
                            </div>
                            <div className="customer-name">
                                <h5>John Doe</h5>
                                <h6>Author</h6>
                            </div>
                            <div className="customer-detail">
                                <table class="table">
                                    <tbody>
                                        <tr>
                                            <th scope="row">Mobile No.</th>
                                            <td>1234567890</td>
                                        </tr>
                                        <tr>
                                            <th scope="row">Address</th>
                                            <td>123 sector 'A', Abc Nagar, Abc City</td>
                                        </tr>
                                        <tr>
                                            <th scope="row">Total Amount</th>
                                            <td><span><i class="fa-solid fa-indian-rupee-sign"></i></span> 00.00</td>
                                        </tr>
                                        <tr>
                                            <th scope="row">Paid Amount</th>
                                            <td><span><i class="fa-solid fa-indian-rupee-sign"></i></span> 00.00</td>
                                        </tr>
                                        <tr>
                                            <th scope="row">Due Amount </th>
                                            <td><span><i class="fa-solid fa-indian-rupee-sign"></i></span> 00.00</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                    <div className="col-12 col-md-8">
                        <div className="card customer-detail-right-card">
                            <div className="row">
                                <div className="col-md-12 px-4">
                                    <div className="row">
                                        <div className='col-6 col-md-3 my-2 date-picker'>
                                            <input class="form-control" type='date' placeholder='From' />
                                        </div>

                                        <div className='col-6 col-md-3 my-2 date-picker'>
                                            <input class="form-control" type='date' />
                                        </div>

                                        <div className='col-lg-6 col-md-12 my-2'>
                                            <div className='d-flex justify-content-around'>
                                                <button className='btn btn-success rounded-pill px-4'>Find</button>
                                                <button className='btn btn-secondary rounded-pill px-4'>clear</button>
                                                <button className='btn btn-primary rounded-pill px-4'>Invoice</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className='col-md-12 p-0 mt-2'>
                                    <div className="table-responsive">
                                        <table class="table table-striped tbl-blue-theme customer-detail-tbl">
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
                                                <tr>
                                                    <td></td>
                                                    <td></td>
                                                    <td></td>
                                                    <td></td>
                                                    <td></td>
                                                    <td></td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Customerdetail