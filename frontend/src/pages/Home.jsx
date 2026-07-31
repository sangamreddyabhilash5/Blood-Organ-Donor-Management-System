import { Link } from "react-router-dom";
import "./Home.css";

function Home() {
  return (
    <div className="home">

      <nav className="navbar">
        <div className="logo">
          🩸 <span>LifeLink</span>
        </div>

        <ul className="nav-links">
          <li><a href="/">Home</a></li>
          <li><a href="#about">About</a></li>
          <li><a href="#services">Services</a></li>
          <li><a href="#contact">Contact</a></li>
        </ul>
      </nav>

      <section className="hero">

        <div className="hero-text">

          <h1>Blood & Organ Donor Management System</h1>

          <h2>Donate Blood, Save Lives ❤️</h2>

          <p>
            A smart platform that connects blood donors,
            organ donors, hospitals and blood banks
            during emergencies.
          </p>

          <div className="hero-buttons">

            <Link to="/register">
              <button className="btn-red">
                Become a Donor
              </button>
            </Link>

            <Link to="/hospital-login">
              <button className="btn-blue">
                Hospital Login
              </button>
            </Link>

          </div>

        </div>

        <div className="hero-image">

          <img
            src="https://images.unsplash.com/photo-1584515933487-779824d29309?w=700"
            alt="Blood Donation"
          />

        </div>

      </section>

      {/* About Section */}

      <section className="about" id="about">

        <h2>About LifeLink</h2>

        <p>
          LifeLink is a smart Blood & Organ Donor Management System designed to
          connect blood donors, organ donors, hospitals and blood banks on a
          single platform. Our mission is to provide quick and reliable support
          during emergencies and help save more lives through technology.
        </p>

      </section>

    </div>
  );
}

export default Home;