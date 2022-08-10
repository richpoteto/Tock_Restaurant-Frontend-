import '../styles/SearchBar.css';
import { useNavigate, useParams } from 'react-router-dom';
import { CUISINES } from '../resources/data/RESTAURANTS';

function SearchBar({ cuisineSelectOn }) {
  const d = new Date();

  let navigate = useNavigate();

  function onSubmitSearchBar(event) {
    event.preventDefault();

    // Using URLSearchParams to navigate to /search/q.
    const paramsObj = 
      {
        cuisine: `${event.target.cuisine ? event.target.cuisine.value : "All" }`,
        date: event.target.date.value,
        hour: event.target.hour.value,
        partySize: event.target.partySize.value
      };
    const searchParams = new URLSearchParams(paramsObj);
    const searchParamsString = searchParams.toString();
    navigate(`/search/${searchParamsString}`);
  }

  // Using useParams() and URLSearchParams to get each param including cuisine, date, hour, partySize.
  let params = useParams();
  const searchParams = new URLSearchParams(params.q);
  const searchParamsObj = 
    {
      cuisine: searchParams.get('cuisine'),
      date: searchParams.get('date'),
      hour: searchParams.get('hour'),
      partySize: searchParams.get('partySize')
    };

  // Get cuisinesArray for SearchBarCuisineSelect to use for options.
  const cuisinesArray = CUISINES;
  // if (searchParamsObj.cuisine === "All") {
  //   cuisinesArray = CUISINES;
  // } else {
  //   cuisinesArray = CUISINES.filter((cuisine) => cuisine === searchParamsObj.cuisine);
  // }

  return (
    <form className="search-bar" onSubmit={onSubmitSearchBar}>
      <SearchBarDateInput d={d} date={searchParamsObj.date} />
      <SearchBarHourSelect d={d} hour={searchParamsObj.hour} />
      <SearchBarPartySizeSelect maxSize="10" partySize={searchParamsObj.partySize} />
      {cuisineSelectOn ? 
        <SearchBarCuisineSelect cuisinesArray={cuisinesArray} cuisine={searchParamsObj.cuisine} />
        :
        null
      }
      <button type="submit" className="search-bar-btn">
        <span className="material-symbols-outlined">search</span>
      </button>
    </form>
  );
}

function SearchBarDateInput({ d, date }) {
  const dateStringNow = d.toLocaleDateString('en-ca'); // yyyy-mm-dd format

  return (
    <label>Date
      <input type="date" name="date" min={dateStringNow} defaultValue={date || dateStringNow} />
    </label>
  );
}

function SearchBarHourSelect({ d, hour }) {
  const timeStringNow = d.toLocaleTimeString('en-GB'); // 24-hour format
  const currentHourNumber = Number(timeStringNow.slice(0, 2));
  
  // Array of hour integers from current hour to 22;
  const hourNumbersArray = Array.from(Array(23 - currentHourNumber), (e, i) => i + currentHourNumber);

  return (
    <label>Time
      <select name="hour" defaultValue={hour || currentHourNumber}>
        {hourNumbersArray.map((hour, i) => {
          return (
            <option key={hour} value={hour}>{i === 0 ? "Now" : `${hour}:00`}</option>
          );
        })}
      </select>
    </label>
  );
}

function SearchBarPartySizeSelect({ maxSize, partySize }) {
  const partySizeNumbersArray = Array.from(Array(Number(maxSize)), (e, i) => i + 1);

  return (
    <label>Party Size
      <select defaultValue={partySize || 2} name="partySize">
        {partySizeNumbersArray.map((number) => {
          return (
            <option key={number} value={number}>{number} guests</option>
          );
        })}
      </select>
    </label>
  );
}

function SearchBarCuisineSelect({ cuisinesArray, cuisine }) {
  return (
    <label>Cuisine
      <select name="cuisine" defaultValue={cuisine || "All"}>
        {cuisinesArray.map((cuisine) => {
          return <option key={cuisine} value={cuisine}>{cuisine}</option>
        })}
      </select>
    </label>
  );
}

export default SearchBar;