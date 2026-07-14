const express = require('express');
const router = express.Router();
const { register, login, googleLogin, getMe } = require('../controllers/authController');
const { protect } = require('../middlewares/authMiddleware');

// Route đăng ký local
router.post('/register', register);

// Route đăng nhập local
router.post('/login', login);

// Route đăng nhập Google OAuth thật
router.post('/google', googleLogin);

// Route thông tin tài khoản giải mã
router.get('/me', protect, getMe);

module.exports = router;
