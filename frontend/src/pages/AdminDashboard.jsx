import { useNavigate } from "react-router-dom";
import "./AdminDashboard.css";


function AdminDashboard() {


  const navigate = useNavigate();



  // ==============================
  // Download Donor PDF Report
  // ==============================

  const downloadDonorReport = () => {

    window.open(
      "http://localhost:5000/api/reports/donors",
      "_blank"
    );

  };






  // ==============================
  // Statistics
  // ==============================


  const stats = [

    {
      title:"Total Donors",
      value:125,
      icon:"🩸",
      color:"red"
    },


    {
      title:"Hospitals",
      value:18,
      icon:"🏥",
      color:"blue"
    },


    {
      title:"Blood Requests",
      value:42,
      icon:"📋",
      color:"orange"
    },


    {
      title:"Emergency Requests",
      value:9,
      icon:"🚨",
      color:"green"
    }

  ];







  // ==============================
  // Admin Menu
  // ==============================


  const menus = [

    {
      title:"Manage Donors",
      icon:"👥",
      path:"/manage-donors"
    },


    {
      title:"Manage Hospitals",
      icon:"🏥",
      path:"/manage-hospitals"
    },


    {
      title:"Blood Requests",
      icon:"🩸",
      path:"/manage-blood-requests"
    },


    {
      title:"Emergency Requests",
      icon:"🚨",
      path:"/manage-emergency"
    },


    {
      title:"Reports",
      icon:"📊",
      path:"/reports",
      action:downloadDonorReport
    },


    {
      title:"Notifications",
      icon:"🔔",
      path:"/admin-notifications"
    },


    {
      title:"Contact Messages",
      icon:"📩",
      path:"/contact-messages"
    },


    {
      title:"Settings",
      icon:"⚙️",
      path:"/admin-settings"
    }

  ];







  return (

    <div className="admin-container">



      {/* Header */}

      <div className="admin-header">

        <h1>
          👨‍💼 Admin Dashboard
        </h1>


        <p>

          Manage donors, hospitals, blood requests,
          emergency cases and system activities.

        </p>


      </div>







      {/* Statistics Cards */}


      <div className="stats-grid">


        {
          stats.map((item,index)=>(


            <div

              key={index}

              className={`stat-card ${item.color}`}

            >


              <div className="stat-icon">

                {item.icon}

              </div>



              <h2>

                {item.value}

              </h2>



              <p>

                {item.title}

              </p>


            </div>


          ))
        }


      </div>








      <h2 className="section-title">

        Quick Actions

      </h2>







      {/* Menu Cards */}


      <div className="menu-grid">


        {
          menus.map((menu,index)=>(


            <div

              key={index}

              className="menu-card"


              onClick={()=>{


                if(menu.action){

                  menu.action();

                }

                else{

                  navigate(menu.path);

                }


              }}

            >


              <div className="menu-icon">

                {menu.icon}

              </div>



              <h3>

                {menu.title}

              </h3>


            </div>


          ))
        }


      </div>






    </div>

  );

}



export default AdminDashboard;