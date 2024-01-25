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
                                    <h3 className="banner-subheading-h3">Home <span className='mx-3'><i class="fa-solid fa-angle-right"></i></span>Customer</h3>
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

                </div>
            </div>








        </>
    )
}

export default Customerdetail