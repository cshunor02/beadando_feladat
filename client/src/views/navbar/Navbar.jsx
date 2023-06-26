
import { Link, useNavigate } from "react-router-dom";
import '../../App.css'
import { useDispatch } from "react-redux";
import { LOGOUT } from "../../state/authenticationSlice";
import { delay } from "../../state/globalFunctions";

export function LoginNavbar() {
    return (
      <nav className="ui secondary menu">
        <h1 className="formtitle">Form the Future 2.0</h1>
        <h6 className="formlittletitle"><i>(with a form)</i></h6>
        <Link className="item" to="/">
          <i className="home icon"></i> Home
        </Link>
        <Link className="item" to="signup">
          <i className="home icon"></i> Sign up
        </Link>
        <Link className="item" to="login">
          <i className="headphones icon"></i> Log in
        </Link>
        <hr className="titleHR" />
    </nav>
    );
}

export function Navbar() {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  return (
    <nav className="ui secondary menu">
      <h1 className="formtitle">Form the Future 2.0</h1>
      <h6 className="formlittletitle"><i>(with a form)</i></h6>
      <Link className="item" to="/">
        <i className="home icon"></i> Home
      </Link>
      <Link className="item" to="newsurvey">
        <i className="music icon"></i> Add survey
      </Link>
      <Link className="item" to="surveys">
        <i className="music icon"></i> My Surveys
      </Link>
      <Link className="item" to="profile">
        <i className="search icon"></i> Profile
      </Link>
      <button className="item special" onClick={
        () => {dispatch(LOGOUT());
        delay(200).then(() => {
          navigate("/");
        })
      }}>
        <i className="search icon"></i> Log out
      </button>
      <hr className="titleHR" />
    </nav>
  );
}
