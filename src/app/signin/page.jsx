import './signin.css'; 

const SignInPage = () => {
  return (
    <div className="signin-container">
      <div className="signin-content">
        <h1 className="signin-title">SHAJID COLLEGE LOGIN</h1>
        <button className="create-account-btn">Create Account</button>

        <form className="signin-form">
          <div>
            <label className="form-label">Email</label>
            <input type="email" className="input-field" placeholder="Enter your email" />
          </div>
          <div>
            <label className="form-label">Password</label>
            <div className="password-container">
              <input type="password" className="input-password" placeholder="Enter your password" />
              <button type="button" className="show-btn">SHOW</button>
            </div>
          </div>

          <div className="recaptcha-box">
            <p>I'm not a robot</p>
            <p className="recaptcha-hint">reCAPTCHA - Privacy - Terms</p>
          </div>

          <div className="forgot-link">
            <a href="#">Forgot your password?</a>
          </div>

          <div className="checkbox-group">
            <label className="checkbox-label">
              <input type="checkbox" />
              <span>Remember Me</span>
            </label>

            <label className="checkbox-label">
              <input type="checkbox" />
              <span>Are you signed in from a public computer?</span>
            </label>
          </div>

          <button type="submit" className="signin-btn">Sign In</button>

          <hr className="divider" />

          <button type="button" className="google-signin-btn">
            <span>Sign in with Google</span>
          </button>
        </form>

        <div className="footer">
          <p>
            | Shajid College of Nursinf & Midwifery, Akwanga, Nasarawa State | <br /> Phone: +234 123456789
          </p>
          <p className="footer-note">
            Shajid College is committed to a learning and working environment free from
            discrimination, including harassment. For Shajid College's non-discrimination
            notice, see{' '}
            <a href="https://equity.shajidcollege.edu/non-discrimination" target="_blank" rel="noopener noreferrer">
              equity.shajidcollege.edu/non-discrimination
            </a>.
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignInPage;