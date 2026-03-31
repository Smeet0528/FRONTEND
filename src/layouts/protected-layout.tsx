import { matchPath, Navigate, Outlet, useLocation } from 'react-router';
import HomeHeader from '../components/Headers/HomeHeader';
import Navbar from '../components/Navbar';
import BackHeader from '@/components/Headers/BackHeader';

export default function ProtectedLayout() {
  const accessToken = localStorage.getItem('accessToken');
  const location = useLocation();

  if (!accessToken) {
    return <Navigate to="/login" replace />;
  }

  const isHomePage = matchPath('/', location.pathname);
  const isStudyListPage = matchPath('/study-list', location.pathname);
  const isFilterPage = matchPath('/filter', location.pathname);
  const isAlarmPage = matchPath('/alarm', location.pathname);

  const showHomeHeader = isHomePage || isStudyListPage;
  const showBackHeader = isFilterPage;
  const showBackHeaderWithTitle = isAlarmPage;
  const showNavbar = isHomePage || isStudyListPage || isAlarmPage;

  return (
    <div className="flex items-center justify-center bg-[#D9D9D9]">
      <div className="max-w-[480px] w-full min-h-screen bg-[#F8F8F8]">
        {showHomeHeader && <HomeHeader />}
        {showBackHeader && <BackHeader />}
        {showBackHeaderWithTitle && <BackHeader title="Smeet" />}
        <div className="pt-[3rem] pb-[5rem]">
          <Outlet />
        </div>
        {showNavbar && <Navbar />}
      </div>
    </div>
  );
}
