// ======================================================
// Blood & Organ Donor Management System
// Backend Server
// ======================================================


const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();


// ======================================================
// Database
// ======================================================

const connectDB = require("./config/db");



// ======================================================
// Routes
// ======================================================

const donorRoutes =
require("./routes/donorRoutes");

const profileRoutes =
require("./routes/profileRoutes");

const hospitalRoutes =
require("./routes/hospitalRoutes");

const emergencyRoutes =
require("./routes/emergencyRoutes");

const notificationRoutes =
require("./routes/notificationRoutes");

const reportRoutes =
require("./routes/reportRoutes");




// ======================================================
// Express App
// ======================================================

const app = express();




// ======================================================
// Middleware
// ======================================================


app.use(
    cors({

        origin: function(origin, callback) {
            // Allow requests with no origin (mobile apps, curl, etc.)
            if (!origin) return callback(null, true);

            const allowedOrigins = [
                "http://localhost:5173",
                "http://localhost:3000",
                (process.env.FRONTEND_URL || "").trim()
            ].filter(Boolean);

            // Allow all vercel.app subdomains
            const isVercel = /\.vercel\.app$/.test(origin);

            if (allowedOrigins.includes(origin) || isVercel) {
                callback(null, true);
            } else {
                callback(new Error("Not allowed by CORS"));
            }
        },

        credentials: true

    })
);


app.use(express.json());


app.use(
    express.urlencoded({

        extended:true

    })
);





// ======================================================
// Basic Routes
// ======================================================


app.get("/",(req,res)=>{

    res.json({

        success:true,

        message:
        "🩸 Blood & Organ Donor Backend Running Successfully"

    });

});




app.get("/api",(req,res)=>{


    res.json({

        success:true,

        message:
        "API Working Successfully"

    });

});




app.get("/health",(req,res)=>{


    res.json({

        success:true,

        status:"Healthy",

        time:new Date(),

        uptime:process.uptime()

    });

});







// ======================================================
// Notification Direct Test
// ======================================================


app.get("/api/notifications/test",(req,res)=>{


    console.log(
        "🔔 Notification Test Route Hit"
    );


    res.status(200).json({

        success:true,

        message:
        "Notification API Working Successfully"

    });


});








// ======================================================
// API Routes
// ======================================================


app.use(

    "/api/donors",

    donorRoutes

);

console.log(
    "✅ Donor Routes Loaded"
);




app.use(

    "/api/profile",

    profileRoutes

);

console.log(
    "✅ Profile Routes Loaded"
);




app.use(

    "/api/hospitals",

    hospitalRoutes

);

console.log(
    "✅ Hospital Routes Loaded"
);




app.use(

    "/api/emergency",

    emergencyRoutes

);

console.log(
    "✅ Emergency Routes Loaded"
);




app.use(

    "/api/notifications",

    notificationRoutes

);

console.log(
    "✅ Notification Routes Loaded"
);




app.use(

    "/api/reports",

    reportRoutes

);

console.log(
    "✅ Report Routes Loaded"
);







// ======================================================
// 404 Handler
// ======================================================


app.use((req,res)=>{


    res.status(404).json({

        success:false,

        message:
        "API Route Not Found",

        path:
        req.originalUrl

    });


});






// ======================================================
// Error Handler
// ======================================================


app.use(

(err,req,res,next)=>{


    console.error(
        "❌ SERVER ERROR:",
        err.message
    );


    res.status(
        err.status || 500
    )
    .json({

        success:false,

        message:
        err.message || 
        "Internal Server Error"

    });


}

);






// ======================================================
// Start Server
// ======================================================


const PORT = process.env.PORT || 5000;

// Connect to DB immediately for Serverless environments
connectDB().then(() => {
    console.log("📦 Database connection initialized");
}).catch(err => {
    console.error("❌ Database connection failed:", err.message);
});

// Only start the server locally if not in Vercel
if (process.env.NODE_ENV !== 'production' && !process.env.VERCEL) {
    app.listen(PORT, () => {
        console.log("=================================");
        console.log("🩸 Blood & Organ Donor System");
        console.log("=================================");
        console.log(`🚀 Server Running : http://localhost:${PORT}`);
        console.log(`🔔 Notifications : http://localhost:${PORT}/api/notifications`);
        console.log(`🌍 Environment : ${process.env.NODE_ENV || "development"}`);
        console.log("=================================");
    });
}

// Export the Express API for Vercel
module.exports = app;

// ======================================================
// Graceful Shutdown
// ======================================================
process.on("SIGINT", () => {
    console.log("🛑 Server Closed");
    process.exit(0);
});