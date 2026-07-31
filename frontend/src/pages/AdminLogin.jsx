import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";


function AdminLogin() {

    const navigate = useNavigate();


    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });


    const [error, setError] = useState("");

    const [loading, setLoading] = useState(false);



    const handleChange = (e) => {

        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });

        setError("");

    };




    const handleLogin = (e) => {

        e.preventDefault();


        const email =
            formData.email.trim().toLowerCase();


        const password =
            formData.password.trim();



        setLoading(true);



        // Admin credentials from environment variables
        const ADMIN_EMAIL = import.meta.env.VITE_ADMIN_EMAIL || "admin@bloodsystem.com";
        const ADMIN_PASSWORD = import.meta.env.VITE_ADMIN_PASSWORD || "Admin@2024!";

        if(
            email === ADMIN_EMAIL &&
            password === ADMIN_PASSWORD
        ){


            const adminUser = {

                id:1,

                name:"System Administrator",

                email,

                role:"admin"

            };



            // Remove only previous login data

            localStorage.removeItem("token");
            localStorage.removeItem("user");



            localStorage.setItem(
                "token",
                "admin-token"
            );


            localStorage.setItem(
                "user",
                JSON.stringify(adminUser)
            );



            navigate(
                "/admin-dashboard",
                {
                    replace:true
                }
            );


        }
        else{


            setError(
                "Invalid Admin Email or Password"
            );


        }



        setLoading(false);

    };





    return (

        <div className="login-container">


            <form
                className="login-box"
                onSubmit={handleLogin}
            >


                <h1>
                    👨‍💼 Admin Login
                </h1>




                {
                    error && (

                        <p className="error-message">
                            {error}
                        </p>

                    )
                }




                <input

                    type="email"

                    name="email"

                    placeholder="Admin Email"

                    value={formData.email}

                    onChange={handleChange}

                    autoComplete="username"

                    required

                />





                <input

                    type="password"

                    name="password"

                    placeholder="Password"

                    value={formData.password}

                    onChange={handleChange}

                    autoComplete="current-password"

                    required

                />





                <button

                    type="submit"

                    disabled={loading}

                >

                    {
                        loading
                        ? "Logging in..."
                        : "Login"
                    }

                </button>




            </form>


        </div>

    );

}


export default AdminLogin;