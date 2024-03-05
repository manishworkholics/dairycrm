import React, { useState, useEffect } from 'react'
import Navbar from '../Template/Navbar'
import { useLocation } from 'react-router-dom';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import Home from './Home';

const Customerdetail = () => {
    let location = useLocation();
    const { data } = location.state
    const usertoken = sessionStorage.getItem('token')

    const [currentDate, setCurrentDate] = useState('');

    useEffect(() => {
        const currentDate = new Date();
        const options = { month: 'long', day: 'numeric', year: 'numeric' };
        const formattedDate = currentDate.toLocaleDateString('en-US', options);
        setCurrentDate(formattedDate);
    }, []);

    const [datas, setDatas] = useState();
    const [startdate, setstartdate] = useState('');
    const [enddate, setenddate] = useState('');

    function selectstartdate(e) {
        setstartdate(e.target.value)
    }
    function selectenddate(e) {
        setenddate(e.target.value)
    }

    const getcustomerbyid = () => {
        fetch(`http://localhost:6060/api/v1/get-customer/${data?._id}?startDate=${startdate}&endDate=${enddate}`)
            .then((res) => {
                return res.json()
            }).then((data) => {
                setDatas(data)
            })
    }

    function clear() {
        window.location.reload()
    }


    const generateInvoice = (customerData, datas) => {
        try {
            // Log data for debugging
            console.log("Customer Data:", customerData);
            console.log("Data:", datas);

            // Logic for generating the invoice using jsPDF and jspdf-autotable
            const pdf = new jsPDF();

            // Add content to the PDF
            pdf.text("Invoice", 10, 10);
            pdf.text("Customer Name: " + customerData.name, 10, 20);
            pdf.text("Mobile No.: " + customerData.number, 10, 30);
            pdf.text("Address: " + customerData.adress, 10, 40);
            pdf.text("Invoice Date: " + new Date().toLocaleDateString(), 10, 50);

            // Extract product data from nested structure
            const productData = datas?.data?.dailyEntries?.flatMap(entry => entry.products || []);

            // Add a table with product information
            const columns = ["Product", "Quantity", "Price", "Total"];
            pdf.autoTable({
                head: [columns],
                body: productData.map(product => [
                    product.type,
                    product.quantity,
                    product.price,
                    (parseFloat(product.quantity) || 0) * (parseFloat(product.price) || 0)
                ]),
                startY: 60,
            });

            // Calculate total amount
            const totalAmount = productData.reduce((total, product) => total + (parseFloat(product.quantity) || 0) * (parseFloat(product.price) || 0), 0);

            // Add a total amount at the end
            pdf.text("Total Amount: ₹" + totalAmount.toFixed(2), 10, pdf.autoTable.previous.finalY + 10);

            // Save or display the PDF
            pdf.save("invoice.pdf");
        } catch (error) {
            // Log any errors during invoice generation
            console.error("Invoice Generation Error:", error);
        }
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
                                <h5>{data?.name}</h5>
                                <h6>{currentDate}</h6>
                            </div>
                            <div className="customer-detail">
                                <table class="table">
                                    <tbody>
                                        <tr>
                                            <th scope="row">Mobile No.</th>
                                            <td>{data?.number}</td>
                                        </tr>
                                        <tr>
                                            <th scope="row">Address</th>
                                            <td>{data?.adress}</td>
                                        </tr>
                                        <tr>
                                            <th scope="row">Total Quantity</th>
                                            <td>{data?.product?.map((val) => val?.product_quantity)}</td>
                                        </tr>
                                        <tr>
                                            <th scope="row">Total Amount</th>
                                            <td><span><i class="fa-solid fa-indian-rupee-sign"></i></span> {data?.totalamount || 0} </td>
                                        </tr>
                                        <tr>
                                            <th scope="row">Past Due Amount</th>
                                            <td><span><i class="fa-solid fa-indian-rupee-sign"></i></span> {data?.totalamount || 0} </td>
                                        </tr>
                                        <tr>
                                            <th scope="row">Last Paid</th>
                                            <td><span><i class="fa-solid fa-indian-rupee-sign"></i></span> {data?.paidamount || 0}</td>
                                        </tr>
                                        <tr>
                                            <th scope="row">Remaining Amount </th>
                                            <td><span><i class="fa-solid fa-indian-rupee-sign"></i></span> {data?.dueamount || 0}</td>
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
                                            <input class="form-control" type='date' onChange={selectstartdate} />
                                        </div>

                                        <div className='col-6 col-md-3 my-2 date-picker'>
                                            <input class="form-control" type='date' onChange={selectenddate} />
                                        </div>

                                        <div className='col-lg-6 col-md-12 my-2'>
                                            <div className='d-flex justify-content-around'>
                                                <button className='btn btn-success rounded-pill px-4' onClick={getcustomerbyid}>Find</button>
                                                <button className='btn btn-secondary rounded-pill px-4' onClick={clear}>clear</button>
                                                <button className='btn btn-primary rounded-pill px-4' onClick={() => generateInvoice(data, datas)}>Invoice</button>
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
            </div>
        </>
    )
}

export default Customerdetail