import React from 'react';
import './assets/css/demo.css';
import './assets/css/core.css';
import './assets/css/custom.css';
import './assets/css/theme-default.css';
import "boxicons/css/boxicons.min.css";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import Home from './pages';
import Login from './pages/login';
import Orders from './pages/order';
import Banners from './pages/banner';
import Order from './pages/order/[id]';
import Products from './pages/product';
import Contacts from './pages/contact';
import Customers from './pages/customer';
import Banner from './pages/banner/[id]';
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
import Categories from './pages/category';
import Category from './pages/category/[id]';
import Countries from './pages/country';
import Country from './pages/country/[id]';
import Vacancies from './pages/vacancy';
import Vacancy from './pages/vacancy/[id]';
import Admins from './pages/admins';
import AdminPage from './pages/admins/[id]';
import News from './pages/news';
import NewPage from './pages/news/[id]';
import Applicants from './pages/applicants';
import ApplicantPage from './pages/applicants/[id]';
import NotFound from './pages/notFound';

function App() {
  return (
    <BrowserRouter>
      <ToastContainer />
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

            <Route path="/brend" element={<Brends />} />
            <Route path="/brend/new" element={<Brend mode="create" />} />
            <Route path="/brend/:id/edit" element={<Brend mode="edit" />} />

            <Route path="/category" element={<Categories />} />
            <Route path="/category/new" element={<Category mode="create" />} />
            <Route path="/category/:id/edit" element={<Category mode="edit" />} />

            <Route path="/country" element={<Countries />} />
            <Route path="/country/new" element={<Country mode="create" />} />
            <Route path="/country/:id/edit" element={<Country mode="edit" />} />

            <Route path="/vacancy" element={<Vacancies />} />
            <Route path="/vacancy/new" element={<Vacancy mode="create" />} />
            <Route path="/vacancy/:id/edit" element={<Vacancy mode="edit" />} />

            <Route path="/news" element={<News />} />
            <Route path="/news/new" element={<NewPage mode="create" />} />
            <Route path="/news/:id/edit" element={<NewPage mode="edit" />} />

            <Route path="/applicant" element={<Applicants />} />
            <Route path="/applicant/new" element={<ApplicantPage mode="create" />} />
            <Route path="/applicant/:id/edit" element={<ApplicantPage mode="edit" />} />

            <Route path="/admins" element={<Admins />} />
            <Route path="/admin/new" element={<AdminPage mode="create" />} />
            <Route path="/admin/:id/edit" element={<AdminPage mode="edit" />} />
          </Route>
        </Route>

        <Route path="/" element={<MainLayout />}>
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
