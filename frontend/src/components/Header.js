import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout, reset } from "../features/auth/authSlice";
import { reset as resetCampground } from "../features/campgrounds/campgroundsSlice";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const logoutFn = () => {
    dispatch(logout());
    dispatch(reset());
    dispatch(resetCampground());
    navigate("/");
  };

  return (
    <header className="header">
      <div className="logo">
        <Link to="/">Campgrounds</Link>
      </div>
      <ul>
        {user ? (
          <li>
            <button className="btn" onClick={logoutFn}>
              Logout
            </button>
          </li>
        ) : (
          <>
            <li>
              <Link to="/login">Login</Link>
            </li>
            <li>
              <Link to="/register">Register</Link>
            </li>
          </>
        )}
      </ul>
    </header>
  );
};

export default Header;
