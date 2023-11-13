const Title = () => {
  return (
    <a href="/">
      <img
        className="logo"
        src={require("../../assets/images/logo.png")}
        alt="logo"
      />
    </a>
  );
};

const Header = () => {
  return (
    <div className="header">
      <Title />
      <div className="nav-items">
        <ul>
          <li>Home</li>
          <li>About</li>
          <li>Contact</li>
          <li>Cart</li>
        </ul>
      </div>
    </div>
  );
};

export default Header;
