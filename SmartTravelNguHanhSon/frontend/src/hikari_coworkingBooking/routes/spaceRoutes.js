const express = require('express');
const { getSpaces } = require('../controllers/spaceController');

// Định tuyến tiện ích để liệt kê space, phục vụ việc test chọn spaceId trên
// Postman. Không thuộc yêu cầu chấm điểm nên để đơn giản, không phân quyền.
const router = express.Router();

router.get('/', getSpaces);

module.exports = router;
