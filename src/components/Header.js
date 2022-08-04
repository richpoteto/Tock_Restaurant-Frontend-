import TockLogo from '../resources/images/tock-logo.png';

function Header() {
  return (
    <div className="header">
      <HeaderShow />
      {/* <CuisineSearch />
      <HeaderUser /> */}
    </div>
  );
}

function HeaderShow() {
  return (
    <div className="header-show">
      <img src={TockLogo} alt="Logo Image" className="header-show-logo" />
      <h1>Toock</h1>
    </div>
  )
}

export default Header;