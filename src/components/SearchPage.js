import '../styles/SearchPage.css';
import { RESTAURANTS } from '../resources/data/RESTAURANTS';
import { useParams } from 'react-router-dom';

function SearchPage() {
  // Get restaurant name with useParams from react-router-dom.
  let params = useParams();
  const gotCuisine = params.cuisine;
  const restaurantsOfCuisine = RESTAURANTS.filter((res) => res.cuisine === gotCuisine);

  return (
    <div className="search-page">
      <ResultsList restaurantsArray={restaurantsOfCuisine} />
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

function ResultCard(props) {
  return (
    <div className="result-card">
      <ResultShow {...props} />
      <BookingCard />
    </div>
  ); 
}

function ResultShow({ restaurant }) {
  return (
    <div className="result-show">
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