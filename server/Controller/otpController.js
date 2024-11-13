
// const asyncHandler = require("express-async-handler")
// const User = require('../models/userModel');



// const sendOtpToUser = async (req, res) => {
//     try {
//         const { email } = req.body;

//         // Check if the user exists
//         const user = await User.findOne({ email });

//         if (user) {
//             // User exists, return an error response
//             res.status(400).json({ message: "User already exists with this email." });
//         } else {
//             // User does not exist, call the OTP send function
//             await sendOtp(email); // Assumes sendOtp function is defined elsewhere to handle OTP sending
//             res.status(200).json({ message: "OTP sent to the provided email." });
//         }
//     } catch (error) {
//         res.status(500).json({ message: "An error occurred", error: error.message });
//     }
// };


// module.exports = {sendOtpToUser};