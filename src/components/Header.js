import TockLogo from '../resources/images/tock-logo.png';
import '../styles/Header.css';
import { CUISINES } from '../resources/data/RESTAURANTS';
import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import { signOutUser } from '../firebase/firebaseAuth';

// Custom Hook for the CuisineSearchBtn and CuisineSelect alternating mechanism.
function useOutsideClick(ref, callback) {
  useEffect(() => {
    function handleClickOutside() {
      if (!ref.current) {
        // console.log("clicked outside");
        callback();
      } 
    }

    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    }
  }, [ref, callback]);
}

function Header({ user }) {
  const [cuisineSelectOn, setCuisineSelectOn] = useState(false);

  function onClickCuisineSearchBtn(event) {
    event.stopPropagation();
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
            <CuisineSearchBtn onClickCuisineSearchBtn={onClickCuisineSearchBtn} />
          </div>
        }
      </div>
      <HeaderUser user={user} />
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

function CuisineSearchBtn({ onClickCuisineSearchBtn }) {
  return (
    <button className="cuisine-search-btn" onClick={onClickCuisineSearchBtn}>
      <span className="material-symbols-outlined">search</span>
      <span className="cuisine-search-text">Pick a cuisine for today</span>
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

  const d = new Date();
  const dateStringNow = d.toLocaleDateString('en-ca'); // yyyy-mm-dd format of String.
  const timeStringNow = d.toLocaleTimeString('en-GB'); // 24-hour format.
  const currentHourNumber = Number(timeStringNow.slice(0, 2)); // Current hour in 2 digits of Number.
  const partySizeDefault = Number(2); // Default party size of 2 of Number.

  function onClickCuisineBtn() {
    // Using URLSearchParams to navigate to /search/q.
    const paramsObj = 
      {
        cuisine: cuisine,
        date: dateStringNow,
        hour: currentHourNumber,
        partySize: partySizeDefault
      };
    const searchParams = new URLSearchParams(paramsObj);
    const searchParamsString = searchParams.toString();
    navigate(`/search?${searchParamsString}`);
    onClickOutside();
  }

  return (
    <button key={cuisine} className="cuisine-btn" onClick={onClickCuisineBtn}>
      <span className="material-symbols-outlined">search</span>
      {cuisine}
    </button>
  );
}

function HeaderUser({ user }) {
  if (!user) {
    return (
      <div className="header-user">
        <Link to="signup" className="header-user-btn">Sign up</Link>
        <Link to="login" className="header-user-btn login">Log in</Link>
      </div>
    );
  } else {
    return (
      <div>
        <button className="header-user logged-in">
          { 
            user.photoURL 
            ? 
            <img src={user.photoURL} alt="User Profile Avatar" />
            : 
            <span className="material-symbols-outlined">account_circle</span>
          }
        </button>
        <button onClick={signOutUser}>signout</button>
      </div>

    )
  }
}

function HeaderSimple({ greyscale }) {
  return (
    <div className={greyscale ? "header-simple greyscale" : "header-simple"}>
      <HeaderShow />
    </div>
  );
}

export { Header, HeaderSimple };