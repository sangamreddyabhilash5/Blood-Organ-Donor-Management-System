// ======================================================
// App.jsx
// Blood & Organ Donor Management System
// ======================================================

import { Routes, Route } from "react-router-dom";

import ProtectedRoute from "./components/ProtectedRoute";
import AdminProtectedRoute from "./components/AdminProtectedRoute";


// PUBLIC

import Home from "./pages/Home";
import About from "./pages/About";
import ContactUs from "./pages/ContactUs";
import FAQ from "./pages/FAQ";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsConditions from "./pages/TermsConditions";


// DONOR

import Register from "./pages/Register";
import DonorLogin from "./pages/DonorLogin";
import DonorDashboard from "./pages/DonorDashboard";

import Profile from "./pages/Profile";
import BloodRequests from "./pages/BloodRequests";
import DonationHistory from "./pages/DonationHistory";
import Availability from "./pages/Availability";

import Notifications from "./pages/Notifications";
import Settings from "./pages/Settings";


// COMMON

import SearchDonors from "./pages/SearchDonors";
import SearchNearby from "./pages/SearchNearby";
import EmergencyRequests from "./pages/EmergencyRequests";


// HOSPITAL

import HospitalRegister from "./pages/HospitalRegister";
import HospitalLogin from "./pages/HospitalLogin";
import HospitalDashboard from "./pages/HospitalDashboard";

import BloodInventory from "./pages/BloodInventory";
import RequestHistory from "./pages/RequestHistory";
import ManageDonors from "./pages/ManageDonors";
import HospitalProfile from "./pages/HospitalProfile";


// ADMIN

import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";

import ManageEmergency from "./pages/ManageEmergency";
import ContactMessages from "./pages/ContactMessages";
import AdminNotifications from "./pages/AdminNotifications";

import Reports from "./pages/Reports";
import AdminSettings from "./pages/AdminSettings";
import AdminProfile from "./pages/AdminProfile";



function App(){

return (

<Routes>


{/* ================= PUBLIC ================= */}


<Route path="/" element={<Home/>}/>

<Route path="/about" element={<About/>}/>

<Route path="/contact" element={<ContactUs/>}/>

<Route path="/faq" element={<FAQ/>}/>


<Route
path="/privacy-policy"
element={<PrivacyPolicy/>}
/>


<Route
path="/terms-conditions"
element={<TermsConditions/>}
/>



{/* ================= DONOR ================= */}


<Route
path="/register"
element={<Register/>}
/>


<Route
path="/donor-login"
element={<DonorLogin/>}
/>



<Route
path="/donor-dashboard"
element={
<ProtectedRoute role="donor">
<DonorDashboard/>
</ProtectedRoute>
}
/>



<Route
path="/profile"
element={
<ProtectedRoute role="donor">
<Profile/>
</ProtectedRoute>
}
/>



<Route
path="/blood-requests"
element={
<ProtectedRoute role="donor">
<BloodRequests/>
</ProtectedRoute>
}
/>



<Route
path="/donation-history"
element={
<ProtectedRoute role="donor">
<DonationHistory/>
</ProtectedRoute>
}
/>



<Route
path="/availability"
element={
<ProtectedRoute role="donor">
<Availability/>
</ProtectedRoute>
}
/>



<Route
path="/notifications"
element={
<ProtectedRoute role="donor">
<Notifications/>
</ProtectedRoute>
}
/>



<Route
path="/settings"
element={
<ProtectedRoute role="donor">
<Settings/>
</ProtectedRoute>
}
/>





{/* ================= COMMON ================= */}


<Route
path="/search-donors"
element={<SearchDonors/>}
/>


<Route
path="/nearby-donors"
element={<SearchNearby/>}
/>


<Route
path="/emergency"
element={<EmergencyRequests/>}
/>


<Route
path="/emergency-requests"
element={<EmergencyRequests/>}
/>





{/* ================= HOSPITAL ================= */}


<Route
path="/hospital-register"
element={<HospitalRegister/>}
/>


<Route
path="/hospital-login"
element={<HospitalLogin/>}
/>



<Route
path="/hospital-dashboard"
element={
<ProtectedRoute role="hospital">
<HospitalDashboard/>
</ProtectedRoute>
}
/>



<Route
path="/blood-inventory"
element={
<ProtectedRoute role="hospital">
<BloodInventory/>
</ProtectedRoute>
}
/>



<Route
path="/request-history"
element={
<ProtectedRoute role="hospital">
<RequestHistory/>
</ProtectedRoute>
}
/>



<Route
path="/manage-donors"
element={
<ProtectedRoute role="hospital">
<ManageDonors/>
</ProtectedRoute>
}
/>



<Route
path="/hospital-profile"
element={
<ProtectedRoute role="hospital">
<HospitalProfile/>
</ProtectedRoute>
}
/>





{/* ================= ADMIN ================= */}


<Route
path="/admin-login"
element={<AdminLogin/>}
/>



<Route
path="/admin-dashboard"
element={
<AdminProtectedRoute>
<AdminDashboard/>
</AdminProtectedRoute>
}
/>



<Route
path="/manage-emergency"
element={
<AdminProtectedRoute>
<ManageEmergency/>
</AdminProtectedRoute>
}
/>



<Route
path="/contact-messages"
element={
<AdminProtectedRoute>
<ContactMessages/>
</AdminProtectedRoute>
}
/>



<Route
path="/admin-notifications"
element={
<AdminProtectedRoute>
<AdminNotifications/>
</AdminProtectedRoute>
}
/>



<Route
path="/admin-reports"
element={
<AdminProtectedRoute>
<Reports/>
</AdminProtectedRoute>
}
/>



<Route
path="/admin-settings"
element={
<AdminProtectedRoute>
<AdminSettings/>
</AdminProtectedRoute>
}
/>



<Route
path="/admin-profile"
element={
<AdminProtectedRoute>
<AdminProfile/>
</AdminProtectedRoute>
}
/>





{/* ================= 404 ================= */}


<Route
path="*"
element={

<div className="not-found">

<h1>❌ 404</h1>

<h2>Page Not Found</h2>

<p>
The page you are looking for does not exist.
</p>

</div>

}
/>


</Routes>

);

}


export default App;