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
                            <Link className="navbar-brand" to="#">Dairy</Link>
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
        </>
    )
}

export default Navbar