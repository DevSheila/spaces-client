import { Link, useLocation } from 'react-router-dom';

const AccountNav = () => {
  const { pathname } = useLocation();
  let subpage = pathname.split('/')?.[2];

  if (subpage === undefined) {
    subpage = 'profile';
  }

  const linkClases = (type = null) => {
    let classes = 'inline-block rounded-t-lg p-4 ';
    if (type === subpage) {
      classes += ' active  bg-gray-100 text-blue-600 dark:text-blue-500'; //active
    } else {
      classes +=
        ' hover:bg-gray-50 hover:text-gray-600 dark:hover:bg-gray-800 dark:hover:text-gray-300'; //inactive
    }
    return classes;
  };
  return (
    <>  
      <div className="mb-8 mt-24  w-full  justify-center p-8 md:flex-row md:p-0">
        <ul class="flex flex-wrap border-b border-gray-200 text-center text-sm font-medium text-gray-500 dark:border-gray-700 dark:text-gray-400">
          <li class="me-2">
            <Link to={'/account'} className={linkClases('profile')}>
              Profile
            </Link>
          </li>
          <li class="me-2">
            <Link to={`/account/bookings`} className={linkClases('bookings')}>
              Bookings 
            </Link>
          </li>
          <li class="me-2">
            <Link to={'/account/places'} className={linkClases('places')}>
              My Venues
            </Link>
          </li>
        </ul>
      </div>
    </>
  );
};

export default AccountNav;
