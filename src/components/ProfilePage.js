import { useEffect, useState } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import { signOutUser } from "../firebase/firebaseAuth";
import { getUserPastReservationsFFS, getUserUpcomingReservationsFFS } from "../firebase/firestore";
import { RESTAURANTS } from "../resources/data/RESTAURANTS";
import "../styles/ProfilePage.css";

function ProfilePage() {
  // Retrieving user object from OutletContext.
  const user = useOutletContext();

  // If user is null, then navigate to homepage.
  let navigate = useNavigate();
  useEffect(() => {
    if (!user) {
      navigate('/home');
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);


  return (
    <div className="profile-page">
      <div className="profile-show-container">
        <ProfileShow user={user} />
      </div>
      <ReservationsShow user={user} />
    </div>
  );
}

function ProfileShow({ user }) {
  let navigate = useNavigate();

  function onClickLogout() {
    signOutUser();
    navigate('/home');
  }

  return (
    <div className="profile-show">
      <div className="profile-show-left">
        <h3 className="username-show">{user ? user.displayName : "User"}</h3>
        <div className="profile-show-left-btns">
          <button className="edit-profile-btn">Edit Profile</button>
          <button className="edit-profile-btn log-out" onClick={onClickLogout}>Log Out</button>
        </div>
      </div>
      <ProfilePhoto photoURL={user ? user.photoURL : null} />
    </div>
  );
}

function ProfilePhoto({ photoURL }) {
  return (
    <div className="profile-photo">
      {
        photoURL 
        ? 
        <img src={photoURL} alt="User Profile Avatar" />
        : 
        <span className="material-symbols-outlined">account_circle</span>
      }
    </div>
  );
}

function ReservationsShow({ user }) {
  const [sidenavClicked, setSidenavClicked] = useState(0);

  function onClickSidenav(number) {
    setSidenavClicked(number);
  }

  return (
    <div className="reservations-show">
      <h2 className="reservations-show-header">Reservations</h2>
      <div className="reservations-show-main">
        <ReservationsSidenav sidenavClicked={sidenavClicked} onClickSidenav={onClickSidenav} />
        <ReservationsList user={user} sidenavClicked={sidenavClicked} />
      </div>
    </div>
  );
}

function ReservationsSidenav({ sidenavClicked, onClickSidenav }) {
  return (
    <div className="reservations-sidenav">
      <button 
        className={`reservations-sidenav-btn ${sidenavClicked === 0 ? "clicked" : null}`} 
        onClick={() => onClickSidenav(0)}
      >
        Upcoming
      </button>
      <button 
        className={`reservations-sidenav-btn ${sidenavClicked === 1 ? "clicked" : null}`} 
        onClick={() => onClickSidenav(1)}
      >
        Past
      </button>
      <button 
        className={`reservations-sidenav-btn ${sidenavClicked === 2 ? "clicked" : null}`} 
        onClick={() => onClickSidenav(2)}
      >
        Cancelled
      </button>
    </div>
  );
}

function ReservationsList({ user, sidenavClicked }) {
  // Get localeDateString in Canada.
  const d = new Date();
  const dateStringNow = d.toLocaleDateString('en-ca'); // yyyy-mm-dd format

  // Fetching and passing down upcoming/past/cancelled reservations.
  const [reservationsList, setReservationsList] = useState([]);

  async function onClickUpcoming() {
    const reservationsArray = await getUserUpcomingReservationsFFS(user.uid, dateStringNow);
    setReservationsList(reservationsArray);
  }

  async function onClickPast() {
    const reservationsArray = await getUserPastReservationsFFS(user.uid, dateStringNow);
    setReservationsList(reservationsArray);
  }

  useEffect(() => {
    if (sidenavClicked === 0) {
      onClickUpcoming();
    } else if (sidenavClicked === 1) {
      onClickPast();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sidenavClicked]);

  return (
    <div className="reservations-list">
      {reservationsList.map((reservation, index) => {
        return (
          <ReservationCard reservation={reservation} key={index} />
        );
      })}
    </div>
  );
}

function ReservationCard({ reservation }) {
  // Retrieve the restaurant object with reservation.restaurant.
  const restaurant = RESTAURANTS.find((res) => {
    return res.name === reservation.restaurant;
  });

  let navigate = useNavigate();
  function onClickRestaurantName() {
    navigate(`/restaurant/${restaurant.name}`);
  }

  return (
    <div className="reservation-card">
      <div className="reservation-card-main">
        <h4 className="reservation-card-main-restaurant-name" onClick={onClickRestaurantName}>{restaurant.name}</h4>
        <div className="reservation-card-show">
          <p className="reservation-card-show-info">
            <span className="material-symbols-outlined">calendar_month</span>
            <span>{reservation.date}</span>
          </p>
          <p className="reservation-card-show-info">
            <span className="material-symbols-outlined">schedule</span>
            <span>{`${reservation.hour}:00`}</span>
          </p>
          <p className="reservation-card-show-info">
            <span className="material-symbols-outlined">group</span>
            <span>{`${reservation.partySize} guests`}</span>
          </p>
        </div>
      </div>
      <img src={restaurant.photoURL} alt={restaurant.restaurant} />
    </div>
  );
}

export default ProfilePage;