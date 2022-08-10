import '../styles/LoginPage.css';
import { Link } from 'react-router-dom';

function LoginPage({ signingUp }) {
  // const [signingUp, setSigningUp] = useState(signUpPage);

  // function onFormChange() {
  //   setSigningUp(!signingUp);
  // }

  return (
    <div className="login-page">
      <LoginPageHeader signingUp={signingUp} />
      <PartnerLoginList signingUp={signingUp} />
      <BreakLine />
      <LoginForm signingUp={signingUp} />
      <FormChange signingUp={signingUp} />
    </div>
  );
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

function LoginForm({ signingUp }) {
  return (
      <form className="login-form">
        <label>Email address
          <input type="email" name="email" required />
        </label>
        <label>Password
          <input type="password" name="password" required />
        </label>
        {signingUp ? 
          <label>Username
            <input type="text" name="username" required />
          </label>
          :
          <a>Forgot password?</a>
        }
        <button type="submit">
          {signingUp ? "Sign up" : "Log in"}
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

export default LoginPage;