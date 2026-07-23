const Reservation = require('../models/reservationModel');
const { MILLISECONDS_PER_HOUR } = require('./constants');

// Hàm kiểm tra dữ liệu đầu vào khi tạo đơn đặt chỗ.
// Nhận vào startTime, endTime (kiểu Date); trả về chuỗi thông báo lỗi nếu không
// hợp lệ, hoặc null nếu hợp lệ. Điều kiện:
// - startTime phải thực sự nhỏ hơn endTime.
// - startTime không được ở quá khứ so với thời điểm hiện tại của server.
function validateReservationInput(startTime, endTime) {
  const isStartBeforeEnd = startTime.getTime() < endTime.getTime();
  if (!isStartBeforeEnd) {
    return 'startTime phải nhỏ hơn endTime';
  }

  const isStartInPast = startTime.getTime() < Date.now();
  if (isStartInPast) {
    return 'startTime không được ở quá khứ';
  }

  return null;
}

// Hàm kiểm tra xem khoảng thời gian đặt mới có bị trùng (overlap) với một
// booking đã tồn tại trong cùng một không gian hay không.
// Nguyên tắc: hai khoảng thời gian giao nhau khi
// (bắt đầu mới < kết thúc cũ) VÀ (kết thúc mới > bắt đầu cũ).
// Dùng MỘT truy vấn Mongoose duy nhất để việc kiểm tra diễn ra ở tầng database,
// hiệu quả và rõ ràng, thay vì tải hết rồi lọc bằng JavaScript.
async function hasOverlapConflict(spaceId, newStartTime, newEndTime) {
  const overlappingReservation = await Reservation.findOne({
    spaceId,
    startTime: { $lt: newEndTime },
    endTime: { $gt: newStartTime },
  });
  return Boolean(overlappingReservation);
}

// Hàm tính tổng tiền dựa trên số giờ thuê thực tế và đơn giá theo giờ.
// Số giờ được tính chính xác kể cả giờ lẻ (vd 1.5 giờ) nên không làm tròn.
function calculateTotalAmount(startTime, endTime, pricePerHour) {
  const hours = (endTime.getTime() - startTime.getTime()) / MILLISECONDS_PER_HOUR;
  return hours * pricePerHour;
}

module.exports = {
  validateReservationInput,
  hasOverlapConflict,
  calculateTotalAmount,
};
