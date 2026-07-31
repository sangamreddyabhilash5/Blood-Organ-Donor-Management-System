import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import "./Login.css";


function HospitalLogin() {


    const navigate = useNavigate();


    const [formData,setFormData] = useState({

        email:"",
        password:""

    });


    const [showPassword,setShowPassword] = useState(false);

    const [error,setError] = useState("");

    const [loading,setLoading] = useState(false);




    const handleChange = (e)=>{


        setFormData({

            ...formData,

            [e.target.name]:e.target.value

        });


        setError("");

    };





    const handleLogin = async(e)=>{


        e.preventDefault();


        const email = formData.email.trim();

        const password = formData.password.trim();



        if(!email || !password){

            setError(
                "Please enter email and password"
            );

            return;

        }



        try{


            setLoading(true);



            const response = await axios.post(

                "http://localhost:5000/api/hospitals/login",

                {
                    email,
                    password
                }

            );




            if(response.data.success){



                const hospitalUser = {

                    ...response.data.hospital,

                    role:"hospital"

                };




                localStorage.setItem(

                    "token",

                    response.data.token

                );



                localStorage.setItem(

                    "user",

                    JSON.stringify(hospitalUser)

                );



                localStorage.setItem(

                    "hospital",

                    JSON.stringify(
                        response.data.hospital
                    )

                );




                navigate(
                    "/hospital-dashboard",
                    {
                        replace:true
                    }
                );


            }



        }


        catch(error){


            console.log(
                "Hospital Login Error:",
                error
            );



            setError(

                error.response?.data?.message ||

                "Invalid Email or Password"

            );


        }


        finally{

            setLoading(false);

        }


    };







    return (


        <div className="login-container">


            <form
                className="login-box"
                onSubmit={handleLogin}
            >



                <h1>
                    🏥 Hospital Login
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

                    placeholder="Hospital Email"

                    value={formData.email}

                    onChange={handleChange}

                    required

                />






                <div className="password-box">


                    <input

                        type={
                            showPassword
                            ? "text"
                            : "password"
                        }

                        name="password"

                        placeholder="Password"

                        value={formData.password}

                        onChange={handleChange}

                        required

                    />



                    <button

                        type="button"

                        className="toggle-password"

                        onClick={()=>setShowPassword(!showPassword)}

                    >

                        {
                            showPassword
                            ? "🙈"
                            : "👁️"
                        }

                    </button>



                </div>







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







                <p>

                    New Hospital?{" "}

                    <Link to="/hospital-register">

                        Register Here

                    </Link>


                </p>




            </form>



        </div>


    );


}


export default HospitalLogin;