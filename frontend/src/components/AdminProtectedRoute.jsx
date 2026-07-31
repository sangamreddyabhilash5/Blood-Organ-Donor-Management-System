// ======================================================
// Admin Protected Route
// Blood & Organ Donor Management System
// ======================================================

import { Navigate, useLocation } from "react-router-dom";


function AdminProtectedRoute({ children }) {


    const location = useLocation();


    // Get login data

    const token = localStorage.getItem("token");


    let user = null;


    try {

        user = JSON.parse(
            localStorage.getItem("user")
        );


    } catch(error) {


        console.log(
            "Invalid User Data"
        );


        localStorage.removeItem("user");

    }





    // Debug

    console.log(
        "Admin Protected Route User:",
        user
    );





    // ==============================
    // Authentication Check
    // ==============================


    if(!token || !user){


        return (

            <Navigate

                to="/admin-login"

                state={{
                    from: location
                }}

                replace

            />

        );

    }





    // ==============================
    // Admin Role Check
    // ==============================


    if(
        user.role?.toLowerCase() !== "admin"
    ){


        console.log(
            "Admin Access Denied"
        );


        return (

            <Navigate

                to="/admin-login"

                replace

            />

        );

    }





    // ==============================
    // Access Granted
    // ==============================


    console.log(
        "Admin Access Granted"
    );


    return children;


}


export default AdminProtectedRoute;