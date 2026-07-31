import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../api/axiosConfig";
import "./Login.css";


function HospitalRegister() {


    const navigate = useNavigate();



    const [formData,setFormData] = useState({

        hospitalName:"",
        email:"",
        phone:"",
        address:"",
        password:"",
        confirmPassword:""

    });



    const [otp,setOtp] = useState("");

    const [otpSent,setOtpSent] = useState(false);


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







    // ===============================
    // Register - Send OTP
    // ===============================


    const handleRegister = async(e)=>{


        e.preventDefault();



        const {

            hospitalName,
            email,
            phone,
            address,
            password,
            confirmPassword

        } = formData;






        if(
            !hospitalName ||
            !email ||
            !phone ||
            !address ||
            !password ||
            !confirmPassword
        ){

            setError(
                "Please fill all fields"
            );

            return;

        }







        if(password !== confirmPassword){


            setError(
                "Passwords do not match"
            );

            return;

        }






        if(phone.length !== 10){


            setError(
                "Enter valid 10 digit phone number"
            );

            return;

        }






        try{


            setLoading(true);




            const response = await API.post(

                "/hospitals/register",

                {

                    hospitalName,

                    email:email.toLowerCase(),

                    phone,

                    address,

                    password

                }

            );






            if(response.data.success){


                setOtpSent(true);


                alert(
                    "OTP sent to hospital email"
                );


            }





        }

        catch(error){


            setError(

                error.response?.data?.message ||

                "Registration failed"

            );


        }

        finally{


            setLoading(false);


        }


    };










    // ===============================
    // Verify OTP
    // ===============================


    const verifyOTP = async()=>{


        if(!otp){


            setError(
                "Enter OTP"
            );

            return;

        }





        try{


            setLoading(true);




            const response = await API.post(

                "/hospitals/verify-otp",

                {

                    email:
                    formData.email.toLowerCase(),

                    otp

                }

            );






            if(response.data.success){


                alert(
                    "🏥 Hospital Registration Successful"
                );



                navigate(
                    "/hospital-login"
                );


            }





        }

        catch(error){


            setError(

                error.response?.data?.message ||

                "OTP verification failed"

            );


        }

        finally{


            setLoading(false);


        }


    };









    return(


        <div className="login-container">



            <form

                className="login-box"

                onSubmit={handleRegister}

            >




                <h1>
                    🏥 Hospital Registration
                </h1>







                {
                    error && (

                        <p className="error-message">

                            {error}

                        </p>

                    )
                }








                {
                    !otpSent ? (

                    <>


                    <input

                        type="text"

                        name="hospitalName"

                        placeholder="Hospital Name"

                        value={formData.hospitalName}

                        onChange={handleChange}

                    />







                    <input

                        type="email"

                        name="email"

                        placeholder="Hospital Email"

                        value={formData.email}

                        onChange={handleChange}

                    />







                    <input

                        type="tel"

                        name="phone"

                        placeholder="Mobile Number"

                        value={formData.phone}

                        onChange={handleChange}

                    />







                    <input

                        type="text"

                        name="address"

                        placeholder="Hospital Address"

                        value={formData.address}

                        onChange={handleChange}

                    />







                    <div className="password-box">


                    <input

                        type={
                            showPassword
                            ? "text"
                            : "password"
                        }

                        name="password"

                        placeholder="Create Password"

                        value={formData.password}

                        onChange={handleChange}

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







                    <input

                        type="password"

                        name="confirmPassword"

                        placeholder="Confirm Password"

                        value={formData.confirmPassword}

                        onChange={handleChange}

                    />








                    <button

                        type="submit"

                        disabled={loading}

                    >

                        {

                        loading

                        ?

                        "Sending OTP..."

                        :

                        "Send OTP"

                        }


                    </button>


                    </>


                    )

                    :

                    (

                    <>


                    <input

                        type="text"

                        placeholder="Enter OTP"

                        value={otp}

                        onChange={(e)=>setOtp(e.target.value)}

                    />





                    <button

                        type="button"

                        onClick={verifyOTP}

                        disabled={loading}

                    >

                        {

                        loading

                        ?

                        "Verifying..."

                        :

                        "Verify OTP"

                        }


                    </button>


                    </>

                    )

                }









                <p>

                    Already registered?{" "}


                    <Link to="/hospital-login">

                        Login Here

                    </Link>


                </p>





            </form>


        </div>


    );


}


export default HospitalRegister;