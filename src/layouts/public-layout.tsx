import { Outlet } from 'react-router-dom';

export default function PublicLayout() {
  return (
    <div className="flex items-center justify-center bg-[#D9D9D9]">
      <div className="max-w-[480px] w-full min-h-screen bg-[#F8F8F8]">
        <Outlet />
      </div>
    </div>
  );
}
