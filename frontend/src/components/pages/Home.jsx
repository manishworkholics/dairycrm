import React from 'react';
import { Link } from 'react-router-dom';


const Home = () => {
  return (
    <>
      <div className="container-fluid p-0">
        <div className="page-banner">
          <div className="banner-content-area">
            <div className="container">
              <div className="row">
                <div className="col-12 my-5">
                  <Link className="navbar-brand" to="#">Dairy</Link>
                </div>
              </div>
            </div>
          </div>
          <div className="banner-btm-img">
            <img src={require("../img/banner-btm-img.png")} alt="" />
          </div>
        </div>
      </div>
      <div className="main-container">
        <div className="wrapper">
          <main className='content px-3 py-2'>
            <div className='row d-flex justify-content-center'>
              <div className="col-12 col-md-6 col-lg-3">
                <div className='col-md-12 '>
                  <h3 className='login-title-h3 text-center'>Login</h3>
                </div>
                <div className="col-12">
                  <div className="card login-form-card">
                    <div className="row">
                      <div className="col-12">
                        <form>
                          <div class="mb-3">
                            <label for="exampleInputEmail1" class="form-label login-title-h5">Login ID <span className='ms-2'><i class="fa-solid fa-user"></i></span></label>
                            <input type="email" class="form-control rounded-pill" id="exampleInputEmail1" aria-describedby="emailHelp" />
                          </div>
                          <div class="mb-3">
                            <label for="exampleInputPassword1" class="form-label login-title-h5">Password <span className="ms-2"><i class="fa-solid fa-key"></i></span></label>
                            <input type="password" class="form-control  rounded-pill" id="exampleInputPassword1" />
                          </div>
                          {/* <div className="mb-3 text-center">
                            <Link to="/" class="text text-links">Forgot Password</Link>
                          </div> */}
                          <div className='d-flex justify-content-center mt-3 mb-3'>
                            <Link to="/home/product"><button type="submit" class="btn btn-info">Submit</button></Link>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </>
  );
}

export default Home;
