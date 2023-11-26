import React from 'react';
import './assets/css/demo.css';
import './assets/css/core.css';
import './assets/css/custom.css';
import './assets/css/theme-default.css';
import "boxicons/css/boxicons.min.css";
import Home from './pages';
import Login from './pages/login';
import Orders from './pages/order';
import Banners from './pages/banner';
import Order from './pages/order/[id]';
import Products from './pages/product';
import Contacts from './pages/contact';
import Payments from './pages/payment';
import Customers from './pages/customer';
import Banner from './pages/banner/[id]';
import Payment from './pages/payment/[id]';
import Contact from './pages/contact/[id]';
import Product from './pages/product/[id]';
import Customer from './pages/customer/[id]';
import MainLayout from './layout/mainLayout';
import RequireAuth from './routes/RequireAuth';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import CustomerAddress from './pages/customer/customerAddress/[id]';
import './utils/i18n';
import Brends from './pages/brend';
import Brend from './pages/brend/[id]';
import Categories from './pages/category/category';
import Category from './pages/category/[id]';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* public routes */}
        <Route path="/login" element={<Login />} />

        {/* we want to protect these routes */}
        <Route element={<RequireAuth />}>
          <Route path="/" element={<MainLayout />}>
            <Route path="/" element={<Home />} />

            <Route path="/product" element={<Products />} />
            <Route path="/product/new" element={<Product mode="create" />} />
            <Route path="/product/:id/edit" element={<Product mode="edit" />} />

            <Route path="/customer" element={<Customers />} />
            <Route path="/customer/new" element={<Customer mode="create" />} />
            <Route path="/customer/:id/edit" element={<Customer mode="edit" />} />
            <Route path="/customer/:id/address/new" element={<CustomerAddress mode="create" />} />
            <Route path="/customer/:id/address/:id/edit" element={<CustomerAddress mode="edit" />} />

            <Route path="/order" element={<Orders />} />
            <Route path="/order/new" element={<Order mode="create" />} />
            <Route path="/order/:id/edit" element={<Order mode="edit" />} />

            <Route path="/banner" element={<Banners />} />
            <Route path="/banner/new" element={<Banner mode="create" />} />
            <Route path="/banner/:id/edit" element={<Banner mode="edit" />} />

            <Route path="/contact" element={<Contacts />} />
            <Route path="/contact/new" element={<Contact mode="create" />} />
            <Route path="/contact/:id/edit" element={<Contact mode="edit" />} />

            <Route path="/payment" element={<Payments />} />
            <Route path="/payment/new" element={<Payment mode="create" />} />
            <Route path="/payment/:id/edit" element={<Payment mode="edit" />} />

            <Route path="/brend" element={<Brends />} />
            <Route path="/brend/new" element={<Brend mode="create" />} />
            <Route path="/brend/:id/edit" element={<Brend mode="edit" />} />

            <Route path="/category" element={<Categories />} />
            <Route path="/category/new" element={<Category mode="create" />} />
            <Route path="/category/:id/edit" element={<Category mode="edit" />} />
          </Route>
        </Route>

        {/* catch all */}
        {/* <Route path="/" element={<Layout />}>
          <Route path="*" element={<PageNotFound />} />
        </Route> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
