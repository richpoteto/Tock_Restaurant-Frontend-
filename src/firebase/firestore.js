import app from "./firebase";
import { collection, doc, getDocs, getFirestore, query, setDoc, where } from "firebase/firestore";
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
  console.log("Document written into collection: ", restaurantsRef.id);
}

// Get reserved time slots for a specific restaurant for a specific date.
async function getTimeSlotsOnDateForRestaurantFromFirestore(qRestaurantName, qDate) {
  const bookedSlots = [];
  const reservationsRef = collection(db, "restaurants", qRestaurantName, "reservations");
  const q = query(reservationsRef, where("date", "==", qDate));
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    console.log(doc.id, " => ", doc.data());
    bookedSlots.push(doc.data().time);
  });
  console.log("slots fetched: " + bookedSlots);
  return bookedSlots;
}

export { addRESTAURANTSToFirestore, getTimeSlotsOnDateForRestaurantFromFirestore };
