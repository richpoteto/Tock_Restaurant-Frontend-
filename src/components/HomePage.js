import '../styles/HomePage.css';
import HomeBannerImage from '../resources/images/home-banner.jpg';
import { RESTAURANTS } from '../resources/data/RESTAURANTS';
import { useNavigate } from 'react-router-dom';
import SearchBar from './SearchBar';
import { addRESTAURANTSToFirestore } from '../firebase/firestore';

function HomePage() {
  return (
    <div className="home-page">
      <HomeBanner />
      <div className="banner-down-container">
        <SearchBar cuisineSelectOn={false} />
        <RestaurantShow />
      </div>
      {/* <AddRESTAURANTS /> */}
    </div>
  );
}

function HomeBanner() {
  return (
    <div className="home-banner">
      <img className="home-banner-img" src={HomeBannerImage} alt="Collage of delicious foods." />
      <pre className="home-banner-text">  DELICIOUS<br/>STARTS <br/>          HERE. </pre>
    </div>
  );
}

// function SearchBar() {
//   const d = new Date();

//   let navigate = useNavigate();

//   function onSubmitSearchBar(event) {
//     event.preventDefault();
//     // console.log(event.target);

//     // Using URLSearchParams to navigate to /search/q.
//     const paramsObj = 
//       {
//         cuisine: 'All',
//         date: event.target.date.value,
//         hour: event.target.hour.value,
//         partySize: event.target.partySize.value
//       };
//     const searchParams = new URLSearchParams(paramsObj);
//     const searchParamsString = searchParams.toString();
//     navigate(`/search/${searchParamsString}`);
//   }

//   return (
//     <form className="search-bar" onSubmit={onSubmitSearchBar}>
//       <SearchBarDateInput d={d} />
//       <SearchBarHourSelect d={d} />
//       <SearchBarPartySizeSelect maxSize="10" />
//       <button type="submit" className="search-bar-btn">
//         <span className="material-symbols-outlined">search</span>
//       </button>
//     </form>
//   );
// }

// function SearchBarDateInput({ d }) {
//   const dateStringNow = d.toLocaleDateString('en-ca'); // yyyy-mm-dd format

//   return (
//     <label>Date
//       <input type="date" name="date" min={dateStringNow} defaultValue={dateStringNow} />
//     </label>
//   );
// }

// function SearchBarHourSelect({ d }) {
//   const timeStringNow = d.toLocaleTimeString('en-GB'); // 24-hour format
//   const currentHourNumber = Number(timeStringNow.slice(0, 2));
  
//   // Array of hour integers from current hour to 22;
//   const hourNumbersArray = Array.from(Array(23 - currentHourNumber), (e, i) => i + currentHourNumber);

//   return (
//     <label>Time
//       <select name="hour" defaultValue={currentHourNumber}>
//         {hourNumbersArray.map((hour, i) => {
//           return (
//             <option key={hour} value={hour}>{i === 0 ? "Now" : `${hour}:00`}</option>
//           );
//         })}
//       </select>
//     </label>
//   );
// }

// function SearchBarPartySizeSelect({ maxSize }) {
//   const partySizeNumbersArray = Array.from(Array(Number(maxSize)), (e, i) => i + 1);

//   return (
//     <label>Party Size
//       <select defaultValue="2" name="partySize">
//         {partySizeNumbersArray.map((number) => {
//           return (
//             <option key={number} value={number}>{number} guests</option>
//           );
//         })}
//       </select>
//     </label>
//   );
// }

function RestaurantShow() {
  // Shows only 8 restaurants, most recently added.
  const restaurants = RESTAURANTS.slice(-8);

  return (
    <div className="home-restaurant-show">
      <h3 className="home-restaurant-show-header">Just Added</h3>
      <p className="home-restaurant-show-subheader">New restaurants on Toock</p>
      <RestaurantShowGrid restaurants={restaurants} />
    </div>
  );
}

function RestaurantShowGrid({ restaurants }) {
  return (
    <div className="home-restaurant-show-grid">
      {restaurants.map((restaurant) => {
        return (
          <RestaurantCard 
            key={restaurant.name}
            restaurant={restaurant}
          />
      );
    })}
    </div>
  );
}

function RestaurantCard({ restaurant }) {
  let navigate = useNavigate();

  function onClickRestaurantCard() {
    navigate(`/restaurant/${restaurant.name}`);
  }

  return (
    <div className="home-restaurant-card" onClick={onClickRestaurantCard}>
      <img className="home-restaurant-card-img" src={restaurant.photoURL} alt={restaurant.name} />
      <h5 className="home-restaurant-card-header">{restaurant.name}</h5>
      <p className="home-restaurant-card-text">{restaurant.cuisine}</p>
    </div>
  );
}

function AddRESTAURANTS() {
  function onClick() {
    addRESTAURANTSToFirestore();
  }

  return (
    <button onClick={onClick}>Add RESTAURANTS</button>
  );
}

export default HomePage;