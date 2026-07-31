// ======================================================
// Emergency Request Model
// Blood & Organ Donor Management System
// ======================================================

const mongoose = require("mongoose");

const emergencyRequestSchema = new mongoose.Schema(
  {
    patientName: {
      type: String,
      required: [true, "Patient name is required"],
      trim: true,
      minlength: 3,
      maxlength: 100,
    },

    bloodGroup: {
      type: String,
      required: [true, "Blood group is required"],
      enum: [
        "A+",
        "A-",
        "B+",
        "B-",
        "AB+",
        "AB-",
        "O+",
        "O-",
      ],
    },

    unitsRequired: {
      type: Number,
      required: [true, "Units required is mandatory"],
      min: 1,
    },

    hospitalName: {
      type: String,
      required: [true, "Hospital name is required"],
      trim: true,
    },

    city: {
      type: String,
      required: [true, "City is required"],
      trim: true,
    },

    state: {
      type: String,
      required: [true, "State is required"],
      trim: true,
    },

    contactNumber: {
      type: String,
      required: [true, "Contact number is required"],
      match: [
        /^[6-9]\d{9}$/,
        "Please enter a valid 10-digit Indian mobile number",
      ],
    },

    patientAge: {
      type: Number,
      default: null,
    },

    patientGender: {
      type: String,
      enum: ["Male", "Female", "Other"],
      default: "Male",
    },

    requiredBefore: {
      type: Date,
      default: Date.now,
    },

    status: {
      type: String,
      enum: ["Pending", "Accepted", "Completed", "Cancelled"],
      default: "Pending",
    },

    description: {
      type: String,
      trim: true,
      default: "",
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

// ======================================================
// Database Indexes
// ======================================================

emergencyRequestSchema.index({ bloodGroup: 1 });
emergencyRequestSchema.index({ city: 1 });
emergencyRequestSchema.index({ status: 1 });

// ======================================================
// Export Model
// ======================================================

module.exports = mongoose.model(
  "EmergencyRequest",
  emergencyRequestSchema
);