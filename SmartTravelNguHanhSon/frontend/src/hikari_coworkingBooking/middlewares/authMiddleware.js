const jwt = require('jsonwebtoken');

// Middleware xác thực người dùng qua JWT.
// - Đọc token từ header "Authorization: Bearer <token>".
// - Nếu thiếu token, hoặc token sai/hết hạn -> trả về 401.
// - Nếu hợp lệ -> giải mã và gắn thông tin { userId, role } vào req.user
//   để các bước sau (phân quyền, gán chủ sở hữu đơn đặt) sử dụng.
function authMiddleware(req, res, next) {
  try {
    const authHeader = req.headers.authorization;

    // Kiểm tra header có đúng định dạng "Bearer <token>" hay không.
    const hasBearerToken = authHeader && authHeader.startsWith('Bearer ');
    if (!hasBearerToken) {
      return res.status(401).json({ message: 'Thiếu token xác thực' });
    }

    const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = { userId: decoded.userId, role: decoded.role };
    next();
  } catch (error) {
    // Token sai chữ ký hoặc đã hết hạn đều rơi vào đây.
    return res.status(401).json({ message: 'Token không hợp lệ hoặc đã hết hạn' });
  }
}

module.exports = authMiddleware;
