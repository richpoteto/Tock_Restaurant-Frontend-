import '../styles/BookPage.css';
import { RESTAURANTS } from '../resources/data/RESTAURANTS';

function BookPage() {
  const mockRestaurant = RESTAURANTS[1];
  const mockSlot = {date: "2022-08-08", time: 17, partySize: 2};

  return (
    <div className="book-page">
      <h3 className="book-page-title">Complete your reservation</h3>
      <BookShow restaurant={mockRestaurant} slot={mockSlot} />
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
        <span>{`${slot.time}:00`}</span>
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
      Already a Toock user? <a>Log in</a> to skip this step, or <a>Sign up</a> to create an account.
    </div>
  );
}

export default BookPage;