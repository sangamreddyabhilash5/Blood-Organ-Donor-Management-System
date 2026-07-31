const Donor = require("../models/Donor");

// ======================================================
// Get Donor Profile
// ======================================================
const getProfile = async (req, res) => {
  try {
    const { id } = req.params;

    const donor = await Donor.findById(id).select("-password");

    if (!donor) {
      return res.status(404).json({
        success: false,
        message: "Donor not found",
      });
    }

    return res.status(200).json({
      success: true,
      donor,
    });
  } catch (error) {
    console.error("Get Profile Error:", error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

// ======================================================
// Update Donor Profile
// ======================================================
const updateProfile = async (req, res) => {
  try {
    const { id } = req.params;

    // Only allow these fields to be updated
    const allowedUpdates = [
      "name",
      "email",
      "phone",
      "age",
      "gender",
      "bloodGroup",
      "city",
      "state",
      "address",
      "availability",
      "organDonor",
    ];

    const updateData = {};

    allowedUpdates.forEach((field) => {
      if (req.body[field] !== undefined) {
        updateData[field] = req.body[field];
      }
    });

    const donor = await Donor.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    }).select("-password");

    if (!donor) {
      return res.status(404).json({
        success: false,
        message: "Donor not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      donor,
    });
  } catch (error) {
    console.error("Update Profile Error:", error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

// ======================================================
// Export Controllers
// ======================================================
module.exports = {
  getProfile,
  updateProfile,
};