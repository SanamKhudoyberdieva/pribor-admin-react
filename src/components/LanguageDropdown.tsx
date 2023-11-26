import React from 'react';
import { Dropdown, DropdownMenu, DropdownToggle } from 'react-bootstrap';
// import { Dropdown, DropdownMenu, DropdownToggle } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

const LanguageDropdown = () => {
  const { i18n } = useTranslation();
  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };
  return (
    <>
        <Dropdown className="nav-item dropdown ml-auto">
            <DropdownToggle className="btn btn-outline-info dropdown-toggle" type="button" id="languageDropdown"
                data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                {i18n.language === 'ru' ? 'Русский' : i18n.language === 'uz' ? 'O\'zbek' : 'English'}
            </DropdownToggle>
            <DropdownMenu className="dropdown-menu es-dropdown-menu" aria-labelledby="languageDropdown">
              <a
                className={`dropdown-item ${i18n.language === 'ru' ? 'active' : ''}`}
                onClick={() => changeLanguage('ru')}
              >
                Русский
              </a>
              <a
                className={`dropdown-item ${i18n.language === 'uz' ? 'active' : ''}`}
                onClick={() => changeLanguage('uz')}
              >
                O'zbek
              </a>
              <a
                className={`dropdown-item ${i18n.language === 'en' ? 'active' : ''}`}
                onClick={() => changeLanguage('en')}
              >
                English
              </a>
            </DropdownMenu>
        </Dropdown>
    </>
  )
}

export default LanguageDropdown;
