import React from 'react'
import { Link } from 'react-router-dom'


const Sidebar = () => {
    return (
        <>
            <aside id="sidebar" className='sidebar'>
                <div className=" h-100">
                    <ul className="sidebar-nav mt-3">
                        <li className="sidebar-item active">
                            <Link to="/home/product" className="sidebar-link" aria-label="Tooltip Right" tooltip-position="right">
                                <i class="fa-solid fa-list"></i>
                                <span>Product</span>
                            </Link>
                        </li>
                        <li className="sidebar-item">
                            <Link to="/home/customer" className="sidebar-link">
                                <i class="fa-solid fa-chart-pie"></i>
                                <span>Customer</span>
                            </Link>
                        </li>
                        <li className="sidebar-item">
                            <Link to="/home/daily-entry" className="sidebar-link">
                                <i class="fa-solid fa-star"></i>
                                <span>Daily Entry</span>
                            </Link>
                        </li>
                        <li className="sidebar-item">
                            <Link to="/home/report" className="sidebar-link">
                                <i class="fa-solid fa-cog"></i>
                                <span>Reports</span>
                            </Link>
                        </li>
                        <li className="sidebar-item log-out">
                            <Link to="/" className="sidebar-link">
                                <i class="fa-solid fa-sign-out"></i>
                                <span className=''>Logout</span>
                            </Link>
                        </li>

                    </ul>
                </div>

            </aside>
        </>
    )
}

export default Sidebar