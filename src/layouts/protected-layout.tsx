import { matchPath, Outlet, useLocation } from 'react-router';
import HomeHeader from '../components/Headers/HomeHeader';
import Navbar from '../components/Navbar';

export default function ProtectedLayout() {
  // const navigate = useNavigate();

  // if (!accessToken) {
  //   void navigate('/login');
  // }

  const location = useLocation();
  const isHomePage = matchPath('/', location.pathname);

  return (
    <div className="flex items-center justify-center bg-gray-100">
      <div className="max-w-[480px] w-full min-h-screen bg-white">
        {isHomePage && <HomeHeader />}
        <div className="pt-[4rem]">
          <Outlet />
        </div>
        {isHomePage && <Navbar />}
      </div>
    </div>
  );
}
