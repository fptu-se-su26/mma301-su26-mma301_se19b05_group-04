const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const { SALT_ROUNDS, ROLES } = require('../utils/constants');

// Schema cho người dùng (User).
// - username: tên đăng nhập, bắt buộc, không được trùng, tự cắt khoảng trắng thừa.
// - password: mật khẩu đã được hash bằng bcrypt; đặt select:false để mặc định
//   không trả trường này ra ngoài response.
// - role: vai trò, chỉ nhận 'admin' hoặc 'customer', mặc định là 'customer'.
// - createdAt: thời điểm tạo tài khoản.
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
  role: {
    type: String,
    enum: [ROLES.ADMIN, ROLES.CUSTOMER],
    default: ROLES.CUSTOMER,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Middleware chạy TRƯỚC khi lưu user: tự động hash mật khẩu bằng bcrypt.
// Chỉ hash lại khi trường password thay đổi để tránh hash chồng nhiều lần.
userSchema.pre('save', async function hashPasswordBeforeSave(next) {
  if (!this.isModified('password')) {
    return next();
  }
  this.password = await bcrypt.hash(this.password, SALT_ROUNDS);
  next();
});

module.exports = mongoose.model('User', userSchema);
