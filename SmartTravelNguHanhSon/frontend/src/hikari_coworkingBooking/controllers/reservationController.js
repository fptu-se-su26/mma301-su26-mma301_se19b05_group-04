const Reservation = require('../models/reservationModel');
const Space = require('../models/spaceModel');
const { ROLES, SPACE_STATUS } = require('../utils/constants');
const {
  validateReservationInput,
  hasOverlapConflict,
  calculateTotalAmount,
} = require('../utils/reservationHelpers');

// Controller lấy danh sách đơn đặt chỗ (GET /reservations).
// Phân quyền theo vai trò:
// - admin: trả về TOÀN BỘ reservations trong hệ thống.
// - customer: chỉ trả về những reservations của chính mình (userId trùng token).
async function getReservations(req, res, next) {
  try {
    const isAdmin = req.user.role === ROLES.ADMIN;

    // Admin xem tất cả, customer chỉ xem của mình.
    const filter = isAdmin ? {} : { userId: req.user.userId };

    const reservations = await Reservation.find(filter)
      .populate('spaceId')
      .populate('userId', 'username role');

    res.status(200).json(reservations);
  } catch (error) {
    next(error);
  }
}

// Controller tạo đơn đặt chỗ mới (POST /reservations).
// Xử lý theo đúng thứ tự bắt buộc để test case chạy đúng và dễ debug:
// 1) Kiểm tra dữ liệu đầu vào (thời gian).
// 2) Kiểm tra space tồn tại và không bảo trì.
// 3) Kiểm tra trùng lịch (overlap).
// 4) Tính tiền tự động.
// 5) Gán userId từ token (không tin dữ liệu client gửi lên).
async function createReservation(req, res, next) {
  try {
    const { spaceId, startTime, endTime, note } = req.body;

    if (!spaceId || !startTime || !endTime) {
      return res.status(400).json({ message: 'Vui lòng nhập spaceId, startTime, endTime' });
    }

    const start = new Date(startTime);
    const end = new Date(endTime);

    // Bước 1: Kiểm tra tính hợp lệ của thời gian.
    const validationError = validateReservationInput(start, end);
    if (validationError) {
      return res.status(400).json({ message: validationError });
    }

    // Bước 2: Kiểm tra space tồn tại và trạng thái bảo trì.
    const space = await Space.findById(spaceId);
    if (!space) {
      return res.status(404).json({ message: 'Không tìm thấy không gian (space)' });
    }
    // Dùng 403 vì request hợp lệ về cú pháp nhưng bị cấm truy cập tài nguyên
    // đang bảo trì (xem giải thích trong README).
    if (space.status === SPACE_STATUS.MAINTENANCE) {
      return res.status(403).json({
        message: 'This space is currently unavailable due to maintenance',
      });
    }

    // Bước 3: Kiểm tra trùng lịch với booking đã tồn tại trong cùng space.
    const isConflict = await hasOverlapConflict(spaceId, start, end);
    if (isConflict) {
      return res.status(409).json({
        message: 'The selected space is already reserved for the requested time period.',
      });
    }

    // Bước 4: Tính tổng tiền tự động dựa trên số giờ thuê và đơn giá theo giờ.
    const totalAmount = calculateTotalAmount(start, end, space.pricePerHour);

    // Bước 5: userId LUÔN lấy từ token đã giải mã, không lấy từ req.body.
    const newReservation = await Reservation.create({
      userId: req.user.userId,
      spaceId,
      startTime: start,
      endTime: end,
      totalAmount,
      note,
    });

    res.status(201).json({
      message: 'Đặt chỗ thành công',
      reservation: newReservation,
    });
  } catch (error) {
    next(error);
  }
}

module.exports = { getReservations, createReservation };
