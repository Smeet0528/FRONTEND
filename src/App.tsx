import { BrowserRouter } from 'react-router-dom';
import BackHeader from './components/Headers/BackHeader';
import HomeHeader from './components/Headers/HomeHeader';
import Navbar from './components/Navbar';

export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen flex items-center justify-center">
        <div className="max-w-[480px] w-full space-y-8">
          <BackHeader title="Smeet" />
          <HomeHeader />
          <Navbar />
        </div>
      </div>
    </BrowserRouter>
  );
}
