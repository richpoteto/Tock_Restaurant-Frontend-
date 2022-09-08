import '../styles/LoginPage.css';
import { Link, useNavigate } from 'react-router-dom';
import { getCurrentUserFromAuth, auth, registerWithEmailPassword, signOutUser, userSigninWithEmailPassword, updateUserNameAndPhoto } from '../firebase/firebaseAuth';
import { useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';

function LoginPage({ signingUp }) {
  const [user, setUser] = useState(null);
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setUser(user);
    })
  }, []);

  if (!user) {
    return (
      <div className="login-page">
        <LoginPageHeader signingUp={signingUp} />
        <PartnerLoginList signingUp={signingUp} />
        <BreakLine />
        {signingUp ? <SignupForm /> : <LoginForm />}
        <FormChange signingUp={signingUp} />
        <button onClick={() => console.log(getCurrentUserFromAuth())}>Check user is signed in?</button>
        <button onClick={signOutUser}>log out</button>
        <p>{user ? `user.email${user.email}` : "no user"}</p>
      </div>
    );
  } else {
    return <RedirectToHome />
  }
}

function LoginPageHeader({ signingUp }) {
  return (
    <h3 className="login-page-header">
      {signingUp ? "Sign up" : "Log in"} to continue
    </h3>
  );
}

function PartnerLoginList(props) {
  return (
    <div className="partner-login-list">
      <PartnerLoginBtn partner="Google" {...props} />
      <PartnerLoginBtn partner="Apple" {...props} />
      <PartnerLoginBtn partner="Facebook" {...props} />
    </div>
  );
}

function PartnerLoginBtn({ partner, signingUp }) {
  return (
    <button className="parter-login-btn">
      {signingUp ? `Use my ${partner} account` : `Log in with ${partner}`}
    </button>
  );
}

function BreakLine() {
  return (
    <div className="break-line-container">
      <div className="break-line"></div>
      <span>OR</span>
    </div>
  );
}

function LoginForm() {
  const [userNotFound, setUserNotFound] = useState(false);
  const [wrongPassword, setWrongPassword] = useState(false);

  async function onSubmitLogin(event) {
    event.preventDefault();
    const email = event.target.email.value;
    const password = event.target.password.value;
    const errorCode = await userSigninWithEmailPassword(email, password);
    // console.log(errorCode === "auth/wrong-password");
    if (errorCode === "auth/wrong-password") {
      setUserNotFound(false);
      setWrongPassword(true);
    } else if (errorCode === "auth/user-not-found") {
      setUserNotFound(true);
      setWrongPassword(false);
    } else {
      setUserNotFound(false);
      setWrongPassword(false);
    }
  }

  return (
    <form className="login-form" onSubmit={onSubmitLogin}>
      <label>Email address
        <input type="email" name="email" required />
      </label>
      <label>Password
        <input type="password" name="password" required />
      </label>
      <a>Forgot password?</a>
      {userNotFound ? <p className="wrong-p">Email is not registered yet. Create an account now.</p> : null}
      {wrongPassword ? <p className="wrong-p">Wrong email or password. Please try again.</p> : null}
      <button type="submit">
        Log in
      </button>
    </form>
  );
}

function SignupForm() {
  const [emailUsed, setEmailUsed] = useState(false);
  const [invalidEmail, setInvalidEmail] = useState(false);

  async function onSubmitSignup(event) {
    event.preventDefault();
    const email = event.target.email.value;
    const password = event.target.password.value;
    const registerErrorCode = await registerWithEmailPassword(email, password);
    if (registerErrorCode === "auth/email-already-in-use") {
      setEmailUsed(true);
      setInvalidEmail(false);
    } else if (registerErrorCode === "auth/invalid-email") {
      setEmailUsed(false);
      setInvalidEmail(true);
    } else {
      setEmailUsed(false);
      setInvalidEmail(false);
    }
    const username = event.target.username.value;
    const updateErrorCode = await updateUserNameAndPhoto(username);
    console.log(updateErrorCode);
  }

  return (
    <form className="login-form" onSubmit={onSubmitSignup}>
      <label>Email address
        <input type="email" name="email" required />
      </label>
      <label>Password
        <input type="password" name="password" minLength="6" required />
      </label>
      <label>Username
        <input type="text" name="username" required />
      </label>
      {emailUsed ? <p className="wrong-p">Email is already registered. Try logging in.</p> : null}
      {invalidEmail ? <p className="wrong-p">Invalid Email address. Try again.</p> : null}
      <button type="submit">
        Sign up
      </button>
    </form>
  );
}

function FormChange({ signingUp }) {
  return (
    <p className="create-account-p">
      {signingUp ? "Already have an account?" : "New to Toock?"}
      <Link to={signingUp ? "/login" : "/signup"}>
        {signingUp ? "Log in" : "Create an account"}
      </Link>
    </p>
  );
}

function RedirectToHome() {
  let navigate = useNavigate();

  // useEffect(() => {
  //   setTimeout(() => {
  //     navigate("/");
  //   }, 2000);
  // }, []);

  return (
    <div className="redirect-to-home">
      <p>You are signed in.</p>
      <p>Redirecting to home page now...</p>
      <Link to="/">Click here if not redirected</Link>
      <button onClick={signOutUser}>log out</button>
    </div>
  )
}

export default LoginPage;