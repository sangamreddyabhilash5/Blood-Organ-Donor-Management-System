import { useEffect, useState } from "react";
import axios from "axios";
import "./SearchDonors.css";


function SearchDonors() {


  const [donors, setDonors] = useState([]);

  const [filteredDonors, setFilteredDonors] = useState([]);

  const [search, setSearch] = useState("");

  const [loading, setLoading] = useState(true);



  // ===============================
  // Fetch Donors
  // ===============================

  const fetchDonors = async () => {

    try {

      setLoading(true);


      const res = await axios.get(
        "http://localhost:5000/api/donors"
      );


      const donorList = res.data.donors || [];


      setDonors(donorList);

      setFilteredDonors(donorList);



    } catch(error) {


      console.error(
        "Fetch Donors Error:",
        error
      );


      alert(
        error.response?.data?.message ||
        "Backend connection failed"
      );


    } finally {


      setLoading(false);


    }

  };





  useEffect(()=>{

    fetchDonors();

  },[]);







  // ===============================
  // Search Filter
  // ===============================


  useEffect(()=>{


    const result = donors.filter((donor)=>{


      const name =
      donor.fullName?.toLowerCase() || "";


      const blood =
      donor.bloodGroup?.toLowerCase() || "";


      const city =
      donor.city?.toLowerCase() || "";



      return (

        name.includes(
          search.toLowerCase()
        )

        ||

        blood.includes(
          search.toLowerCase()
        )

        ||

        city.includes(
          search.toLowerCase()
        )

      );


    });



    setFilteredDonors(result);



  },[search,donors]);








  return (


    <div className="search-page">



      <h1>
        🔍 Search Donors
      </h1>





      <input

        type="text"

        className="search-input"

        placeholder=
        "Search Name, Blood Group or City..."

        value={search}

        onChange={(e)=>
          setSearch(e.target.value)
        }

      />





      <button
        onClick={fetchDonors}
        style={{
          marginBottom:"20px",
          padding:"10px 20px",
          cursor:"pointer"
        }}
      >
        🔄 Refresh
      </button>







      {
        loading ? (


          <h2>
            Loading donors...
          </h2>



        )

        : filteredDonors.length === 0 ? (


          <h2>
            No donors found.
          </h2>



        )

        : (



        <div className="table-container">


        <table>


          <thead>


            <tr>

              <th>
                Name
              </th>


              <th>
                Blood Group
              </th>


              <th>
                Phone
              </th>


              <th>
                City
              </th>


              <th>
                State
              </th>


              <th>
                Availability
              </th>


            </tr>


          </thead>





          <tbody>


          {
            filteredDonors.map((donor)=>(


              <tr key={donor._id}>


                <td>
                  {donor.fullName}
                </td>



                <td>
                  🩸 {donor.bloodGroup}
                </td>



                <td>
                  📞 {donor.phone}
                </td>



                <td>
                  📍 {donor.city}
                </td>



                <td>
                  {donor.state}
                </td>



                <td>

                {
                  donor.availability
                  ?
                  "✅ Available"
                  :
                  "❌ Not Available"
                }

                </td>



              </tr>


            ))
          }



          </tbody>



        </table>


        </div>


        )


      }



    </div>


  );


}


export default SearchDonors;