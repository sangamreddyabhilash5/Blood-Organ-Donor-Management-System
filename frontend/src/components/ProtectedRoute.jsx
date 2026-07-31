// ======================================================
// Protected Route
// Blood & Organ Donor Management System
// ======================================================

import { Navigate, useLocation } from "react-router-dom";


function ProtectedRoute({ children, role }) {


    const location = useLocation();



    const token =
        localStorage.getItem("token");



    const user =
        JSON.parse(
            localStorage.getItem("user")
        );




    // ==============================
    // Authentication Check
    // ==============================


    if(!token || !user){


        let loginPage = "/donor-login";



        if(role === "hospital"){

            loginPage = "/hospital-login";

        }


        if(role === "admin"){

            loginPage = "/admin-login";

        }



        return (

            <Navigate

                to={loginPage}

                state={{
                    from: location
                }}

                replace

            />

        );


    }





    // ==============================
    // Role Verification
    // ==============================


    if(role){


        const currentRole =
            user.role
            ?.trim()
            .toLowerCase();




        const allowedRoles =

            Array.isArray(role)

            ?

            role.map(
                r =>
                r.toLowerCase()
            )

            :

            [
                role.toLowerCase()
            ];






        console.log(
            "Current Role:",
            currentRole
        );


        console.log(
            "Allowed Roles:",
            allowedRoles
        );






        if(
            !allowedRoles.includes(currentRole)
        ){


            return (

                <Navigate

                    to="/"

                    replace

                />

            );


        }


    }





    return children;


}


export default ProtectedRoute;