import '../styles/SearchPage.css';
import { RESTAURANTS } from '../resources/data/RESTAURANTS';
import { useNavigate, useParams } from 'react-router-dom';

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

  return (
    <div className="search-page">
      <ResultsList restaurantsArray={getRestaurantsArrayFromSearchParams(searchParams)} />
    </div>
  );
}

function ResultsList({ restaurantsArray }) {
  return (
    <div className="results-list">
      {restaurantsArray.map((restaurant) => {
        return (
          <ResultCard key={restaurant.name} restaurant={restaurant} />
        );
      })}
    </div>
  );
}

function ResultCard({ restaurant }) {
  return (
    <div className="result-card">
      <ResultShow restaurant={restaurant} />
      <BookingCard />
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

function BookingCard() {
  return (
    <div className="booking-card">
      <p className="booking-card-header">
        <span className="material-symbols-outlined">restaurant</span>
        Reservation for parties of 2
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