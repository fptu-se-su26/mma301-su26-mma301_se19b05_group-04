const mongoose = require('mongoose');

// Hàm kết nối tới MongoDB.
// Đọc chuỗi kết nối từ biến môi trường MONGODB_URI. Nếu kết nối thất bại,
// in lỗi rõ ràng ra console và thoát tiến trình để tránh chạy server "chết".
async function connectDB() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Đã kết nối MongoDB thành công');
  } catch (error) {
    console.error('❌ Kết nối MongoDB thất bại:', error.message);
    process.exit(1);
  }
}

module.exports = connectDB;
