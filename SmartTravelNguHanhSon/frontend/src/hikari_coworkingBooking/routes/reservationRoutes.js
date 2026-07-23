const express = require('express');
const { getReservations, createReservation } = require('../controllers/reservationController');
const authMiddleware = require('../middlewares/authMiddleware');

// Định tuyến cho đơn đặt chỗ. Mọi endpoint đều yêu cầu đăng nhập (authMiddleware).
// Logic phân quyền admin/customer được xử lý bên trong controller.
const router = express.Router();

router.get('/', authMiddleware, getReservations);
router.post('/', authMiddleware, createReservation);

module.exports = router;
