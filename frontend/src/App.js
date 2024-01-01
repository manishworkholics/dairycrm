import React from 'react';
import Navbar from './components/Template/Navbar';
import { Outlet } from 'react-router-dom';

function App() {
    return (
        <>
            <Navbar />
            <Outlet />

        </>
    );
}

export default App;