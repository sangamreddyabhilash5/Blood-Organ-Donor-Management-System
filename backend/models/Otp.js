// ======================================================
// OTP Model
// Blood & Organ Donor Management System
// ======================================================

const mongoose = require("mongoose");

const otpSchema = new mongoose.Schema(
{
    // Email Address
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
    },

    // OTP Code
    otp: {
        type: String,
        required: true,
    },

    // User Type
    userType: {
        type: String,
        enum: ["donor", "hospital"],
        required: true,
    },

    // Temporary Donor Data
    donorData: {
        type: Object,
        default: null,
    },

    // Temporary Hospital Data
    hospitalData: {
        type: Object,
        default: null,
    },

    // OTP Expiry
    expiresAt: {
        type: Date,
        required: true,
    },

},
{
    timestamps: true,
    versionKey: false,
}
);

// Automatically delete expired OTPs
otpSchema.index(
    { expiresAt: 1 },
    { expireAfterSeconds: 0 }
);

module.exports = mongoose.model("Otp", otpSchema);