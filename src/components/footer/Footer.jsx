// src/components/Footer.jsx
const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-top">
        <h2>Want to learn more about Shajid College?</h2>
        <button className="info-button">Request Information</button>
      </div>

      <div className="footer-links">
        <div className="column">
          <h4>Follow Us</h4>
          <div className="social-icons">
            <a href="#"><img src="/facebook-icon.png" alt="Facebook" /></a>
            <a href="#"><img src="/x-icon.png" alt="X (Twitter)" /></a>
            <a href="#"><img src="/youtube-icon.png" alt="YouTube" /></a>
            <a href="#"><img src="/instagram-icon.png" alt="Instagram" /></a>
          </div>
          <p>Shajid Avenue,<br />Kano, NG 700234<br />(+234) 700-123-4567</p>
        </div>

        <div className="column">
          <h4>About Us</h4>
          <ul>
            <li><a href="#">Contact</a></li>
            <li><a href="#">Quick Facts</a></li>
            <li><a href="#">News</a></li>
            <li><a href="#">Careers</a></li>
          </ul>
        </div>

        <div className="column">
          <h4>Academics</h4>
          <ul>
            <li><a href="#">Find a Program</a></li>
            <li><a href="#">Departments</a></li>
            <li><a href="#">Graduate School</a></li>
            <li><a href="#">Online Learning</a></li>
          </ul>
        </div>

        <div className="column">
          <h4>Resources</h4>
          <ul>
            <li><a href="#">Academic Calendar</a></li>
            <li><a href="#">Library</a></li>
            <li><a href="#">Campus Services</a></li>
            <li><a href="#">IT Helpdesk</a></li>
          </ul>
        </div>

        <div className="column">
          <h4>Quick Links</h4>
          <ul>
            <li><a href="#">Directory</a></li>
            <li><a href="#">Events</a></li>
            <li><a href="#">Visit Us</a></li>
            <li><a href="#">Maps</a></li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} Shajid College of Nursing and Midwifery</p>
        <ul>
          <li><a href="#">Terms</a></li>
          <li><a href="#">Privacy</a></li>
          <li><a href="#">Accessibility</a></li>
          <li><a href="#">Non-Discrimination</a></li>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;