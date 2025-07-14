import { matchPath, Outlet, useLocation } from 'react-router';
import HomeHeader from '../components/Headers/HomeHeader';
import Navbar from '../components/Navbar';
import BackHeader from '@/components/Headers/BackHeader';

export default function ProtectedLayout() {
  // const navigate = useNavigate();

  // if (!accessToken) {
  //   void navigate('/login');
  // }

  const location = useLocation();
  const isHomePage = matchPath('/', location.pathname);
  const isStudyListPage = matchPath('/study-list', location.pathname);
  const isFilterPage = matchPath('/filter', location.pathname);

  const showHomeHeader = isHomePage || isStudyListPage;
  const showBackHeader = isFilterPage;
  const showNavbar = isHomePage || isStudyListPage;

  return (
    <div className="flex items-center justify-center bg-[#D9D9D9]">
      <div className="max-w-[480px] w-full min-h-screen bg-[#F8F8F8]">
        {showHomeHeader && <HomeHeader />}
        {showBackHeader && <BackHeader />}
        <div className="pt-[4rem]">
          <Outlet />
        </div>
        {showNavbar && <Navbar />}
      </div>
    </div>
  );
}
