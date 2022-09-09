import '../styles/SearchPage.css';
import { RESTAURANTS } from '../resources/data/RESTAURANTS';
import { createSearchParams, useNavigate, useSearchParams } from 'react-router-dom';
import SearchBar from './SearchBar';
import { getBookedTimeSlotsOnDateForRestaurantFromFirestore } from '../firebase/firestore';
import { useEffect, useState } from 'react';

function SearchPage() {
  // Using useSearchParams() to get each param including cuisine, date, hour, partySize.
  const [searchParams] = useSearchParams();
  const searchParamsObj = 
  {
    cuisine: searchParams.get('cuisine'),
    date: searchParams.get('date'),
    hour: searchParams.get('hour'),
    partySize: searchParams.get('partySize')
  };

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
      <FiltersContainer />
      <ResultsList 
        restaurantsArray={getRestaurantsArrayFromSearchParams(searchParams)}
        partySize={searchParamsObj.partySize}
        date={searchParamsObj.date}
        hour={searchParamsObj.hour}
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

function ResultsList({ restaurantsArray, partySize, date, hour }) {
  return (
    <div className="results-list">
      {restaurantsArray.map((restaurant) => {
        return (
          <ResultCard 
            key={restaurant.name}
            restaurant={restaurant}
            partySize={partySize}
            date={date}
            hour={hour}
          />
        );
      })}
    </div>
  );
}

function ResultCard(props) {
  return (
    <div className="result-card">
      <ResultShow restaurant={props.restaurant} />
      <BookingCard 
        {...props}
      />
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
      <p className="result-show-price-cuisine">
        {"$".repeat(Number(restaurant.price))} | {restaurant.cuisine}
      </p>
    </div>
  );
};

function BookingCard(props) {
  return (
    <div className="booking-card">
      <p className="booking-card-header">
        <span className="material-symbols-outlined">restaurant</span>
        Reservation for parties of {props.partySize}
      </p>
      <SlotsRow {...props} />
    </div>
  );
}

function SlotsRow({ restaurant, partySize, date, hour }) {
  // const mockSlotsArray = [16, 17, 18, 19, 20, 21, 22];
  // const showingSlotsArray = mockSlotsArray.slice(0, 4);
  const [showingSlotsArray, setShowingSlotsArray] = useState([]);

  // Update showingSlotsArray everytime the page gets new form inputs, e.g. date, cuisine, hour, partySize.
  useEffect(() => {
    async function updateShowingSlots() {
      const availableTimeSlots = await getAvailableSlotsFromFirestore(restaurant, date, hour);
      const showingSlotsArray = makeShowingSlotsArray(availableTimeSlots, hour);
      setShowingSlotsArray(showingSlotsArray);
    }
    updateShowingSlots();
  }, [restaurant, partySize, date, hour]);

  // Give available time slots for restaurant at the query date from Firestore.
  async function getAvailableSlotsFromFirestore(restaurant, date, hour) {
    const bookedSlots = await getBookedTimeSlotsOnDateForRestaurantFromFirestore(restaurant.name, date);
    // Calculate an array of all time slots for the restaurant.
    // const qHour = Number(hour);
    const openHour = restaurant.openHour;
    const closeHour = restaurant.closeHour;
    // Make array of all time slots from restaurant's openHour to closeHour.
    const allTimeSlots = Array.from(Array(closeHour - openHour), (e, i) => i  + openHour);
    // console.log("allTimeShots: ", allTimeSlots);
    // Make array of available time slots from allTimeSlots and bookedSlots.
    const availableTimeSlots = allTimeSlots.filter((e) => !bookedSlots.includes(e));
    // console.log("availableTimeSlots: ", availableTimeSlots);
    return availableTimeSlots;
  }

  // Make showingSlotsArray from availableTimeSlots according to qHour.
  function makeShowingSlotsArray(availableTimeSlots, qHour) {
    let showingSlotsArray;
    // If qHour is earlier than restaurant's openHour:
    if (qHour <= availableTimeSlots[0]) {
      showingSlotsArray = availableTimeSlots.slice(0, 4);
    } else {
      // Otherwise, make showingSlotsArray where it starts with the next avaiable slot later than qHour:
      const qHourIndex = availableTimeSlots.findIndex((e) => e >= qHour);
      showingSlotsArray = availableTimeSlots.slice(qHourIndex, qHourIndex + 4);
    }
    // console.log("showingSlotsArray: " ,showingSlotsArray);
    return showingSlotsArray;
  }

  if (showingSlotsArray.length !== 0) {
    return (
      <div className="slots-row">
        {showingSlotsArray.map((slot) => {
          return (
            <SlotBtn 
              key={slot}
              hour={slot}
              restaurant={restaurant}
              date={date}
              partySize={partySize}
            />
          );
        })}
      </div>
    )
  } else {
    return (
      <div className="slots-row-none">
        No time slots found. Please try another date.
      </div>
    )
  }
}

function SlotBtn({ hour, restaurant, date, partySize }) {
  // Using createSearchParams() to navigate to /book?...
  let navigate = useNavigate();

  function onClickSlotBtn(event) {
    event.preventDefault();
    const paramsObj = 
      {
        restaurant: restaurant.name,
        date: date,
        hour: hour,
        partySize: partySize
      };
    const searchParams = createSearchParams(paramsObj);
    navigate(`/book?${searchParams}`);
  }

  return (
    <button className="slot-btn" onClick={onClickSlotBtn}>
      {`${hour}:00`}
    </button>
  );
}

export default SearchPage;