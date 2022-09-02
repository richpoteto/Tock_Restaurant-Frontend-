import '../styles/BookPage.css';
import { Link, useSearchParams } from 'react-router-dom';
import { RESTAURANTS } from '../resources/data/RESTAURANTS';

function BookPage() {
  // Using useParams() and URLSearchParams to get each param including restaurant, date, hour, partySize.
  const [searchParams] = useSearchParams();
  const searchParamsObj = 
    {
      restaurant: searchParams.get('restaurant'),
      date: searchParams.get('date'),
      hour: searchParams.get('hour'),
      partySize: searchParams.get('partySize')
    };
  // const mockRestaurant = RESTAURANTS[1];
  // const mockSlot = {date: "2022-08-08", time: 17, partySize: 2};
  const restaurant = RESTAURANTS.find((res) => {
    return res.name === searchParamsObj.restaurant;
  });
  const slot = {
    date: searchParamsObj.date,
    hour: searchParamsObj.hour,
    partySize: searchParamsObj.partySize
  };

  return (
    <div className="book-page">
      <h3 className="book-page-title">Complete your reservation</h3>
      <BookShow restaurant={restaurant} slot={slot} />
      <AddDetailForm />
    </div>
  );
}

function BookShow({ restaurant, slot }) {
  return (
    <div className="book-show">
      <div className="book-show-main">
        <h4 className="book-show-restaurant-name">{restaurant.name}</h4>
        <BookShowSlot slot={slot} />
      </div>
      <img src={restaurant.photoURL} alt={restaurant.name} />
    </div>
  );
}

function BookShowSlot({ slot }) {
  return (
    <div className="book-show-slot">
      <p className="book-show-slot-info">
        <span className="material-symbols-outlined">calendar_month</span>
        <span>{slot.date}</span>
      </p>
      <p className="book-show-slot-info">
        <span className="material-symbols-outlined">schedule</span>
        <span>{`${slot.hour}:00`}</span>
      </p>
      <p className="book-show-slot-info">
        <span className="material-symbols-outlined">group</span>
        <span>{`${slot.partySize} guests`}</span>
      </p>
    </div>
  );
}

function AddDetailForm() {
  return (
    <form className="add-detail-form">
      <p className="add-detail-form-title">Add your reservation details</p>
      <LoginLine />
      <label>Username
        <input type="text" placeholder="Username" required />
      </label>
      <label>Email address
        <input type="email" placeholder="Email address" required />
      </label>
      <button type="submit">
        Complete reservation
      </button>
    </form>
  );
}

function LoginLine() {
  return (
    <div className="login-line">
      Already a Toock user?
      &nbsp;
      <Link to='/login'>Log in</Link>
      &nbsp;
      to skip this step, or
      &nbsp;
      <Link to='/signup'>Sign up</Link>
      &nbsp; 
      to create an account.
    </div>
  );
}

export default BookPage;