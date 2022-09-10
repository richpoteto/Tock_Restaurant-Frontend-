import app from "./firebase";
import { collection, doc, getDoc, getDocs, getFirestore, query, setDoc, where } from "firebase/firestore";
import { RESTAURANTS } from "../resources/data/RESTAURANTS";

// Initialize Cloud Firestore and get a reference to the service.
const db = getFirestore(app);

// Add or update RESTAURANTS data to Firestore.
function addRESTAURANTSToFirestore() {
  RESTAURANTS.forEach((restaurant) => {
    addRestaurantDataToFirestore(restaurant);
  });
}

// Add or update restaurant data to Firestore.
async function addRestaurantDataToFirestore(restaurantData) {
  // Add a new document with a generated id.
  const restaurantsRef = collection(db, "restaurants");
  await setDoc(doc(restaurantsRef, restaurantData.name), restaurantData);
  // console.log("Document written into collection: ", restaurantsRef.id);
}

// Get reserved time slots for a specific restaurant for a specific date.
async function getBookedTimeSlotsOnDateForRestaurantFromFirestore(qRestaurantName, qDate) {
  const bookedSlots = [];
  const reservationsRef = collection(db, "restaurants", qRestaurantName, "reservations");
  const q = query(reservationsRef, where("date", "==", qDate));
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    // console.log(doc.id, " => ", doc.data());
    bookedSlots.push(doc.data().hour);
  });
  console.log("slots fetched: " + bookedSlots);
  return bookedSlots;
}

// Post reservation data to Firestore, under this restaurant's "reservations" collection,
// the other one under individual user's "reservations" collection.
// Data includes restaurant, date, hour, partySize, username, email and uid.
async function addReservationToFirestore(reservationData) {
  const reservationsRef = collection(db, "restaurants", reservationData.restaurant, "reservations");
  await setDoc(doc(reservationsRef), {
    date: reservationData.date,
    hour: Number(reservationData.hour),
    partySize: Number(reservationData.partySize),
    username: reservationData.username,
    email: reservationData.email,
    uid: reservationData.uid
  });
  // Add this reservation data to this user's own "reservations" collection if it has uid.
  if (reservationData.uid) {
    await addReservationUnderUserTFS(reservationData);
  }
}

// Post/add reservation data under this user's "reservations" collection via uid.
async function addReservationUnderUserTFS(reservationData) {
  const reservationsRef = collection(db, "users", reservationData.uid, "reservations");
  await setDoc(doc(reservationsRef), {
    restaurant: reservationData.restaurant,
    date: reservationData.date,
    hour: reservationData.hour,
    partySize: reservationData.partySize
  });
  console.log("addReservationUnderUserTFS ran once.");
}

// Post/add user data to Firestore, under "users" collection, with uid as doc
async function checkAddNewUserToFS(user) {
  // Checks if the user is already in "users" collection.
  const userRef = doc(db, "users", user.uid);
  const docSnap = await getDoc(userRef);
  if (docSnap.exists()) {
    console.log("user ", docSnap.data().uid, "inside db.");
  } else {
    // Add user date under "users" collection.
    console.log("user ", user.uid, "not in users collection, adding now...");
    await setDoc(userRef, {
      username: user.displayName,
      email: user.email,
      uid: user.uid,
      photoURL: user.photoURL,
    });
  }
}

export { 
  addRESTAURANTSToFirestore, 
  getBookedTimeSlotsOnDateForRestaurantFromFirestore, 
  addReservationToFirestore,
  checkAddNewUserToFS
};
