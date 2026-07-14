const jwt = require('jsonwebtoken');
const userStore = require('../utils/userStore');
const { verifyGoogleToken } = require('../services/googleAuthService');

// Sử dụng JWT_SECRET từ môi trường hoặc mặc định nếu chưa cấu hình
const JWT_SECRET = process.env.JWT_SECRET || 'your_super_secret_jwt_key_change_me';

/**
 * Đăng ký tài khoản thủ công (local)
 */
const register = async (req, res) => {
  try {
    const { fullName, email, phone, password, role, workshopName, workshopAddress } = req.body;

    if (!fullName || !email || !password) {
      return res.status(400).json({ success: false, message: 'Vui lòng điền đầy đủ họ tên, email và mật khẩu' });
    }

    const existingUser = userStore.findUserByEmail(email);
    if (existingUser) {
      return res.status(400).json({ success: false, message: 'Email này đã được đăng ký' });
    }

    const finalRole = role === 'owner' ? 'owner' : 'user';
    const newUser = userStore.createUser({
      fullName,
      email,
      phone,
      password, // Trong thực tế nên hash password, ứng dụng demo lưu thuần túy
      role: finalRole,
      provider: 'local',
      ...(finalRole === 'owner' ? { workshopName, workshopAddress } : {}),
    });

    const token = jwt.sign(
      { id: newUser.id, email: newUser.email, role: newUser.role },
      JWT_SECRET,
      { expiresIn: '7d' }
    );

    const { password: _, ...userData } = newUser;
    res.status(201).json({
      success: true,
      message: 'Đăng ký thành công',
      token,
      user: userData,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

/**
 * Đăng nhập thủ công bằng email & password
 */
const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ success: false, message: 'Vui lòng cung cấp email và mật khẩu' });
    }

    const user = userStore.findUserByEmail(email);
    if (!user || user.password !== password) {
      return res.status(400).json({ success: false, message: 'Sai email hoặc mật khẩu' });
    }

    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      JWT_SECRET,
      { expiresIn: '7d' }
    );

    const { password: _, ...userData } = user;
    res.json({
      success: true,
      message: 'Đăng nhập thành công',
      token,
      user: userData,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

/**
 * Đăng nhập hoặc đăng ký bằng Google Token thật
 */
const googleLogin = async (req, res) => {
  try {
    const { idToken } = req.body;
    if (!idToken) {
      return res.status(400).json({
        success: false,
        message: 'Vui lòng gửi Google idToken lên backend',
      });
    }

    // 1. Verify idToken thông qua Google API
    let googlePayload;
    try {
      googlePayload = await verifyGoogleToken(idToken);
    } catch (err) {
      return res.status(401).json({
        success: false,
        message: 'Google token không hợp lệ hoặc hết hạn: ' + err.message,
      });
    }

    const { googleId, email, fullName, avatar } = googlePayload;

    // 2. Tìm hoặc Tạo user
    let user = userStore.findUserByGoogleId(googleId) || userStore.findUserByEmail(email);

    if (user) {
      // Nếu đã có user bằng email hoặc googleId, cập nhật googleId và provider nếu chưa có
      if (!user.googleId) user.googleId = googleId;
      if (!user.avatar) user.avatar = avatar;
      user.provider = 'google';
    } else {
      // Tạo user mới, mặc định role "user" (Tourist) để bảo mật
      user = userStore.createUser({
        fullName,
        email,
        avatar,
        role: 'user',
        provider: 'google',
        googleId,
      });
    }

    // 3. Tạo JWT Token
    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      JWT_SECRET,
      { expiresIn: '7d' }
    );

    const { password: _, ...userData } = user;

    res.json({
      success: true,
      message: 'Đăng nhập Google thành công',
      token,
      user: userData,
    });
  } catch (error) {
    console.error('Lỗi khi xử lý Đăng nhập Google:', error);
    res.status(500).json({
      success: false,
      message: 'Lỗi máy chủ trong quá trình xử lý đăng nhập Google',
    });
  }
};

/**
 * Trả về thông tin user hiện tại qua token giải mã
 */
const getMe = async (req, res) => {
  try {
    // Middleware auth sẽ gắn thông tin user giải mã vào req.user
    const user = userStore.findUserById(req.user.id);
    if (!user) {
      return res.status(404).json({ success: false, message: 'Không tìm thấy người dùng' });
    }
    const { password: _, ...userData } = user;
    res.json({ success: true, user: userData });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  register,
  login,
  googleLogin,
  getMe,
};
