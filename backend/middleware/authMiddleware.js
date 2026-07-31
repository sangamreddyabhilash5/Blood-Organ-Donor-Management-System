// ======================================================
// JWT Authentication Middleware
// Blood & Organ Donor Management System
// ======================================================

const jwt = require("jsonwebtoken");

// ======================================================
// Protect Routes Middleware
// ======================================================

const protect = (req, res, next) => {

    try {

        // Get Authorization Header
        const authHeader = req.headers.authorization;

        // Check if Authorization header exists
        if (!authHeader) {
            return res.status(401).json({
                success: false,
                message: "Access denied. No token provided."
            });
        }

        // Expected Format:
        // Authorization: Bearer <token>
        const parts = authHeader.split(" ");

        if (
            parts.length !== 2 ||
            parts[0] !== "Bearer"
        ) {
            return res.status(401).json({
                success: false,
                message: "Invalid token format."
            });
        }

        const token = parts[1];

        // Check JWT Secret
        if (!process.env.JWT_SECRET) {
            return res.status(500).json({
                success: false,
                message: "JWT Secret is not configured."
            });
        }

        // Verify Token
        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET
        );

        // Save Logged-in User
        req.user = decoded;

        // Continue
        next();

    } catch (error) {

        console.error("JWT Authentication Error:", error.message);

        if (error.name === "TokenExpiredError") {
            return res.status(401).json({
                success: false,
                message: "Token expired. Please login again."
            });
        }

        if (error.name === "JsonWebTokenError") {
            return res.status(401).json({
                success: false,
                message: "Invalid token."
            });
        }

        return res.status(500).json({
            success: false,
            message: "Authentication failed.",
            error: error.message
        });

    }

};

// ======================================================
// Export Middleware
// ======================================================

module.exports = {
    protect
};