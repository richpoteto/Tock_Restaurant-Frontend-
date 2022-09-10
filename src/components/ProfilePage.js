import { useOutletContext } from "react-router-dom";
import "../styles/ProfilePage.css";

function ProfilePage() {
  // Retrieving user object from OutletContext.
  const user = useOutletContext();
  console.log(user);

  return (
    <div className="profile-page">
      <ProfileShow user={user} />
      <ReservationsShow />
    </div>
  );
}

function ProfileShow({ user }) {
  return (
    <div className="profile-show">
      <h3 className="username-show">{user.displayName}</h3>
      <button className="edit-profile-btn">Edit Profile</button>
      <ProfilePhoto photoURL={user.photoURL} />
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

function ReservationsShow() {
  return (
    <div className="reservations-show">
      <ReservationsSidenav />
      <ReservationsList />
    </div>
  );
}

function ReservationsSidenav() {
  return (
    <div className="reservations-sidenav">

    </div>
  );
}

function ReservationsList() {
  return (
    <li className="reservations-list">

    </li>
  );
}

function ReservationCard() {
  return (
    <div className="reservation-card">

    </div>
  );
}

export default ProfilePage;