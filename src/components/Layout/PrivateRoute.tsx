import { useEffect } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import Aside from 'src/components/common/Aside';
import { extractCookieValue, getCookie, removeBrowserToken, setCookie } from 'src/utils/cookie';

function PrivateRoute() {
  useEffect(() => {
    const accessToken = extractCookieValue('access_token');
    if (!accessToken) return;
    setCookie('access', decodeURIComponent(accessToken), { path: '/', secure: true, sameSite: 'strict' });
    removeBrowserToken('access_token');
  }, []);
  const access = getCookie('access');
  console.log('access:', access);

  return (
    <>
      {access ? (
        <div className="flex">
          <Aside />
          <Outlet />
        </div>
      ) : <Navigate to="/signin" />}
    </>
  );
}

export default PrivateRoute;
