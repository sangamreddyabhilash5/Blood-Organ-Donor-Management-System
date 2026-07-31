// ======================================================
// Send OTP Email
// ======================================================

const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({

    service: "gmail",

    auth: {

        user: process.env.EMAIL_USER,

        pass: process.env.EMAIL_PASS

    }

});

const sendOTP = async (email, otp) => {

    const mailOptions = {

        from: process.env.EMAIL_USER,

        to: email,

        subject: "Blood & Organ Donor System - OTP Verification",

        html: `
            <div style="font-family:Arial;padding:20px">

                <h2>Email Verification</h2>

                <p>Your OTP is</p>

                <h1 style="color:red">${otp}</h1>

                <p>This OTP is valid for 5 minutes.</p>

                <br>

                <p>Blood & Organ Donor Management System</p>

            </div>
        `

    };

    await transporter.sendMail(mailOptions);

};

module.exports = sendOTP;