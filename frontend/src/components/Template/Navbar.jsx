import React from 'react'
import { Link } from "react-router-dom";

const toggler = () => {
    document.querySelector("#sidebar").classList.toggle("collapsed")
}

const Navbar = () => {

    return (
        <>
            <div className="main-container navbar-container">
                <div className="container ">
                    <nav className="navbar navbar-expand-sm">
                        <div className="container-fluid">
                            <Link className="navbar-brand" to="#">Logo</Link>
                            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#collapsibleNavbar">
                                <span className="navbar-toggler-icon"></span>
                            </button>
                            <div className="collapse navbar-collapse justify-content-center" id="collapsibleNavbar">
                                <ul className="navbar-nav">
                                    <li className="nav-item">
                                        <Link className="nav-link" to="/home/product">Product</Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link className="nav-link" to="/home/customer">Customer</Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link className="nav-link" to="/home/daily-entry">DailyEntry</Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link className="nav-link" to="/home/report">Reports</Link>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </nav>
                </div>
            </div>

            {/* <nav className="navbar navbar-expand px-3 py-0 border-bottom shadow">
                <div className="container-fluid">
                    <Link to="/" className='nav-brand me-5'>
                        <h2>Logo</h2>
                    </Link>
                    <button className='nav-togle-btn hide-mobile' id='sidebar-toggle' type='button' onClick={toggler}>
                        <span className=""><i class="fa-solid fa-bars-staggered"></i></span>
                    </button>
                    <div className="navbar-collapse navbar py-0">
                        <ul className="navbar-nav align-items-center">
                            <li className="nav-item">
                                <form class="d-flex position-relative" role="search">
                                    <input class="form-control me-2 nav-searchbar rounded-pill" type="search" placeholder="Search here..." aria-label="Search" />
                                    <button class="btn search-icon" type="submit"><i class="fa-solid fa-magnifying-glass"></i></button>
                                </form>
                            </li>
                            <li className="nav-item dropdown">
                                <Link to="/" data-bs-toggle="dropdown" className='nav-icon pe-md-0 nav-link'>
                                    <img src={require("../img/profile-img.jpg")} className='avatar profile img-fluid rounded' alt="" />
                                </Link>
                                <div className="dropdown-menu dropdown-menu-end">
                                    <Link to="/" className='dropdown-item'>Profile</Link>
                                    <Link to="/" className='dropdown-item'>Setting</Link>
                                    <Link to="/" className='dropdown-item'>LogOut</Link>
                                </div>
                            </li>
                        </ul>
                    </div>
                    <button className='nav-togle-btn hide-desktop' id='sidebar-toggle' type='button' onClick={toggler}>
                        <span className=""><i class="fa-solid fa-bars-staggered"></i></span>
                    </button>
                </div>
            </nav> */}


        </>
    )
}

export default Navbar