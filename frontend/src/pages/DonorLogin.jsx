import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./Login.css";


function DonorLogin() {


    const navigate = useNavigate();


    const [formData,setFormData] = useState({

        email:"",
        password:""

    });



    const [showPassword,setShowPassword] = useState(false);

    const [loading,setLoading] = useState(false);

    const [error,setError] = useState("");





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



            const res = await axios.post(

                "http://localhost:5000/api/donors/login",

                {
                    email,
                    password
                }

            );




            if(res.data.success){



                const donor = res.data.donor;



                const userData = {

                    ...donor,

                    role:"donor"

                };





                localStorage.setItem(

                    "token",

                    res.data.token

                );



                localStorage.setItem(

                    "user",

                    JSON.stringify(userData)

                );



                localStorage.setItem(

                    "donor",

                    JSON.stringify(donor)

                );



                localStorage.setItem(

                    "donorId",

                    donor._id

                );



                localStorage.setItem(

                    "donorName",

                    donor.fullName

                );




                navigate(

                    "/donor-dashboard",

                    {
                        replace:true
                    }

                );


            }



        }


        catch(error){


            console.log(
                "Donor Login Error:",
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
                    🩸 Donor Login
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

                    placeholder="Email Address"

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
                        ?
                        "Logging in..."
                        :
                        "Login"
                    }


                </button>








                <p>

                    New Donor?{" "}

                    <Link to="/register">

                        Register Here

                    </Link>


                </p>



            </form>



        </div>


    );


}


export default DonorLogin;