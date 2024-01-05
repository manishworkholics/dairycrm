import React from 'react';
import Navbar from '../Template/Navbar';
import Sidebar from '../Template/Sidebar';


const Home = () => {

  return (
    <>

      <div className="main-container">
        <div className="wrapper">
         {/* <Sidebar />
           <Navbar /> */}
          <main className='content px-3 py-2'>
            <div className='row'>
              <div className='col-md-12 mt-5'>
                <h1 className='text-center'>hello world</h1>
              </div>
            </div>
          </main>
        </div>
      </div>
    </>
  );
}

export default Home;
