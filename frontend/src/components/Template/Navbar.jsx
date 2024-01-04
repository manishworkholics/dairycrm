import React from 'react'
import { Link } from "react-router-dom";

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
                                    {/* <li className="nav-item dropdown">
                                <Link className="nav-link dropdown-toggle" to="#" role="button" data-bs-toggle="dropdown">Dropdown</Link>
                                <ul className="dropdown-menu">
                                    <li><Link className="dropdown-item" to="#">Link</Link></li>
                                    <li><Link className="dropdown-item" to="#">Link</Link></li>
                                    <li><Link className="dropdown-item" to="#">Link</Link></li>
                                </ul>
                            </li> */}
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