import { useEffect } from 'react';
import { Navigate, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { getCookie, setCookie } from 'src/utils/cookie';
import Aside from 'src/components/common/Aside';

function PrivateRoute() {
  const navigation = useNavigate();
  const { search } = useLocation();
  const access = getCookie('access');

  useEffect(() => {
    if (access) navigation('/user', { replace: true });
    const accessToken = new URLSearchParams(search).get('accessToken');
    if (!accessToken) return;

    setCookie('access', `${accessToken}`, { path: '/', secure: true, sameSite: 'strict' });
    navigation('/user', { replace: true });
  }, []);

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
