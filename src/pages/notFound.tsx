import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const NotFound = () => {
  const { t } = useTranslation();

  return (
    <>
        <div className="pr-not-found-wrp">
            <div className="misc-wrapper">
                <h2 className="mb-2 mx-2">{t('page-not-found')}</h2>
                <p className="mb-4 mx-2">{t('error-message-not-found')}</p>
                <Link to={"/"} className="btn btn-primary">{t('back-to-home-page')}</Link>
            </div>
        </div>
    </>
  )
}

export default NotFound;
