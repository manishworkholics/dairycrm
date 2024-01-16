import React, { useState, useEffect } from 'react'
import { useParams, useLocation } from 'react-router-dom';
import Navbar from '../Template/Navbar'
import Home from './Home';

const EditCustomer = () => {
    const [inputData, setInputData] = useState({ id: 1, product_name: '', product_quantity: '' })
    const usertoken = sessionStorage.getItem('token')
    const [product, setproduct] = useState();
    let location = useLocation();
    const { data } = location.state
    let { id } = useParams();
    const [edit, setedit] = useState({ name: data.name, number: data.number, adress: data.adress });
    const item = data?.product?.map((val) => {
        return (
            { id: 1, product_name: val?.product_name?._id, product_quantity: val?.product_quantity }
        )
    })


    const [catArray, setCatArray] = useState(item)
    const [index, setIndex] = useState()
    const [bolin, setBolin] = useState(false)

    const getproduct = () => {
        fetch(`http://206.189.130.102:6060/api/v1/get-product`)
            .then((res) => {
                return res.json()
            }).then((data) => {
                setproduct(data)
            })
    }

    const catChange = (e) => {
        setInputData({ ...inputData, [e.target.name]: e.target.value })
    }

    let { product_name, product_quantity } = inputData
    const addinputdata = () => {
        if (product_name === '' && product_quantity === '') {
            alert('Please fill the fields')
        } else {
            setCatArray([...catArray, { product_name, product_quantity }])
            setInputData({ product_name: '', product_quantity: '' })
        }
    }
    const deleteCat = (i) => {
        let total = [...catArray]
        total.splice(i, 1)
        setCatArray(total)
    }
    const updateCat = (i) => {
        let { product_name, product_quantity } = catArray[i]
        setInputData({ product_name, product_quantity })
        setBolin(true)
        setIndex(i)
    }
    const updateinfo = () => {
        let total = [...catArray]
        total.splice(index, [1], { product_name, product_quantity })
        setCatArray(total)
        setBolin(false)
        setInputData({ product_name, product_quantity })

    }

    const handleChanges = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setedit({ ...edit, [name]: value });
    };

    const upadateproduct = async () => {
        const { name, number, adress } = edit
        const fetchdata = fetch(`http://206.189.130.102:6060/api/v1/update-customer/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name: name, number: number, adress: adress, product: catArray }),
        })
        const response = await fetchdata;
        await response.json();
        if (response.status === 200) {
            alert("edit successfully");
        } else {
            alert("Invalid Credentials");
        }
    }

    useEffect(() => {
        getproduct();
    }, [])

    const renderProductName = (productId) => {
        const productItem = product?.product?.find((val) => val._id === productId);
        return productItem?.name || '';
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
                                    <h2 className="banner-heading-h2">Edit Customer</h2>
                                    <h3 className="banner-subheading-h3">Home<span className='mx-3'><i class="fa-solid fa-angle-right"></i></span>Customer<span className='mx-3'><i class="fa-solid fa-angle-right"></i></span>Edit Customer</h3>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="banner-btm-img">
                        <img src={require("../img/banner-btm-img.png")} alt="" />
                    </div>
                </div>
            </div>

            <div className="container mb-5 edit-customer-card-container">
                <div className="card edit-customer-card">
                    <div className="row">
                        <div className="col-md-6 edit-customer-card-left">
                            <div className="card-heading">
                                <h4>Customer Details</h4>
                            </div>
                            <div className="mb-3 mt-3">
                                <label htmlFor="name" className="form-label">Cutomer Name :</label>
                                <input type="text" className="form-control" id="name" name="name" value={edit.name} onChange={handleChanges} />
                            </div>
                            <div className="mb-3 mt-3">
                                <label htmlFor="name" className="form-label">Cutomer Number :</label>
                                <input type="text" className="form-control" id="name" name="number" value={edit.number} onChange={handleChanges} />
                            </div>
                            <div className="mb-3 mt-3">
                                <label htmlFor="name" className="form-label">Cutomer Adress :</label>
                                <input type="text" className="form-control" id="name" name="adress" value={edit.adress} onChange={handleChanges} />
                            </div>
                            <button type="submit" className="btn btn-info" onClick={upadateproduct}>Submit</button>
                        </div>
                        <div className='col-md-6 edit-customer-card-right'>
                            <div className="card-heading">
                                <h4>Product Entry</h4>
                            </div>
                            <div className=" row mb-3 mt-3">
                                <div className="col-12 col-lg-4 col-md-6">
                                    <label htmlFor="name" className='form-label'>Product</label> <br />
                                    <select class="form-select" name='product_name' value={inputData.product_name || product_name || ''} onChange={catChange}>
                                        <option value="">Select product</option>
                                        {product?.product?.map((val, index) => {
                                            return (
                                                <>
                                                    <option key={index} value={val?._id}>{val.name}</option>
                                                </>
                                            )
                                        })}
                                    </select>
                                </div>
                                <div className="col-12 col-lg-4 col-md-6">
                                    <label htmlFor="name" className='form-label'>Quantity</label> <br />
                                    <input type="number" className='form-control' name='product_quantity' placeholder='Enter no.' value={inputData.product_quantity || ''} onChange={catChange} />
                                </div>
                                <div className="col-lg-4 col-md-6 d-flex align-items-end">
                                    <div className="row addfarmHead placebtn">
                                        <div>
                                            <button className='addmultis btn btn-secondary' onClick={!bolin ? addinputdata : updateinfo}>
                                                {!bolin ? `Add product` : `Update product`}
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="table-responsive">
                                <table class="table">
                                    <thead className='tableBord cattable'>
                                        <tr className='fcolor'>
                                            <th>Product</th>
                                            <th>Quantity</th>
                                            <th className='text-center'>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            catArray && catArray.map((item, i) => {
                                                return (
                                                    <tr key={i}>
                                                        <td>{renderProductName(item.product_name)}</td>
                                                        <td>{item.product_quantity}</td>
                                                        <td className='d-flex justify-content-center'>
                                                            <button className='delbtn btn btn-warning mx-1'>
                                                                <span onClick={() => updateCat(i)} class="material-symbols-outlined action-icon m-0">
                                                                    edit
                                                                </span>
                                                            </button>
                                                            <button className='delbtn btn btn-danger mx-1'>
                                                                <span onClick={() => deleteCat(i)} class="material-symbols-outlined action-icon m-0">
                                                                    delete
                                                                </span>
                                                            </button>
                                                        </td>
                                                    </tr>
                                                )
                                            })
                                        }
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default EditCustomer