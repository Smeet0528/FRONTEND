import { Outlet } from 'react-router-dom';

export default function PublicLayout() {
  return (
    <div className="flex items-center justify-center bg-gray-100">
      <div className="max-w-[480px] w-full min-h-screen bg-white">
        <Outlet />
      </div>
    </div>
  );
}
