const express = require('express');
const { register, login } = require('../controllers/authController');

// Định tuyến cho xác thực: đăng ký và đăng nhập.
const router = express.Router();

router.post('/register', register);
router.post('/login', login);

module.exports = router;
