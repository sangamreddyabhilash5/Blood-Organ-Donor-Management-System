// ======================================================
// Blood & Organ Donor Management System
// Backend Server
// ======================================================


// ======================================================
// Express App & Error Handling Wrapper
// ======================================================
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

let app;
let initializationError = null;
let connectDB;

try {
    dotenv.config();

    // ======================================================
    // Database
    // ======================================================
    connectDB = require("./config/db");

    // ======================================================
    // Routes
    // ======================================================
    const donorRoutes = require("./routes/donorRoutes");
    const profileRoutes = require("./routes/profileRoutes");
    const hospitalRoutes = require("./routes/hospitalRoutes");
    const emergencyRoutes = require("./routes/emergencyRoutes");
    const notificationRoutes = require("./routes/notificationRoutes");
    const reportRoutes = require("./routes/reportRoutes");

    app = express();

    // ======================================================
    // CORS
    // ======================================================
    const allowedOrigins = [
        "http://localhost:5173",
        "http://localhost:3000",
        (process.env.FRONTEND_URL || "").trim()
    ].filter(Boolean);

    // Handle OPTIONS preflight for every route
    app.use((req, res, next) => {
        if (req.method === "OPTIONS") {
            const origin = req.headers.origin;
            const isVercel = origin && /\.vercel\.app$/.test(origin);
            const isAllowed = origin && (allowedOrigins.includes(origin) || isVercel);

            res.setHeader("Access-Control-Allow-Origin", isAllowed ? origin : allowedOrigins[0] || "*");
            res.setHeader("Access-Control-Allow-Credentials", "true");
            res.setHeader("Access-Control-Allow-Methods", "GET,OPTIONS,PATCH,DELETE,POST,PUT");
            res.setHeader("Access-Control-Allow-Headers", "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, Authorization");
            return res.status(200).end();
        }
        next();
    });

    app.use((req, res, next) => {
        const origin = req.headers.origin;
        const isVercel = origin && /\.vercel\.app$/.test(origin);
        const isAllowed = !origin || allowedOrigins.includes(origin) || isVercel;

        if (isAllowed && origin) {
            res.setHeader("Access-Control-Allow-Origin", origin);
            res.setHeader("Access-Control-Allow-Credentials", "true");
        }
        next();
    });

    app.use(
        cors({
            origin: function(origin, callback) {
                if (!origin) return callback(null, true);
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
    app.use(express.urlencoded({ extended:true }));

    // ======================================================
    // Basic Routes
    // ======================================================
    app.get("/",(req,res)=>{
        res.json({ success:true, message: "🩸 Blood & Organ Donor Backend Running Successfully" });
    });

    app.get("/api",(req,res)=>{
        res.json({ success:true, message: "API Working Successfully" });
    });

    app.get("/health",(req,res)=>{
        res.json({ success:true, status:"Healthy", time:new Date(), uptime:process.uptime() });
    });

    app.get("/api/notifications/test",(req,res)=>{
        console.log("🔔 Notification Test Route Hit");
        res.status(200).json({ success:true, message: "Notification API Working Successfully" });
    });

    // ======================================================
    // API Routes (Mounted with /api and without /api)
    // ======================================================
    app.use("/api/donors", donorRoutes);
    app.use("/donors", donorRoutes);

    app.use("/api/profile", profileRoutes);
    app.use("/profile", profileRoutes);

    app.use("/api/hospital", hospitalRoutes);
    app.use("/api/hospitals", hospitalRoutes);
    app.use("/hospital", hospitalRoutes);
    app.use("/hospitals", hospitalRoutes);

    app.use("/api/emergency", emergencyRoutes);
    app.use("/emergency", emergencyRoutes);

    app.use("/api/notifications", notificationRoutes);
    app.use("/notifications", notificationRoutes);

    app.use("/api/reports", reportRoutes);
    app.use("/reports", reportRoutes);
    console.log("✅ All API Routes Loaded Successfully");







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






} catch (e) {
    console.error("❌ Backend Initialization Error:", e);
    initializationError = e;
}

// ======================================================
// Error Handler
// ======================================================
app.use((err,req,res,next)=>{
    console.error("❌ SERVER ERROR:", err.message);
    res.status(err.status || 500).json({
        success:false,
        message: err.message || "Internal Server Error"
    });
});

// ======================================================
// Start Server / Export for Serverless
// ======================================================
const PORT = process.env.PORT || 5000;

if (process.env.NODE_ENV !== 'production' && !process.env.VERCEL) {
    if (!initializationError) {
        connectDB().then(() => {
            console.log("📦 Database connection initialized");
        }).catch(err => {
            console.error("❌ Database connection failed:", err.message);
        });

        app.listen(PORT, () => {
            console.log("=================================");
            console.log("🩸 Blood & Organ Donor System");
            console.log("=================================");
            console.log(`🚀 Server Running : http://localhost:${PORT}`);
            console.log(`🔔 Notifications : http://localhost:${PORT}/api/notifications`);
            console.log(`🌍 Environment : ${process.env.NODE_ENV || "development"}`);
            console.log("=================================");
        });
    } else {
        console.error("❌ Server failed to start due to initialization error");
    }
} else {
    // VERCEL / SERVERLESS ENVIRONMENT
    if (!initializationError) {
        connectDB().then(() => {
            console.log("📦 Database connection initialized in Serverless");
        }).catch(err => {
            console.error("❌ Database connection failed in Serverless:", err.message);
        });
    }
}

// Export a wrapped handler for Vercel that catches ANY cold start errors
module.exports = (req, res) => {
    if (initializationError) {
        return res.status(500).json({
            success: false,
            error: "Backend Initialization Failed",
            message: initializationError.message,
            stack: process.env.NODE_ENV !== 'production' ? initializationError.stack : undefined
        });
    }
    
    // In Express 5, `app` is a function (req, res, next) but `@vercel/node` just passes req, res
    return app(req, res);
};

// ======================================================
// Graceful Shutdown
// ======================================================
process.on("SIGINT", () => {
    console.log("🛑 Server Closed");
    process.exit(0);
});