import TockLogo from '../resources/images/tock-logo.png';
import '../styles/Header.css';
import { CUISINES } from '../resources/data/RESTAURANTS';

function Header() {
  return (
    <div className="header">
      <div className="header-show-search-container">
        <HeaderShow />
        <CuisineSearchBtn />
        <CuisineSelect />
      </div>
      <HeaderUser />
    </div>
  );
}

function HeaderShow() {
  return (
    <div className="header-show">
      <img src={TockLogo} alt="The tock logo." className="header-show-logo" />
      <h1 className="header-show-text">toock</h1>
    </div>
  );
}

function CuisineSearchBtn() {
  return (
    <button className="cuisine-search-btn">
      <span className="material-symbols-outlined">search</span>
      <span className="cuisine-search-text">Pick a cuisine</span>
    </button>
  );
}

function CuisineSelect() {
  const cuisines = CUISINES;

  return (
    <ul className="cuisine-ul">
      {cuisines.map((cuisine) => {
        return (
          <button key={cuisine} className="cuisine-btn">
            <span className="material-symbols-outlined">search</span>
            {cuisine}
          </button>
        );
      })}
    </ul>
  );
}

function HeaderUser() {
  return (
    <div className="header-user">
      <button className="header-user-btn">Sign up</button>
      <button className="header-user-btn login">Log in</button>
    </div>
  );
}

export default Header;