import app from "./firebase";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, updateProfile, sendPasswordResetEmail } from "firebase/auth";

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
    console.error(error);
    return error.code;
  }
}

// Send user the password recovery email with email provided.
async function sendPasswordRecoveryEmail(email) {
  try {
    await sendPasswordResetEmail(auth, email);
    return true;
  } catch(error) {
    // Error codes: "auth/invalid-email".
    console.error(error);
    return error.code;
  }
}
 
export { 
  registerWithEmailPassword, 
  userSigninWithEmailPassword, 
  auth,
  signOutUser,
  updateUserNameAndPhoto,
  sendPasswordRecoveryEmail
};