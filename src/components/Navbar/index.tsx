import Navlink from './Link';
import Home from '/src/assets/home.svg?react';
import Study from '/src/assets/study.svg?react';

const Navbar = () => {
  return (
    <nav className="fixed bottom-0 w-full max-w-[480px] flex justify-between p-2 pb-3 bg-[#F8F8F8] z-50">
      <Navlink to="/" Icon={Home} alt="홈" />
      <div className="border border-[#c4c4c4]"></div>
      <Navlink to="/study-list" Icon={Study} alt="스터디" />
    </nav>
  );
};

export default Navbar;
