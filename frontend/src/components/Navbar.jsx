import { Link, useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";
import "./Navbar.css";


function Navbar() {

  const navigate = useNavigate();
  const location = useLocation();

  const [menuOpen, setMenuOpen] = useState(false);


  const token = localStorage.getItem("token");

  const user = JSON.parse(
    localStorage.getItem("user")
  );



  // Logout

  const logout = () => {

    localStorage.removeItem("token");
    localStorage.removeItem("user");

    localStorage.removeItem("donor");
    localStorage.removeItem("donorId");
    localStorage.removeItem("donorName");

    localStorage.removeItem("hospital");

    navigate("/");

  };




  const navLinks = [

    {
      name:"Home",
      path:"/"
    },

    {
      name:"About",
      path:"/about"
    },

    {
      name:"Contact",
      path:"/contact"
    }

  ];




  const activeClass = (path)=>{

    return location.pathname === path
      ? "active"
      : "";

  };





  return (

    <nav className="navbar">


      {/* Logo */}

      <Link 
        to="/"
        className="logo"
      >
        🩸 BloodConnect
      </Link>





      {/* Mobile Menu */}

      <button
        className="menu-btn"
        onClick={()=>setMenuOpen(!menuOpen)}
      >
        ☰
      </button>





      <div
        className={
          menuOpen
          ? "nav-links open"
          : "nav-links"
        }
      >



        {
          navLinks.map((link)=>(

            <Link

              key={link.path}

              to={link.path}

              className={activeClass(link.path)}

              onClick={()=>setMenuOpen(false)}

            >

              {link.name}

            </Link>

          ))
        }





        {
          token ? (

            <>


              {
                user?.role === "donor" && (

                  <Link
                    to="/donor-dashboard"
                    className={activeClass(
                      "/donor-dashboard"
                    )}
                  >
                    Donor
                  </Link>

                )
              }





              {
                user?.role === "hospital" && (

                  <Link
                    to="/hospital-dashboard"
                    className={activeClass(
                      "/hospital-dashboard"
                    )}
                  >
                    Hospital
                  </Link>

                )
              }





              {
                user?.role === "admin" && (

                  <Link
                    to="/admin-dashboard"
                    className={activeClass(
                      "/admin-dashboard"
                    )}
                  >
                    Admin
                  </Link>

                )
              }





              <span className="username">

                👤 {user?.name}

              </span>





              <button
                className="logout-btn"
                onClick={logout}
              >

                Logout

              </button>


            </>


          )
          :
          (

            <>


              <Link to="/donor-login">
                Donor Login
              </Link>



              <Link to="/hospital-login">
                Hospital Login
              </Link>



              <Link to="/admin-login">
                Admin Login
              </Link>



              <Link to="/register">
                Register
              </Link>


            </>

          )

        }


      </div>


    </nav>

  );

}


export default Navbar;