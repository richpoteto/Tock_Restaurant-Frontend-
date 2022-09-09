import '../styles/LoginPage.css';
import { Link, useNavigate, useOutletContext } from 'react-router-dom';
import { registerWithEmailPassword, signOutUser, userSigninWithEmailPassword, updateUserNameAndPhoto, sendPasswordRecoveryEmail, registerWithPartnersPopup } from '../firebase/firebaseAuth';
import { useState } from 'react';

function LoginPage() {
  // Retrieving user object from OutletContext.
  const user = useOutletContext();

  if (!user) {
    return (
      <div className="login-page">
        <LoginPageHeader signingUp={false} />
        <PartnerLoginList signingUp={false} />
        <BreakLine />
        <LoginForm />
        <FormChange signingUp={false} />
        <button onClick={signOutUser}>log out</button>
      </div>
    );
  } else {
    return <RedirectToHome />
  }
}

function SignupPage() {
    // Retrieving user object from OutletContext.
  const user = useOutletContext();

  if (!user) {
    return (
      <div className="login-page">
        <LoginPageHeader signingUp={true} />
        <PartnerLoginList signingUp={true} />
        <BreakLine />
        <SignupForm />
        <FormChange signingUp={true} />
        <button onClick={signOutUser}>log out</button>
      </div>
    );
  } else {
    return <RedirectToHome />
  }
}

function ForgotpasswordPage() {
  const [invalidEmail, setInvalidEmail] = useState(false);
  const [userNotFound, setUserNorFound] = useState(false);
  const [recoveryEmailSent, setRecoveryEmailSent] = useState(false);

  async function onSubmit(event) {
    event.preventDefault();
    const email = event.target.email.value;
    const errorCode = await sendPasswordRecoveryEmail(email);
    if (errorCode === true) {
      setRecoveryEmailSent(true);
    } else if (errorCode === "auth/invalid-email") {
      setInvalidEmail(true);
      setUserNorFound(false);
    } else if (errorCode === "auth/user-not-found") {
      setInvalidEmail(false);
      setUserNorFound(true);
    } else {
      setInvalidEmail(false);
      setUserNorFound(false);
    }
  }

  return (
    <div className="login-page">
      <h3 className="login-page-header">Forgot your password?</h3>
      {
        recoveryEmailSent
        ?
        <p>Recovery email sent! Please check your email and follow its instructions.</p>
        :
        <form className="login-form" onSubmit={onSubmit}>
          <p>Enter the email you signed up with and you'll receive instructions on how to reset your password.</p>
          <label>Email address
            <input type="email" name="email" required />
          </label>
          {
            userNotFound 
            ?
            <div>
              <p className="wrong-p">Email is not registered yet. Create an account now.</p> 
              <p><Link to="/signup">Sign up</Link></p>
            </div>
            : 
            null
          }
          {invalidEmail ? <p className="wrong-p">Invalid Email address. Try again.</p> : null}
          <button type="submit">
            Send instructions
          </button>
        </form>
      }
    </div>
  )
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
      {/* <PartnerLoginBtn partner="Apple" {...props} />
      <PartnerLoginBtn partner="Facebook" {...props} /> */}
    </div>
  );
}

function PartnerLoginBtn({ partner, signingUp }) {
  return (
    <button className="parter-login-btn" onClick={() => registerWithPartnersPopup(partner)}>
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
  const [invalidEmail, setInvalidEmail] = useState(false);

  async function onSubmitLogin(event) {
    event.preventDefault();
    const email = event.target.email.value;
    const password = event.target.password.value;
    const errorCode = await userSigninWithEmailPassword(email, password);
    if (errorCode === "auth/wrong-password") {
      setUserNotFound(false);
      setWrongPassword(true);
      setInvalidEmail(false);
    } else if (errorCode === "auth/user-not-found") {
      setUserNotFound(true);
      setWrongPassword(false);
      setInvalidEmail(false);
    } else if (errorCode === "auth/invalid-email") {
      setUserNotFound(false);
      setWrongPassword(false);
      setInvalidEmail(true);
    } else {
      setUserNotFound(false);
      setWrongPassword(false);
      setInvalidEmail(false);
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
      <Link to="/forgotpassword">Forgot password?</Link>
      {userNotFound ? <p className="wrong-p">Email is not registered yet. Create an account now.</p> : null}
      {wrongPassword ? <p className="wrong-p">Wrong password. Please try again.</p> : null}
      {invalidEmail ? <p className="wrong-p">Invalid Email address. Try again.</p> : null}
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
    const errorCode = await registerWithEmailPassword(email, password);
    if (errorCode === "auth/email-already-in-use") {
      setEmailUsed(true);
      setInvalidEmail(false);
    } else if (errorCode === "auth/invalid-email") {
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
  //     navigate(-1);
  //   }, 2000);
  // }, []);

  function onClickPreviousPage() {
    navigate(-1);
  }

  return (
    <div className="redirect-to-home">
      <p>You are signed in.</p>
      <p>Redirecting to previous page ...</p>
      <button onClick={onClickPreviousPage}>Click here if not redirected</button>
      <button onClick={signOutUser}>log out</button>
    </div>
  )
}

export { LoginPage, SignupPage, ForgotpasswordPage };