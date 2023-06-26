/* eslint-disable react/no-unescaped-entities */

import { Outlet } from 'react-router-dom';
import { LoginNavbar, Navbar } from '../navbar/Navbar';
import { useSelector } from 'react-redux';
import { userName } from '../../state/authenticationSlice';

const Layout = () => {
  const loggedIn = useSelector((state) => state.authentication.loggedIn)
  const user = useSelector(userName)

  if(loggedIn)
  {
    if (user === "Anonymus")
    {
      return (
        <div className="ui container">
          <h1 className="formtitle">Form the Future 2.0</h1>
          <h6 className="formlittletitle"><i>(with a form)</i></h6>
          {<Outlet />}
        </div>
      );
    }
  }

  return (
    <div className="ui container">
      {loggedIn ? <Navbar /> : <LoginNavbar />}
      {<Outlet />}
    </div>
  );
};

export default Layout;