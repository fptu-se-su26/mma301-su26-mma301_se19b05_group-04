const mongoose = require('mongoose');

// Schema cho đơn đặt chỗ (Reservation).
// - userId: người đặt, tham chiếu tới User; luôn lấy từ token, không từ client.
// - spaceId: không gian được đặt, tham chiếu tới Space.
// - startTime / endTime: thời gian bắt đầu và kết thúc.
// - totalAmount: tổng tiền, được TÍNH TỰ ĐỘNG ở controller, không nhận từ client.
// - note: ghi chú tùy chọn.
const reservationSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  spaceId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Space',
    required: true,
  },
  startTime: {
    type: Date,
    required: true,
  },
  endTime: {
    type: Date,
    required: true,
  },
  totalAmount: {
    type: Number,
    required: true,
  },
  note: {
    type: String,
  },
});

module.exports = mongoose.model('Reservation', reservationSchema);
