const Space = require('../models/spaceModel');

// Controller liệt kê danh sách không gian (GET /spaces).
// Đây là tiện ích hỗ trợ test trên Postman (để lấy spaceId), KHÔNG thuộc yêu cầu
// chấm điểm của đề. Trả về toàn bộ space đang có trong hệ thống.
async function getSpaces(req, res, next) {
  try {
    const spaces = await Space.find();
    res.status(200).json(spaces);
  } catch (error) {
    next(error);
  }
}

module.exports = { getSpaces };
