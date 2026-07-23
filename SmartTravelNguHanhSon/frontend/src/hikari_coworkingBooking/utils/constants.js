// File tập trung các hằng số dùng chung, tránh "magic number" rải rác trong code.

// Số vòng lặp khi hash mật khẩu bằng bcrypt.
const SALT_ROUNDS = 10;

// Số mili-giây trong 1 giờ, dùng để quy đổi khoảng thời gian đặt phòng ra số giờ.
const MILLISECONDS_PER_HOUR = 1000 * 60 * 60;

// Các vai trò người dùng trong hệ thống.
const ROLES = {
  ADMIN: 'admin',
  CUSTOMER: 'customer',
};

// Các trạng thái của không gian làm việc (space).
const SPACE_STATUS = {
  AVAILABLE: 'available',
  MAINTENANCE: 'maintenance',
};

module.exports = {
  SALT_ROUNDS,
  MILLISECONDS_PER_HOUR,
  ROLES,
  SPACE_STATUS,
};
