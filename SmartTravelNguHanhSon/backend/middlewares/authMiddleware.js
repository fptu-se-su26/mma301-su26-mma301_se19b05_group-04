const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'your_super_secret_jwt_key_change_me';

const protect = async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      // Lấy token từ header
      token = req.headers.authorization.split(' ')[1];

      // Giải mã token
      const decoded = jwt.verify(token, JWT_SECRET);

      // Gắn payload giải mã được vào request object
      req.user = decoded;

      return next();
    } catch (error) {
      console.error('Lỗi kiểm tra token:', error.message);
      return res.status(401).json({
        success: false,
        message: 'Token không hợp lệ hoặc đã hết hạn, vui lòng đăng nhập lại',
      });
    }
  }

  if (!token) {
    return res.status(401).json({
      success: false,
      message: 'Không tìm thấy quyền truy cập, token bị thiếu',
    });
  }
};

module.exports = {
  protect,
};
