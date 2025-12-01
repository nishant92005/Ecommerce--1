import { Link, useNavigate } from "react-router-dom";
import Style from "./Navbar.module.css";
import logo from '../../../assets/logo.jpg'

const Navbar = () => {
  const auth = localStorage.getItem("user");
  const user = JSON.parse(auth)?.user?.name;
  const navigate = useNavigate();
  
  const logout = () => {
    localStorage.clear();
    navigate("/");
  };
  
  return (
    <div className={Style["nav"]}>
      <Link to="/" className={Style["logoLink"]}>
        <img src={logo} alt="logo" className={Style["logo"]} />
        <span className={Style["brandName"]}>E-Commerce</span>
      </Link>
      {auth ? (
        <ul className={Style["navLinks"]}>
          <li><Link to="/">Home</Link></li>
          <li className={Style["userInfo"]}>
            <span>Welcome, {user}</span>
          </li>
          <li>
            <button onClick={logout} className={Style["logoutBtn"]}>
              Logout
            </button>
          </li>
        </ul>
      ) : (
        <ul className={Style["navLinks"]}>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/register">Register</Link></li>
          <li><Link to="/login">Login</Link></li>
        </ul>
      )}
    </div>
  );
};

export default Navbar;
