require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const reservationRoutes = require('./routes/reservationRoutes');
const spaceRoutes = require('./routes/spaceRoutes');
const errorHandler = require('./middlewares/errorHandler');

// Điểm khởi động ứng dụng: cấu hình Express, kết nối DB, gắn routes và chạy server.
const app = express();

app.use(cors());
app.use(express.json());

// Gắn các nhóm route theo tiền tố đường dẫn.
app.use('/auth', authRoutes);
app.use('/reservations', reservationRoutes);
app.use('/spaces', spaceRoutes);

// Middleware xử lý lỗi tập trung phải đặt sau cùng.
app.use(errorHandler);

const PORT = process.env.PORT || 3000;

// Kết nối database trước, sau đó mới lắng nghe cổng.
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`🚀 Server đang chạy tại http://localhost:${PORT}`);
  });
});
