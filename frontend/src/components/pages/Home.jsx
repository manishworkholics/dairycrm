import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate()
  const [username, setusername] = useState('');
  const [password, setpassword] = useState('');

  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  var raw = JSON.stringify({
    "username": username,
    "password": password
  });

  var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
  };

  const submit = async (e) => {
    e.preventDefault();
    if (!username || !password) {
      alert('Please enter All the fields');
      return;
    }
    const fetchdata = fetch("http://206.189.130.102:6060/api/v1/login", requestOptions);
    const response = await fetchdata;
    const res = await response.json();

    if (response.status === 200) {
      alert("login successfully");
      sessionStorage.setItem("token", res.token);
      navigate("/home/daily-entry");
    } else {
      alert("Invalid Credentials");
    }
  };


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

                        <div class="mb-3">
                          <label for="exampleInputEmail1" class="form-label login-title-h5">Username <span className='ms-2'><i class="fa-solid fa-user"></i></span></label>
                          <input type="text" class="form-control rounded-pill" id="exampleInputEmail1" aria-describedby="emailHelp" value={username} onChange={(e) => setusername(e.target.value)} />
                        </div>
                        <div class="mb-3">
                          <label for="exampleInputPassword1" class="form-label login-title-h5">Password <span className="ms-2"><i class="fa-solid fa-key"></i></span></label>
                          <input type="password" class="form-control  rounded-pill" id="exampleInputPassword1" value={password} onChange={(e) => setpassword(e.target.value)} />
                        </div>
                        <div className='d-flex justify-content-center mt-3 mb-3'>
                          <button type="submit" class="btn btn-info" onClick={submit}>Submit</button>
                        </div>

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
