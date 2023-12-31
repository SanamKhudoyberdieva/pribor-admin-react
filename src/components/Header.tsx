import { Dropdown } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { logOut } from '../store/slices/loginSlice';
import LanguageDropdown from './LanguageDropdown';
import { RootState } from '../store';
import { useTranslation } from 'react-i18next';

const Header = () => {
  const { t } = useTranslation();

  const dispatch = useDispatch()
  const { username } = useSelector((state: RootState) => state.loginReducer)
  const hendleLogOut = () => {
    dispatch(logOut())
  }
  return (
    <nav
      className="layout-navbar container-xxl navbar navbar-expand-xl navbar-detached align-items-center bg-navbar-theme"
      id="layout-navbar"
    >
      <div className="layout-menu-toggle navbar-nav align-items-xl-center me-3 me-xl-0 d-xl-none">
        <Link to={"/"} className="nav-item nav-link px-0 me-xl-4">
          <i className="bx bx-menu bx-sm"></i>
        </Link>
      </div>

      <div
        className="navbar-nav-right d-flex align-items-center"
        id="navbar-collapse"
      >
        <ul className="navbar-nav flex-row align-items-center ms-auto">
          {/* <!-- User --> */}
          <li className='nav-item navbar-dropdown dropdown'>
            <LanguageDropdown />
          </li>
          <li className="nav-item navbar-dropdown dropdown-user dropdown">
            <Dropdown>
              <Dropdown.Toggle
                variant="none"
                className="pr-dropdown-user"
                id="dropdown-basic"
              >
                <div className="avatar avatar-online">
                  <img
                    src={require('../../src/assets/img/admin01.jpg')}
                    alt=""
                    className="w-px-40 h-auto rounded-circle"
                  />
                </div>
              </Dropdown.Toggle>

              <Dropdown.Menu>
                <div className="dropdown-item">
                  <div className="d-flex">
                    <div className="flex-shrink-0 me-3">
                      <div className="avatar avatar-online">
                        <img
                          src={require('../../src/assets/img/admin01.jpg')}
                          alt=""
                          className="w-100 h-auto rounded-circle"
                        />
                      </div>
                    </div>
                    <div className="flex-grow-1">
                      <span className="fw-semibold d-block">
                        {username}
                      </span>
                      <small className="text-muted">{t('admin')}</small>
                    </div>
                  </div>
                </div>
                <div className="dropdown-divider"></div>
                <Link to={"/"} className="dropdown-item" onClick={hendleLogOut}>
                  <i className="bx bx-power-off me-2"></i>
                  <span className="align-middle">{t('log-out')}</span>
                </Link>
              </Dropdown.Menu>
            </Dropdown>
          </li>
          {/* <!--/ User --> */}
        </ul>
      </div>
    </nav>
  )
}

export default Header