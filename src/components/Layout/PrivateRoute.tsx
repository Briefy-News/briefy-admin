import { Outlet } from 'react-router-dom';
import Aside from 'src/components/common/Aside';

function PrivateRoute() {
  return (
    <div className="flex">
      <Aside />
      <Outlet />
    </div>
  );
}

export default PrivateRoute;
