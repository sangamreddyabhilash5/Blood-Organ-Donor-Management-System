import { Link } from "react-router-dom";
import "./Footer.css";

function Footer() {

  return (

    <footer className="footer">


      <div className="footer-container">


        {/* Brand Section */}

        <div className="footer-section">

          <h2>
            🩸 BloodConnect
          </h2>

          <p>
            Connecting donors and recipients to save lives
            through blood and organ donation.
          </p>

        </div>




        {/* Quick Links */}

        <div className="footer-section">

          <h3>
            Quick Links
          </h3>


          <Link to="/">
            Home
          </Link>


          <Link to="/about">
            About
          </Link>


          <Link to="/contact">
            Contact
          </Link>


          <Link to="/register">
            Become a Donor
          </Link>


        </div>





        {/* Contact */}

        <div className="footer-section">

          <h3>
            Contact
          </h3>


          <p>
            📧 support@bloodconnect.com
          </p>


          <p>
            📞 +91 98765 43210
          </p>


          <p>
            📍 India
          </p>


        </div>




      </div>



      <div className="footer-bottom">


        <p>
          © {new Date().getFullYear()} BloodConnect.
          All Rights Reserved.
        </p>


      </div>



    </footer>

  );

}


export default Footer;