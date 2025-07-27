import {
  createBrowserRouter,
  RouterProvider,
  type RouteObject,
} from 'react-router-dom';
import PublicLayout from './layouts/public-layout';
import LoginPage from './pages/login-page';
import RegisterPage from './pages/register-page';
import ProtectedLayout from './layouts/protected-layout';
import HomePage from './pages/home-page';
import StudyListPage from './pages/study-list-page';
import FilterPage from './pages/filter-page';
import AlarmPage from './pages/alarm-page';
import StudyDetailPage from './pages/study-detail-page';
import CreateStudyPage from './pages/create-study-page';
import ChatPage from './pages/chat-page';

const publicRoutes: RouteObject[] = [
  {
    path: '/',
    element: <PublicLayout />,
    children: [
      {
        path: 'login',
        element: <LoginPage />,
      },
      {
        path: 'register',
        element: <RegisterPage />,
      },
    ],
  },
];

const protectedRoutes: RouteObject[] = [
  {
    path: '/',
    element: <ProtectedLayout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: 'study-list',
        element: <StudyListPage />,
      },
      {
        path: 'filter',
        element: <FilterPage />,
      },
      {
        path: 'alarm',
        element: <AlarmPage />,
      },
      {
        path: 'study-detail',
        element: <StudyDetailPage />,
      },
      {
        path: 'create-study-page',
        element: <CreateStudyPage />,
      },
      {
        path: 'chat', // ✅ 라우터 경로 추가
        element: <ChatPage />,
      },
    ],
  },
];

const router = createBrowserRouter([...publicRoutes, ...protectedRoutes]);

export default function App() {
  return <RouterProvider router={router} />;
}
