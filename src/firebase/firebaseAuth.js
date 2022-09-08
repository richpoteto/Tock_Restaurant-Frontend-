import app from "./firebase";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut, updateProfile } from "firebase/auth";

// Initialize Firebase Authentication and get a reference to the service.
const auth = getAuth(app);

// Create user with email/password.
async function registerWithEmailPassword(email, password) {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    console.log(user);
  } catch(error) {
    console.error(error);
    // Error codes: "auth/email-already-in-use", "auth/invalid-email".
    return error.code;
  }
}

// Sign in user with email/password.
async function userSigninWithEmailPassword(email, password) {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    console.log(user);
  } catch(error) {
    console.error(error);
    // Error codes: "auth/wrong-password", "auth/user-not-found".
    return error.code;
  }
}

// Listen to auth state changes.
// function monitorAuthState() {
//   onAuthStateChanged(auth, (user) => {
//     if (user) {
//       // User is signed in.
//       console.log("monitorAuth" + user.uid);
//       return user;
//     } else {
//       // User is not signed in or signed out.
//     }
//   });
// }

// Returns current user, or null if not signed in.
function getCurrentUserFromAuth() {
  return auth.currentUser;
}

// Signs out the current user.
function signOutUser() {
  signOut(auth);
}

// Updates user's displayName and photoURL.
async function updateUserNameAndPhoto(userName, photoUrl = null) {
  try {
    updateProfile(auth.currentUser, {
      displayName: userName, photoURL: photoUrl
    });
  } catch(error) {
    console.log(error);
    return error.code;
  }
}
 
export { 
  registerWithEmailPassword, 
  userSigninWithEmailPassword, 
  auth,
  getCurrentUserFromAuth,
  signOutUser,
  updateUserNameAndPhoto
};