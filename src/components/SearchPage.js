import '../styles/SearchPage.css';
import { RESTAURANTS } from '../resources/data/RESTAURANTS';
import { useNavigate, useParams } from 'react-router-dom';
import SearchBar from './SearchBar';

function SearchPage() {
  // Using useParams() and URLSearchParams to get each param including cuisine, date, hour, partySize.
  let params = useParams();
  const searchParams = new URLSearchParams(params.q);

  function getRestaurantsArrayFromSearchParams(searchParams) {
    const cuisine = searchParams.get('cuisine');
    let restaurantsArray;
    if (cuisine === 'All') {
      restaurantsArray = RESTAURANTS;
    } else {
      restaurantsArray = RESTAURANTS.filter((res) => res.cuisine === cuisine);
    }
    return restaurantsArray;
  }

  function getPartySizeFromSearchParams(searchParams) {
    return searchParams.get('partySize');
  }

  return (
    <div className="search-page">
      <FiltersContainer />
      <ResultsList 
        restaurantsArray={getRestaurantsArrayFromSearchParams(searchParams)}
        partySize={getPartySizeFromSearchParams(searchParams)}
      />
    </div>
  );
}

function FiltersContainer() {
  return (
    <div className="filters-container">
      <SearchBar cuisineSelectOn={true} />
    </div>
  );
}

function FilterCuisine() {
  return (
    <form className="filter-cuisine">
      <label>
        <select>

        </select>
      </label>
    </form>
  );
}

function ResultsList({ restaurantsArray, partySize }) {
  return (
    <div className="results-list">
      {restaurantsArray.map((restaurant) => {
        return (
          <ResultCard 
            key={restaurant.name}
            restaurant={restaurant}
            partySize={partySize}
          />
        );
      })}
    </div>
  );
}

function ResultCard({ restaurant, partySize }) {
  return (
    <div className="result-card">
      <ResultShow restaurant={restaurant} />
      <BookingCard partySize={partySize} />
    </div>
  ); 
}

function ResultShow({ restaurant }) {
  let navigate = useNavigate();

  function onClickResultShow() {
    navigate(`/restaurant/${restaurant.name}`);
  }

  return (
    <div className="result-show" onClick={onClickResultShow}>
      <ResultShowText restaurant={restaurant} />
      <img className="result-show-img" src={restaurant.photoURL} alt={restaurant.name} />
    </div>
  );
}

function ResultShowText({ restaurant }) {
  return (
    <div className="result-show-text">
      <h3 className="result-show-name">{restaurant.name}</h3>
      <p className="result-show-price-cuisine">{"$".repeat(Number(restaurant.price))} | {restaurant.cuisine}</p>
    </div>
  );
};

function BookingCard({ partySize }) {
  return (
    <div className="booking-card">
      <p className="booking-card-header">
        <span className="material-symbols-outlined">restaurant</span>
        Reservation for parties of {partySize}
      </p>
      <SlotsRow />
    </div>
  );
}

function SlotsRow() {
  const mockSlotsArray = [16, 17, 18, 19, 20, 21, 22];
  const showingSlotsArray = mockSlotsArray.slice(0, 4);

  return (
    <div className="slots-row">
      {showingSlotsArray.map((slot) => {
        return <SlotBtn key={slot} time={slot} />
      })}
    </div>
  );
}

function SlotBtn({ time }) {
  return (
    <button className="slot-btn">
      {`${time}:00`}
    </button>
  );
}

export default SearchPage;