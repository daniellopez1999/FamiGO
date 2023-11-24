import { Outlet } from 'react-router-dom';
import Nav from './Nav';

const NavOutlet = () => {
  return (
    <>
      <Outlet />
      <Nav />
    </>
  );
};
export default NavOutlet;
