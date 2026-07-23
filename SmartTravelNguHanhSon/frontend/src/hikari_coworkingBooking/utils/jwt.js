const jwt = require('jsonwebtoken');

// Hàm tạo (ký) JWT token cho một user.
// Payload BẮT BUỘC chứa userId và role, vì middleware phân quyền và logic
// "gán userId từ token" ở phần đặt chỗ đều dựa vào 2 thông tin này.
function generateToken(userId, role) {
  const payload = { userId, role };
  return jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
}

module.exports = { generateToken };
