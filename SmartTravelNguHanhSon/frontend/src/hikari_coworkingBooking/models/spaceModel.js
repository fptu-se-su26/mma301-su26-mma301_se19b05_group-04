const mongoose = require('mongoose');
const { SPACE_STATUS } = require('../utils/constants');

// Schema cho không gian làm việc (Space) trong không gian co-working.
// - spaceCode: mã không gian, bắt buộc và duy nhất (vd: "MR-201", "D-101").
// - type: loại không gian, 'desk' (bàn đơn) hoặc 'meetingRoom' (phòng họp).
// - capacity: sức chứa, bắt buộc và phải lớn hơn 0.
// - status: 'available' (dùng được) hoặc 'maintenance' (đang bảo trì).
// - pricePerHour: đơn giá thuê theo giờ, bắt buộc và không âm.
// - amenities: danh sách tiện ích đi kèm (mảng chuỗi), mặc định rỗng.
const spaceSchema = new mongoose.Schema({
  spaceCode: {
    type: String,
    required: true,
    unique: true,
  },
  type: {
    type: String,
    enum: ['desk', 'meetingRoom'],
    required: true,
  },
  capacity: {
    type: Number,
    required: true,
    min: 1,
  },
  status: {
    type: String,
    enum: [SPACE_STATUS.AVAILABLE, SPACE_STATUS.MAINTENANCE],
    default: SPACE_STATUS.AVAILABLE,
  },
  pricePerHour: {
    type: Number,
    required: true,
    min: 0,
  },
  amenities: {
    type: [String],
    default: [],
  },
});

module.exports = mongoose.model('Space', spaceSchema);
