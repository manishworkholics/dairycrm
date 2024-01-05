import React from 'react';
import Sidebar from '../Template/Sidebar';


const Home = () => {

  return (
    <>

      <div className="main-container">
        <div className="wrapper">
          <Sidebar />
          <div className="main-page">
            <main className='content'>
              <div className="container-fluid p-0">

                <div className='row'>
                  <div className='col-md-12 mt-5'>
                    <h1 className='text-center'>hello world</h1>
                  </div>
                </div>
              </div>
            </main>
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
