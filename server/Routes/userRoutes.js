const express = require('express');
const { registerUser, authUser, allUsers } = require('../Controller/userController');

const { protect } = require('../middlewares/authMiddleware');
const { sendOtp, verifyOtp } = require('../Controller/otpController');
const router = express.Router()



router.route('/').post(registerUser).get(protect,allUsers)
router.post('/login',authUser)
router.post("/sendotp", sendOtp)
router.post("/verifyotp", verifyOtp)
module.exports=router;