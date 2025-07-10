import { Outlet } from 'react-router-dom';

export default function PublicLayout() {
  return (
    <div className="min-h-screen flex justify-center">
      <div className="max-w-[480px] w-full">
        <Outlet />
      </div>
    </div>
  );
}
