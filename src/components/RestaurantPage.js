import '../styles/RestaurantPage.css';
import { RESTAURANTS } from '../resources/data/RESTAURANTS';
import { useParams, useNavigate, createSearchParams } from 'react-router-dom';
import { useState } from 'react';
import Spinner from './Spinner';
import { getBookedTimeSlotsOnDateForRestaurantFromFirestore } from '../firebase/firestore';

function RestaurantPage() {
  // Retrieve the restaurant object with useParams from react-router-dom from restaurantName.
  let params = useParams();
  const gotRestaurantName = params.restaurantName;
  const restaurant = RESTAURANTS.find((res) => {
    return res.name === gotRestaurantName;
  });

  return (
    <div className="restaurant-page">
      <div className="restaurant-page-main">
        <div className="restaurant-photo-show-container">
          <RestaurantPhoto restaurant={restaurant} />
          <RestaurantShow restaurant={restaurant} />
        </div>
       <BookingWindow restaurant={restaurant} /> 
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

function BookingWindow({ restaurant }) {
  const d = new Date();

  const [isLoading, setIsLoading] = useState(false);
  const [slotsArray, setSlotsArray] = useState([]);
  const [initialSearched, setInitialSearched] = useState(false);
  const [qInfo, setQInfo] = useState();

  // Give available time slots for restaurant at the query date from Firestore.
  async function getAvailableSlotsFromFirestore(restaurant, date, hour) {
    // Give available time slots for restaurant at the query date from Firestore.
    const bookedSlots = await getBookedTimeSlotsOnDateForRestaurantFromFirestore(restaurant.name, date);
    // Calculate an array of all time slots for the restaurant.
    const qHour = Number(hour);
    const allTimeSlots = Array.from(Array(restaurant.closeHour  - qHour), (e, i) => i + qHour);
    console.log("allTimeShots: ", allTimeSlots);
    // Make array of available time slots from allTimeSlots and bookedSlots.
    const availableTimeSlots = allTimeSlots.filter((e) => !bookedSlots.includes(e));
    console.log("availableTimeSlots: ", availableTimeSlots);
    // setSlotsArray(availableTimeSlots);
    return availableTimeSlots;
  }

  async function onSubmit(event) {
    event.preventDefault();
    const qDate = event.target.date.value;
    const qHour = Number(event.target.hour.value);
    const qPartySize = Number(event.target.partySize.value);
    setIsLoading(true);
    setQInfo({
      date: qDate,
      hour: qHour,
      partySize: qPartySize,
    });
    const availableTimeSlots = await getAvailableSlotsFromFirestore(restaurant, qDate, qHour);

    setSlotsArray(availableTimeSlots);

    setIsLoading(false);
    setInitialSearched(true);
  }

  // Using createSearchParams() to navigate to /book?...
  let navigate = useNavigate();

  function onClickSlotBtn(event) {
    event.preventDefault();

    const chosenHour = Number(event.target.innerText.slice(0, 2));
    const paramsObj = 
      {
        restaurant: restaurant.name,
        date: qInfo.date,
        hour: chosenHour,
        partySize: qInfo.partySize
      };
    const searchParams = createSearchParams(paramsObj);
    navigate(`/book?${searchParams}`);
  }

  return (
    <form className="booking-window" onSubmit={onSubmit}>
      <BookingWindowDateInput d={d} />
      <BookingWindowHourSelect d={d} openHour={restaurant.openHour} closeHour={restaurant.closeHour} />
      <BookingWindowPartySizeSelect maxSize="10" />
      <button 
        type="submit" 
        className=
          {isLoading 
          ? 
          "booking-window-btn loading" 
          : 
          `${initialSearched ? "booking-window-btn searched" : "booking-window-btn"}`
          }
      >
        {isLoading ? <Spinner /> : `${initialSearched ? "Search again" : "Search"}`}
      </button>
      <SlotsColumn 
        slotsArray={slotsArray}
        initialSearched={initialSearched}
        onClickSlotBtn={onClickSlotBtn}
      />
    </form>
  );
}

function BookingWindowDateInput({ d }) {
  const dateStringNow = d.toLocaleDateString('en-ca'); // yyyy-mm-dd format

  return (
    <label>Date
      <input 
        type="date" 
        name="date" 
        min={dateStringNow} 
        defaultValue={dateStringNow}
      />
    </label>
  );
}

function BookingWindowHourSelect({ d, openHour, closeHour }) {
  const timeStringNow = d.toLocaleTimeString('en-GB'); // 24-hour format
  const currentHourNumber = Number(timeStringNow.slice(0, 2));
  // Array of hour integers from current hour to 22;
  // const hourNumbersArray = Array.from(Array(23 - currentHourNumber), (e, i) => i + currentHourNumber);

  // Array of hour integers for this restaurant's open to close hours.
  const hourNumbersArray = Array.from(Array(closeHour - openHour), (e, i) => i + openHour);

  return (
    <label>Time
      <select name="hour" defaultValue={currentHourNumber}>
        {hourNumbersArray.map((hour, i) => {
          return (
            <option key={hour} value={hour}>
              {/* {i === 0 ? "Now" : `${hour}:00`} */}
              {hour + ":00"}
            </option>
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

function SlotsColumn({ slotsArray, initialSearched, onClickSlotBtn }) {
  // const mockSlotsArray = [16, 17, 18, 19, 20, 21, 22];

  // Showing only first 4 time slots from the slotsArray.
  const showingSlotsArray = slotsArray.slice(0, 4);

  if (initialSearched && !slotsArray.length) {
    return (
      <div className="slot-column-none">
        No slots found.
      </div>
    );
  } else {
    return (
      <div className="slots-column">
        {showingSlotsArray.map((slot) => {
          return (
            <SlotBtn key={slot} time={slot} onClickSlotBtn={onClickSlotBtn} />
          );
        })}
      </div>
    );
  }
}

function SlotBtn({ time, onClickSlotBtn }) {
  return (
    <button className="slot-btn" onClick={onClickSlotBtn}>
      {`${time}:00`}
    </button>
  );
}

export default RestaurantPage;