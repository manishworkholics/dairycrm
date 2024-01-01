import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './components/pages/Home';
import PageNotFound from './components/pages/PageNotFound';
import App from './App';
import './App.css';
import Product from './components/pages/Product';
import Cutomer from './components/pages/Cutomer';
import Reports from './components/pages/Reports';


const root = ReactDOM.createRoot(
    document.getElementById("root")
);
root.render(
    <BrowserRouter>
        <Routes>
            <Route path="/home" element={<App />}>
                <Route index path="/home" element={<Home />} />
                <Route index path="/home/product" element={<Product />} />
                <Route index path="/home/customer" element={<Cutomer />} />
                <Route index path="/home/report" element={<Reports />} />

                <Route path='*' element={<PageNotFound />} />
            </Route>
        </Routes>
    </BrowserRouter>
);

