import { useOutletContext } from "react-router-dom";
import "../styles/ProfilePage.css";

function ProfilePage() {
  // Retrieving user object from OutletContext.
  const user = useOutletContext();
  return (
    <div className="profile-page">

    </div>
  )
}

export default ProfilePage;