import { Dropdown, DropdownMenu, DropdownToggle } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

const LanguageDropdown = () => {
  const { i18n } = useTranslation();
  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };
  return (
    <>
      <Dropdown className="nav-item dropdown ml-auto pr-lang-dropdown">
        <DropdownToggle className="btn btn-outline-info dropdown-toggle" type="button" id="languageDropdown"
          data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          {i18n.language === 'ru' ? 'Русский' : i18n.language === 'uz' ? 'O\'zbek' : 'English'}
        </DropdownToggle>
        <DropdownMenu className="dropdown-menu pr-dropdown-menu" aria-labelledby="languageDropdown">
          <button
            className={`btn rounded-0 dropdown-item ${i18n.language === 'ru' ? 'active' : ''}`}
            onClick={() => changeLanguage('ru')}
          >
            Русский
          </button>
          <button
            className={`btn rounded-0 dropdown-item ${i18n.language === 'uz' ? 'active' : ''}`}
            onClick={() => changeLanguage('uz')}
          >
            O'zbek
          </button>
          <button
            className={`btn rounded-0 dropdown-item ${i18n.language === 'en' ? 'active' : ''}`}
            onClick={() => changeLanguage('en')}
          >
            English
          </button>
        </DropdownMenu>
      </Dropdown>
    </>
  )
}

export default LanguageDropdown;
