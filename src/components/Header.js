import TockLogo from '../resources/images/tock-logo.png';
import '../styles/Header.css';
import { CUISINES } from '../resources/data/RESTAURANTS';
import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';

// Custom Hook for the CuisineSearchBtn and CuisineSelect alternating mechanism.
function useOutsideClick(ref, callback) {
  useEffect(() => {
    function handleClickOutside(event) {
      if (!ref.current ) {
        console.log("clicked outside");
        callback();
      } 
    }

    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    }
  }, [ref, callback]);
}

function Header() {
  const [cuisineSelectOn, setCuisineSelectOn] = useState(false);

  function onClickCuisineSearch(e) {
    e.stopPropagation();
    setCuisineSelectOn(true);
  }

  function onClickOutside() {
    setCuisineSelectOn(false);
  }

  // Implementing useOutsideClick custom hook here with a ref and the cb function onClickOutside().
  const cuisineSearchBtnRef = useRef(null);
  useOutsideClick(cuisineSearchBtnRef, onClickOutside);

  return (
    <div className="header">
      <div className="header-show-search-container">
        <HeaderShow />
        {cuisineSelectOn ? 
          <CuisineSelect onClickOutside={onClickOutside} /> 
          : 
          <div ref={cuisineSearchBtnRef}>
            <CuisineSearchBtn onClickCuisineSearch={onClickCuisineSearch} />
          </div>
        }
      </div>
      <HeaderUser />
    </div>
  );
}

function HeaderShow() {
  let navigate = useNavigate();

  function onClickHeaderShow() {
    navigate('/');
  }

  return (
    <div className="header-show">
      <img src={TockLogo} alt="The tock logo." className="header-show-logo" onClick={onClickHeaderShow} />
      <h1 className="header-show-text" onClick={onClickHeaderShow}>toock</h1>
    </div>
  );
}

function CuisineSearchBtn({ onClickCuisineSearch }) {
  return (
    <button className="cuisine-search-btn" onClick={onClickCuisineSearch}>
      <span className="material-symbols-outlined">search</span>
      <span className="cuisine-search-text">Pick a cuisine</span>
    </button>
  );
}

function CuisineSelect(props) {
  const cuisines = CUISINES;

  return (
    <ul className="cuisine-ul" >
      {cuisines.map((cuisine) => {
        return <CuisineBtn key={cuisine} cuisine={cuisine} {...props} />
      })}
    </ul>
  );
}

function CuisineBtn({ cuisine, onClickOutside }) {
  let navigate = useNavigate();

  function onClickCuisineBtn(event) {
    navigate(`/search-cuisine/${cuisine}`);
    // event.stopPropagation();
    // console.log(`/search-cuisine/${cuisine}`)
    onClickOutside();
  }

  return (
    <button key={cuisine} className="cuisine-btn" onClick={onClickCuisineBtn}>
      <span className="material-symbols-outlined">search</span>
      {cuisine}
    </button>
  );
}

function HeaderUser() {
  return (
    <div className="header-user">
      <Link to="signup" className="header-user-btn">Sign up</Link>
      <Link to="login" className="header-user-btn login">Log in</Link>
    </div>
  );
}

function HeaderSimple({ greyscale }) {
  return (
    <div className={greyscale ? "header-simple greyscale" : "header-simple"}>
      <HeaderShow />
    </div>
  );
}

export { Header, HeaderSimple };