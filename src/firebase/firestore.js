import app from "./firebase";
import { collection, doc, getDoc, getDocs, getFirestore, orderBy, query, serverTimestamp, setDoc, updateDoc, where, writeBatch } from "firebase/firestore";
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
  const q = query(reservationsRef, where("date", "==", qDate), where("cancelled", "==", false));
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    // console.log(doc.id, " => ", doc.data());
    bookedSlots.push(doc.data().hour);
  });
  console.log("booked slots fetched: " + bookedSlots);
  return bookedSlots;
}

// Batched writes this reservation from an user to both restaurant's reservations collection,
// and user's own reservations collection.
async function addRigisteredUserReservationTFS(reservationData) {
  const data = {
    restaurant: reservationData.restaurant,
    date: reservationData.date,
    hour: Number(reservationData.hour),
    partySize: Number(reservationData.partySize),
    username: reservationData.username,
    email: reservationData.email,
    uid: reservationData.uid,
    cancelled : false,
    createdAt: serverTimestamp(),
  }

  const batch = writeBatch(db);

  // Write to restaurant's reservations collection.
  const restaurantReservationsRef = collection(db, "restaurants", reservationData.restaurant, "reservations");
  batch.set(doc(restaurantReservationsRef), data);

  // Write to user's reservations collection.
  const userReservationsRef = collection(db, "users", reservationData.uid, "reservations");
  batch.set(doc(userReservationsRef), data);

  try {
    await batch.commit();
    console.log("Reservation made by user", reservationData.email, "successfully added.");
  } catch(error) {
    console.error(error);
  }
}

// Write this reservation from an unrigistered user to the restaurant's reservations collection.
async function addUnrigisteredUserReservationTFS(reservationData) {
  const reservationsRef = collection(db, "restaurants", reservationData.restaurant, "reservations");
  try {
    await setDoc(doc(reservationsRef), {
      restaurant: reservationData.restaurant,
      date: reservationData.date,
      hour: Number(reservationData.hour),
      partySize: Number(reservationData.partySize),
      username: reservationData.username,
      email: reservationData.email,
      uid: reservationData.uid,
      cancelled : false,
      createdAt: serverTimestamp(),
    });
    console.log("Reservation made by unregistered user", reservationData.email, "successfully added.");
  } catch(error) {
    console.error(error);
  }
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

// Get this user's upcoming reservations, where date is equal or later than dateString, sorted by date and hour.
async function getUserUpcomingReservationsFFS(uid, dateString) {
  let reservations = [];
  const reservationsRef = collection(db, "users", uid, "reservations");
  const q = query(reservationsRef, 
    where("date", ">=", dateString), where("cancelled", "==", false), orderBy("date"), orderBy("hour"));
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    const reservationObj = {
      reservationID: doc.id,
      ...doc.data(),
    };
    reservations.push(reservationObj);
  });
  console.log("upcoming reservations fetched: " + reservations);
  return reservations;
}

// Get this user's past reservations, where date is earlier than dateString, sorted by descending date and hour.
async function getUserPastReservationsFFS(uid, dateString) {
  let reservations = [];
  const reservationsRef = collection(db, "users", uid, "reservations");
  const q = query(reservationsRef, where("date", "<", dateString), orderBy("date", "desc"), orderBy("hour"));
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    const reservationObj = {
      reservationID: doc.id,
      ...doc.data(),
    };
    reservations.push(reservationObj);
  });
  console.log("past reservations fetched: " + reservations);
  return reservations;
}

// Get this user's cancelled reservations, where cancelled is true, sorted by descending date and hour.
async function getUserCancelledReservationsFFS(uid) {
  let reservations = [];
  const reservationsRef = collection(db, "users", uid, "reservations");
  const q = query(reservationsRef, where("cancelled", "==", true), orderBy("date", "desc"), orderBy("hour"));
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    const reservationObj = {
      reservationID: doc.id,
      ...doc.data(),
    };
    reservations.push(reservationObj);
  });
  console.log("cancelled reservations fetched: " + reservations);
  return reservations;
}

// Cancel this reservation, first from user's collection, then from the restaurant's collection.
async function cancelReservationTFS(reservationData, user) {
  const reservationUserRef = doc(db, "users", user.uid, "reservations", reservationData.reservationID);
  const docSnap = await getDoc(reservationUserRef);
  if (docSnap.exists()) {
    console.log("Reservation", reservationData.reservationID, "found. Cancelling it now...");
    await updateDoc(reservationUserRef, { cancelled: true});
    console.log("Reservation", reservationData.reservationID, "cancelled in user's collection.");
    console.log("Cancelling it in restaurant's collection now...");
    const reservationsRestaurantRef = collection(db, "restaurants", reservationData.restaurant, "reservations");
    const q = query(reservationsRestaurantRef, 
      where("uid", "==", user.uid), where("date", "==", reservationData.date), where("hour", "==", reservationData.hour));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach(async (docu) => {
      const reservationRestaurantRef = doc(db, "restaurants", reservationData.restaurant, "reservations", docu.id);
      await updateDoc(reservationRestaurantRef, {cancelled: true});
      console.log("Reservation in restaurant cancelled.");
    });
  } else {
    console.log("Reservation not found.");
  }
}

export { 
  addRESTAURANTSToFirestore, 
  getBookedTimeSlotsOnDateForRestaurantFromFirestore, 
  addUnrigisteredUserReservationTFS,
  addRigisteredUserReservationTFS,
  checkAddNewUserToFS,
  getUserUpcomingReservationsFFS,
  getUserPastReservationsFFS,
  getUserCancelledReservationsFFS,
  cancelReservationTFS
};
