const bcrypt = require('bcrypt');
const User = require('../models/userModel');
const { generateToken } = require('../utils/jwt');
const { ROLES } = require('../utils/constants');

// Controller đăng ký tài khoản mới.
// - Nhận username, password từ body.
// - Luôn ép role về 'customer', bỏ qua role client gửi lên (bảo mật phân quyền).
// - Kiểm tra username đã tồn tại chưa để báo lỗi rõ ràng.
// - Mật khẩu được hash tự động trong pre-save hook của userModel.
async function register(req, res, next) {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ message: 'Vui lòng nhập username và password' });
    }

    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(409).json({ message: 'Username đã tồn tại' });
    }

    // Luôn tạo với vai trò customer, không cho client tự chọn role.
    const newUser = await User.create({
      username,
      password,
      role: ROLES.CUSTOMER,
    });

    // Trả về thông tin user nhưng không kèm password.
    res.status(201).json({
      message: 'Đăng ký thành công',
      user: {
        _id: newUser._id,
        username: newUser.username,
        role: newUser.role,
        createdAt: newUser.createdAt,
      },
    });
  } catch (error) {
    next(error);
  }
}

// Controller đăng nhập.
// - Tìm user theo username, phải chủ động select thêm password vì schema ẩn nó.
// - So sánh mật khẩu bằng bcrypt.compare.
// - Nếu hợp lệ -> tạo JWT chứa userId và role, trả token cùng thông tin cơ bản.
// - Sai username hoặc password -> đều trả 401 với message chung chung để không
//   tiết lộ username có tồn tại hay không.
async function login(req, res, next) {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ username }).select('+password');
    if (!user) {
      return res.status(401).json({ message: 'Invalid username or password' });
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return res.status(401).json({ message: 'Invalid username or password' });
    }

    const token = generateToken(user._id, user.role);

    res.status(200).json({
      message: 'Đăng nhập thành công',
      token,
      user: {
        username: user.username,
        role: user.role,
      },
    });
  } catch (error) {
    next(error);
  }
}

module.exports = { register, login };
