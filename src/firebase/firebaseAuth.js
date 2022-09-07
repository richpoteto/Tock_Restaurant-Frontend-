import app from "./firebase";
import { getAuth } from "firebase/auth";

// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);

