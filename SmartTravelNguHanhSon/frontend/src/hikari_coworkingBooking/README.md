# Co-Working Space Booking Management System (SDN302)

Hệ thống backend quản lý đặt chỗ không gian làm việc chung (co-working). Hỗ trợ đăng ký/đăng nhập bằng JWT, phân quyền `admin` / `customer`, đặt chỗ với kiểm tra trùng lịch và tự động tính tiền.

> Thư mục dự án tên `hikari_coworkingBooking` — khi nộp bài, đổi `hikari` thành tên sinh viên của bạn (cả trong tên thư mục và trường `name`/`author` của `package.json`).

## 1. Công nghệ

Node.js · Express · MongoDB (Mongoose) · bcrypt · jsonwebtoken · dotenv · cors.

## 2. Cài đặt

```bash
npm install
```

Tạo file `.env` từ mẫu:

```bash
cp .env.example .env
```

Nội dung `.env` mặc định (MongoDB local):

```
PORT=3000
MONGODB_URI=mongodb://127.0.0.1:27017/coworkingBooking
JWT_SECRET=hikari_coworking_secret_key_change_me
JWT_EXPIRES_IN=1d
```

Yêu cầu có MongoDB đang chạy (local: `mongodb://127.0.0.1:27017`, hoặc thay bằng chuỗi kết nối MongoDB Atlas).

## 3. Chạy dự án

```bash
npm run seed   # Nạp dữ liệu mẫu (3 user, 5 space, 3 reservation)
npm run dev    # Chạy server với nodemon
# hoặc: npm start
```

## 4. Tài khoản mẫu (mật khẩu đều là 123456)

| Role     | Username | Password |
|----------|----------|----------|
| admin    | admin1   | 123456   |
| customer | user1    | 123456   |
| customer | user2    | 123456   |

Password trong file JSON gốc chỉ là hash placeholder giả — script `seed` tự hash lại `"123456"` bằng bcrypt khi chạy.

## 5. Hướng dẫn test bằng Postman

### 5.1. POST `/auth/register`
Body (JSON):
```json
{ "username": "newuser", "password": "123456" }
```
Vai trò luôn là `customer` dù client có gửi `role` (server bỏ qua).

### 5.2. POST `/auth/login`
```json
{ "username": "admin1", "password": "123456" }
```
Response trả về `token`. Với mọi request cần xác thực, thêm header:
```
Authorization: Bearer <token>
```

### 5.3. GET `/spaces` (tiện ích test — không thuộc yêu cầu chấm điểm)
Trả về danh sách space để lấy `spaceId` dùng cho việc test đặt chỗ.

### 5.4. GET `/reservations` (yêu cầu token)
- Đăng nhập bằng `admin1` → thấy **toàn bộ** reservation.
- Đăng nhập bằng `user1` → chỉ thấy reservation của user1.

### 5.5. POST `/reservations` (yêu cầu token)
Body:
```json
{
  "spaceId": "<lấy từ GET /spaces>",
  "startTime": "2026-09-01T08:00:00.000Z",
  "endTime": "2026-09-01T09:30:00.000Z",
  "note": "Test booking"
}
```
`userId` luôn được lấy từ token, không nhận từ body.

**Các case cần test:**
- **Thành công (201):** thời gian hợp lệ, space `available`, không trùng lịch.
- **Lỗi validation (400):** `startTime >= endTime`, hoặc `startTime` ở quá khứ.
- **Maintenance (403):** đặt space `MR-202` (đang `maintenance`) → message `"This space is currently unavailable due to maintenance"`.
- **Conflict (409):** đặt `MR-201` khoảng `09:00`–`11:00` ngày `2026-08-03` (giao với booking đã seed `08:00`–`10:00`) → message `"The selected space is already reserved for the requested time period."`.
- **Tính tiền giờ lẻ:** đặt `D-102` (60.000đ/giờ) từ `08:00` đến `09:30` (1.5 giờ) → `totalAmount = 90000`.

## 6. Giải thích logic quan trọng

**Kiểm tra trùng lịch (overlap):** Hai khoảng thời gian giao nhau khi
`(startTime_mới < endTime_cũ) AND (endTime_mới > startTime_cũ)`.
Điều kiện này được đưa thẳng vào một truy vấn Mongoose duy nhất
(`startTime: { $lt: newEnd }, endTime: { $gt: newStart }`) để kiểm tra ngay ở
tầng database, thay vì tải hết rồi lọc bằng JavaScript.

**Công thức tính tiền:**
`hours = (endTime - startTime) / (1000 * 60 * 60)` → `totalAmount = hours * pricePerHour`.
Giữ nguyên số giờ lẻ (vd 1.5 giờ) nên tiền được tính chính xác.

**Vì sao dùng 403 cho space bảo trì (thay vì 400):** request hợp lệ về mặt cú
pháp (dữ liệu đúng định dạng) nhưng bị **cấm truy cập** tài nguyên đang bảo trì,
nên 403 Forbidden phản ánh đúng bản chất hơn là 400 Bad Request.
