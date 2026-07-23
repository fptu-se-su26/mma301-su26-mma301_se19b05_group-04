// Middleware phân quyền theo vai trò.
// Đây là hàm bậc cao: nhận vào danh sách các vai trò được phép, trả về một
// middleware kiểm tra vai trò của người dùng hiện tại (req.user.role) có nằm
// trong danh sách đó không. Nếu không đủ quyền -> trả về 403.
function authorizeRoles(...allowedRoles) {
  return (req, res, next) => {
    const userRole = req.user && req.user.role;
    const isAllowed = allowedRoles.includes(userRole);
    if (!isAllowed) {
      return res.status(403).json({ message: 'Bạn không có quyền truy cập tài nguyên này' });
    }
    next();
  };
}

module.exports = authorizeRoles;
