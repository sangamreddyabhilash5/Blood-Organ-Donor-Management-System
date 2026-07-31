import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getDonorDashboard } from "../api/dashboardApi";
import "./Dashboard.css";


function DonorDashboard() {


    const navigate = useNavigate();



    const [loading,setLoading] = useState(true);

    const [donor,setDonor] = useState(null);





    useEffect(()=>{


        const loadDashboard = async()=>{


            const donorData = JSON.parse(
                localStorage.getItem("donor")
            );


            const donorId =
                localStorage.getItem("donorId");





            if(!donorData || !donorId){

                navigate(
                    "/donor-login",
                    {
                        replace:true
                    }
                );

                return;

            }





            try{


                const response =
                await getDonorDashboard(donorId);



                console.log(
                    "Dashboard Data:",
                    response.data
                );





                setDonor({

                    name:
                    donorData.fullName,


                    bloodGroup:
                    donorData.bloodGroup || "N/A",


                    city:
                    donorData.city || "N/A",



                    totalDonations:
                    response.data.totalDonations ?? 0,



                    pendingRequests:
                    response.data.pendingRequests ?? 0,



                    availability:
                    response.data.availability ??
                    donorData.availability ??
                    true


                });




            }


            catch(error){


                console.log(
                    "Dashboard Error:",
                    error
                );



                setDonor({

                    name:
                    donorData.fullName,


                    bloodGroup:
                    donorData.bloodGroup || "N/A",


                    city:
                    donorData.city || "N/A",



                    totalDonations:
                    donorData.totalDonations || 0,



                    pendingRequests:0,



                    availability:
                    donorData.availability ?? true


                });


            }



            finally{

                setLoading(false);

            }


        };



        loadDashboard();


    },[navigate]);







    const handleLogout =()=>{


        localStorage.removeItem("token");

        localStorage.removeItem("user");

        localStorage.removeItem("donor");

        localStorage.removeItem("donorId");

        localStorage.removeItem("donorName");



        navigate(
            "/donor-login",
            {
                replace:true
            }
        );


    };







    if(loading){


        return (

            <div className="loading">

                <h2>
                    Loading Dashboard...
                </h2>

            </div>

        );

    }






    return (


        <div className="dashboard">





            {/* Header */}

            <div className="dashboard-header">


                <h1>
                    🩸 Donor Dashboard
                </h1>



                <p>

                    Welcome{" "}

                    <strong>
                        {donor.name}
                    </strong>

                </p>



                <span>

                    {donor.bloodGroup}

                    {" • "}

                    {donor.city}

                </span>


            </div>








            {/* Statistics */}


            <div className="stats">


                <div className="stat-card">

                    <h2>
                        {donor.totalDonations}
                    </h2>

                    <p>
                        Total Donations
                    </p>

                </div>





                <div className="stat-card">

                    <h2>
                        {donor.pendingRequests}
                    </h2>


                    <p>
                        Pending Requests
                    </p>


                </div>






                <div className="stat-card">


                    <h2>

                        {
                        donor.availability
                        ?
                        "Available"
                        :
                        "Unavailable"
                        }

                    </h2>


                    <p>
                        Current Status
                    </p>


                </div>



            </div>










            {/* Cards */}


            <div className="cards">





                <DashboardCard

                    title="👤 My Profile"

                    text="View and update your personal details."

                    button="Edit Profile"

                    link="/profile"

                />





                <DashboardCard

                    title="🩸 Blood Requests"

                    text="Check emergency blood requests."

                    button="View Requests"

                    link="/blood-requests"

                />






                <DashboardCard

                    title="📜 Donation History"

                    text="View previous donations."

                    button="View History"

                    link="/donation-history"

                />







                <DashboardCard

                    title="✅ Availability"

                    text="Update your availability status."

                    button="Update Status"

                    link="/availability"

                />



            </div>








            <div className="logout-section">


                <button

                    className="logout-btn"

                    onClick={handleLogout}

                >

                    Logout

                </button>


            </div>





        </div>


    );


}






function DashboardCard({
    title,
    text,
    button,
    link
}){


    return (

        <div className="card">


            <h3>
                {title}
            </h3>


            <p>
                {text}
            </p>



            <Link to={link}>

                <button>

                    {button}

                </button>


            </Link>



        </div>

    );

}



export default DonorDashboard;