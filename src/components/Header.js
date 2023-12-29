import { Link } from "react-router-dom";
const Title = () => {
  return (
    <Link to="/">
      <img
        className="logo"
        src={require("../../assets/images/logo.png")}
        alt="logo"
      />
    </Link>
  );
};

const Header = () => {
  return (
    <div className="header">
      <Title />
      <div className="nav-items">
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
          <li>Contact</li>
          <li>Cart</li>
        </ul>
      </div>
    </div>
  );
};

export default Header;
