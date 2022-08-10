import '../styles/RestaurantPage.css';
import { RESTAURANTS } from '../resources/data/RESTAURANTS';
import { useParams } from 'react-router-dom';

function RestaurantPage() {
  // Get restaurant name with useParams from react-router-dom.
  let params = useParams();
  const gotRestaurantName = params.restaurantName;
  const restaurant = RESTAURANTS.find((res) => {
    return res.name === gotRestaurantName;
  });

  return (
    <div className="restaurant-page">
      <div className="photo-booking-show-container">
       <RestaurantPhoto restaurant={restaurant} />
       <BookingWindow /> 
       <RestaurantShow restaurant={restaurant} />
      </div>
    </div>
  );
}

function RestaurantPhoto({ restaurant }) {
  return (
    <div className="restaurant-photo">
      <img className="restaurant-photo-img" src={restaurant.photoURL} alt={restaurant.name} />
    </div>
  );
}

function RestaurantShow({ restaurant }) {
  return (
    <div className="restaurant-show">
      <h3 className="restaurant-show-name">{restaurant.name}</h3>
      <p className="restaurant-show-price-cuisine">{"$".repeat(Number(restaurant.price))} | {restaurant.cuisine}</p>
      <p className="restaurant-show-description">{restaurant.description}</p>
    </div>
  );
}

function BookingWindow() {
  const d = new Date();

  return (
    <form className="booking-window">
      <BookingWindowDateInput d={d} />
      <BookingWindowHourSelect d={d} />
      <BookingWindowPartySizeSelect maxSize="10" />
      <button type="submit" className="booking-window-btn">
        Book Now
      </button>
    </form>
  );
}

function BookingWindowDateInput({ d }) {
  const dateStringNow = d.toLocaleDateString('en-ca'); // yyyy-mm-dd format

  return (
    <label>Date
      <input type="date" name="date" min={dateStringNow} defaultValue={dateStringNow} />
    </label>
  );
}

function BookingWindowHourSelect({ d }) {
  const timeStringNow = d.toLocaleTimeString('en-GB'); // 24-hour format
  const currentHourNumber = Number(timeStringNow.slice(0, 2));
  // Array of hour integers from current hour to 22;
  const hourNumbersArray = Array.from(Array(23 - currentHourNumber), (e, i) => i + currentHourNumber);

  return (
    <label>Time
      <select name="hour" defaultValue={currentHourNumber}>
        {hourNumbersArray.map((hour, i) => {
          return (
            <option key={hour} value={hour}>{i === 0 ? "Now" : `${hour}:00`}</option>
          );
        })}
      </select>
    </label>
  );
}

function BookingWindowPartySizeSelect({ maxSize }) {
  const partySizeNumbersArray = Array.from(Array(Number(maxSize)), (e, i) => i + 1);

  return (
    <label>Party Size
      <select defaultValue="2" name="partySize">
        {partySizeNumbersArray.map((number) => {
          return (
            <option key={number} value={number}>{number} guests</option>
          );
        })}
      </select>
    </label>
  );
}

export default RestaurantPage;