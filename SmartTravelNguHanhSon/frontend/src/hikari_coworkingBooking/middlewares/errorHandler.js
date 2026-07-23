// Middleware xử lý lỗi tập trung.
// Mọi lỗi không lường trước (được next(error) đẩy về đây) sẽ được trả về dưới
// dạng JSON gọn gàng, không lộ stack trace thô cho client, tránh server crash.
function errorHandler(err, req, res, next) {
  console.error('❌ Lỗi hệ thống:', err.message);
  res.status(err.statusCode || 500).json({
    message: err.message || 'Đã xảy ra lỗi hệ thống',
  });
}

module.exports = errorHandler;
