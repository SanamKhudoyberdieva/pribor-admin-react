import { useTranslation } from 'react-i18next';
import { Link, useLocation } from 'react-router-dom';

const AsideNav = () => {
  const { pathname } = useLocation();
  const { t } = useTranslation();

  return (
    <aside id="layout-menu" className="layout-menu menu-vertical menu bg-menu-theme pr-aside">
      <div className="app-brand demo justify-content-start">
        <Link to={'/'} className="app-brand-link">
          <span className="app-brand-text demo menu-text fw-bolder text-uppercase text-gray">
            <svg width="93" height="17" viewBox="0 0 93 17" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M0.43 16V0.599999H7.58C9.41333 0.599999 10.8947 1.12067 12.024 2.162C13.168 3.18867 13.74 4.46467 13.74 5.99C13.74 7.51533 13.168 8.79867 12.024 9.84C10.8947 10.8667 9.41333 11.38 7.58 11.38H3.73V16H0.43ZM3.73 8.3H7.47C8.37933 8.3 9.08333 8.08733 9.582 7.662C10.0807 7.23667 10.33 6.67933 10.33 5.99C10.33 5.30067 10.0807 4.74333 9.582 4.318C9.08333 3.89267 8.37933 3.68 7.47 3.68H3.73V8.3ZM15.6143 16V4.78H18.6943V6.43H18.8043C18.9363 6.078 19.1343 5.77 19.3983 5.506C19.9996 4.87533 20.755 4.56 21.6643 4.56H22.9843V7.53H21.3343C20.4983 7.53 19.8456 7.75733 19.3763 8.212C18.9216 8.652 18.6943 9.268 18.6943 10.06V16H15.6143ZM24.8163 2.866C24.479 2.52867 24.3103 2.14 24.3103 1.7C24.3103 1.26 24.479 0.878666 24.8163 0.556C25.1683 0.218666 25.5863 0.0499995 26.0703 0.0499995C26.5543 0.0499995 26.965 0.218666 27.3023 0.556C27.6543 0.878666 27.8303 1.26 27.8303 1.7C27.8303 2.14 27.6543 2.52867 27.3023 2.866C26.965 3.18867 26.5543 3.35 26.0703 3.35C25.5863 3.35 25.1683 3.18867 24.8163 2.866ZM24.5303 16V4.78H27.6103V16H24.5303ZM30.0303 16V0.599999H33.1103V6.21H33.2203C33.455 5.902 33.741 5.60867 34.0783 5.33C34.8703 4.74333 35.7576 4.45 36.7403 4.45C38.207 4.45 39.4316 5 40.4143 6.1C41.4116 7.18533 41.9103 8.61533 41.9103 10.39C41.9103 12.1647 41.4116 13.602 40.4143 14.702C39.4316 15.7873 38.207 16.33 36.7403 16.33C35.7576 16.33 34.8703 16.0367 34.0783 15.45C33.741 15.1713 33.455 14.878 33.2203 14.57H33.1103V16H30.0303ZM33.9023 7.97C33.3743 8.542 33.1103 9.34867 33.1103 10.39C33.1103 11.4313 33.3743 12.2453 33.9023 12.832C34.4303 13.404 35.1196 13.69 35.9703 13.69C36.777 13.69 37.437 13.3967 37.9503 12.81C38.4636 12.2233 38.7203 11.4167 38.7203 10.39C38.7203 9.36333 38.4636 8.55667 37.9503 7.97C37.437 7.38333 36.777 7.09 35.9703 7.09C35.1196 7.09 34.4303 7.38333 33.9023 7.97ZM44.8803 14.614C43.707 13.4553 43.1203 12.0473 43.1203 10.39C43.1203 8.73267 43.707 7.332 44.8803 6.188C46.0536 5.02933 47.5203 4.45 49.2803 4.45C51.0256 4.45 52.485 5.02933 53.6583 6.188C54.8463 7.332 55.4403 8.73267 55.4403 10.39C55.4403 12.0473 54.8463 13.4553 53.6583 14.614C52.485 15.758 51.0256 16.33 49.2803 16.33C47.5203 16.33 46.0536 15.758 44.8803 14.614ZM47.1683 8.014C46.5963 8.63 46.3103 9.422 46.3103 10.39C46.3103 11.358 46.5963 12.15 47.1683 12.766C47.7403 13.382 48.4443 13.69 49.2803 13.69C50.1163 13.69 50.8203 13.382 51.3923 12.766C51.9643 12.15 52.2503 11.358 52.2503 10.39C52.2503 9.422 51.9643 8.63 51.3923 8.014C50.8203 7.398 50.1163 7.09 49.2803 7.09C48.4443 7.09 47.7403 7.398 47.1683 8.014ZM57.208 16V4.78H60.288V6.43H60.398C60.53 6.078 60.728 5.77 60.992 5.506C61.5934 4.87533 62.3487 4.56 63.258 4.56H64.578V7.53H62.928C62.092 7.53 61.4394 7.75733 60.97 8.212C60.5154 8.652 60.288 9.268 60.288 10.06V16H57.208ZM65.0944 15.824C64.757 15.4867 64.5884 15.0687 64.5884 14.57C64.5884 14.0713 64.757 13.6533 65.0944 13.316C65.4317 12.9787 65.8497 12.81 66.3484 12.81C66.847 12.81 67.265 12.9787 67.6024 13.316C67.9397 13.6533 68.1084 14.0713 68.1084 14.57C68.1084 15.0687 67.9397 15.4867 67.6024 15.824C67.265 16.1613 66.847 16.33 66.3484 16.33C65.8497 16.33 65.4317 16.1613 65.0944 15.824ZM70.0987 11.6V4.78H73.1787V11.16C73.1787 11.9813 73.3767 12.612 73.7727 13.052C74.1833 13.4773 74.7553 13.69 75.4887 13.69C76.222 13.69 76.8453 13.4113 77.3587 12.854C77.872 12.2967 78.1287 11.5853 78.1287 10.72V4.78H81.2087V16H78.1287V14.46H78.0187C77.8427 14.7973 77.5713 15.1127 77.2047 15.406C76.4127 16.022 75.5107 16.33 74.4987 16.33C73.1053 16.33 72.02 15.9267 71.2427 15.12C70.48 14.3133 70.0987 13.14 70.0987 11.6ZM82.9738 16V13.36L88.5838 7.64V7.42H83.1938V4.78H92.6538V7.42L87.0438 13.14V13.36H92.8738V16H82.9738Z" fill="#0096FF" />
            </svg>
          </span>
        </Link>
      </div>

      <div className="menu-inner-shadow"></div>

      <ul className="menu-inner py-1 pr-aside-menu-list">
        <li className={`menu-item ${pathname === "/" && "active"}`}>
          <Link to={'/'} className="menu-link">
            <i className='menu-icon tf-icons bx bx-home-alt-2'></i>
            <div data-i18n="Analytics">{t('dashboard')}</div>
          </Link>
        </li>
        <li className="menu-header small text-uppercase"><span className="menu-header-text">{t('shop')}</span></li>
        <li className={`menu-item ${pathname.includes("/product") && "active"}`}>
          <Link to={'/product'} className="menu-link">
            <i className="menu-icon tf-icons bx bx-collection"></i>
            <div data-i18n="Boxicons">{t('products')}</div>
          </Link>
        </li>
        <li className={`menu-item ${pathname.includes("/customer") && "active"}`}>
          <Link to={'/customer'} className="menu-link">
            <i className='menu-icon tf-icons bx bx-group'></i>
            <div data-i18n="Boxicons">{t('customers')}</div>
          </Link>
        </li>
        <li className={`menu-item ${pathname.includes("/order") && "active"}`}>
          <Link to={'/order'} className="menu-link">
            <i className='menu-icon tf-icons bx bx-package'></i>
            <div data-i18n="Boxicons">{t('orders')}</div>
          </Link>
        </li>
        <li className="menu-header small text-uppercase"><span className="menu-header-text">{t('content')}</span></li>
        <li className={`menu-item ${pathname.includes("/banner") && "active"}`}>
          <Link to={'/banner'} className="menu-link">
            <i className="menu-icon tf-icons bx bx-collection"></i>
            <div data-i18n="Boxicons">{t('banners')}</div>
          </Link>
        </li>
        <li className={`menu-item ${pathname.includes("/category") && "active"}`}>
          <Link to={'/category'} className="menu-link">
            <i className="menu-icon tf-icons bx bx-category"></i>
            <div data-i18n="Boxicons">{t('category')}</div>
          </Link>
        </li>
        <li className={`menu-item ${pathname.includes("/brend") && "active"}`}>
          <Link to={'/brend'} className="menu-link">
            <i className="menu-icon tf-icons bx bx-star"></i>
            <div data-i18n="Boxicons">{t('brend')}</div>
          </Link>
        </li>
        <li className={`menu-item ${pathname.includes("/news") && "active"}`}>
          <Link to={'/news'} className="menu-link">
            <i className="menu-icon tf-icons bx bx-news"></i>
            <div data-i18n="Boxicons">{t('news')}</div>
          </Link>
        </li>
        <li className={`menu-item ${pathname.includes("/vacancy") && "active"}`}>
          <Link to={'/vacancy'} className="menu-link">
            <i className="menu-icon tf-icons bx bx-briefcase-alt-2"></i>
            <div data-i18n="Boxicons">{t('vacancy')}</div>
          </Link>
        </li>
        <li className={`menu-item ${pathname.includes("/country") && "active"}`}>
          <Link to={'/country'} className="menu-link">
            <i className="menu-icon tf-icons bx bx-buildings"></i>
            <div data-i18n="Boxicons">{t('country')}</div>
          </Link>
        </li>
        <li className={`menu-item ${pathname.includes("/contact") && "active"}`}>
          <Link to={'/contact'} className="menu-link">
            <i className='menu-icon tf-icons bx bx-phone-call'></i>
            <div data-i18n="Boxicons">{t('contacts')}</div>
          </Link>
        </li>
        <li className={`menu-item ${pathname.includes("/admins") && "active"}`}>
          <Link to={'/admins'} className="menu-link">
            <i className='menu-icon tf-icons bx bx-group'></i>
            <div data-i18n="Boxicons">{t('admins')}</div>
          </Link>
        </li>
        <li className="menu-header small text-uppercase"><span className="menu-header-text">{t('requests')}</span></li>
        <li className={`menu-item ${pathname.includes("/applicant/new") && "active"}`}>
          <Link to={'/applicant/new'} className="menu-link">
            <i className="menu-icon tf-icons bx bx-briefcase-alt-2"></i>
            <div data-i18n="Boxicons">{t('applicants')}</div>
            <span className="badge badge-center rounded-pill bg-success ms-auto">4</span>
          </Link>
        </li>
      </ul>
    </aside>
  )
}

export default AsideNav;