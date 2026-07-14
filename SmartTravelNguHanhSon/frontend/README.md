# Smart Travel Ngũ Hành Sơn - Frontend

Ứng dụng du lịch thông minh cho Ngũ Hành Sơn, Đà Nẵng.
Hỗ trợ 3 role: Du khách, Chủ xưởng, Admin.

## Công nghệ

- React Native + Expo + TypeScript
- React Navigation (Bottom Tabs + Native Stack)
- Context API + AsyncStorage
- React Native Maps, Expo Linear Gradient

## Cài đặt

```bash
cd frontend
npm install
npx expo start
```

## Tài khoản demo

| Role | Email | Password |
|------|-------|----------|
| 👤 Du khách | demo@gmail.com | 123456 |
| 🏭 Chủ xưởng | owner@gmail.com | 123456 |
| 🔒 Admin | admin@gmail.com | 123456 |

## Đăng nhập Google thật (Google OAuth Verification)

Ứng dụng hỗ trợ đăng nhập bằng tài khoản Google thật. Luồng xác thực bảo mật:
1. Người dùng bấm nút **Đăng nhập với Google** trên frontend.
2. Thiết bị di động mở Google OAuth portal trong trình duyệt hệ thống để xác minh danh tính.
3. Nhận về `idToken` gửi lên backend.
4. Backend verify `idToken` bằng thư viện `google-auth-library` hỗ trợ chấp nhận nhiều đối tượng audience (Web, iOS, Android Client IDs).
5. Trả về token JWT hệ thống và thông tin cá nhân.

### Hướng dẫn cấu hình Google Cloud Console

1. Truy cập [Google Cloud Console](https://console.cloud.google.com/).
2. Tạo dự án mới hoặc chọn dự án hiện tại của bạn.
3. Đi tới **APIs & Services** > **OAuth consent screen**:
   - Cấu hình loại người dùng (User Type) là **External**.
   - Nhập thông tin bắt buộc (App name, support email, developer contact).
4. Đi tới **APIs & Services** > **Credentials** và nhấn **Create Credentials** > **OAuth client ID**:
   - **Tạo Web application Client ID**:
     - Dùng làm `webClientId` tại Frontend và `GOOGLE_WEB_CLIENT_ID` tại Backend.
   - **Tạo iOS Client ID**:
     - Cấu hình **Bundle ID** chính xác là `com.buu.smarttravel1`.
     - Dùng làm `iosClientId` tại Frontend và `GOOGLE_IOS_CLIENT_ID` tại Backend.
   - **Tạo Android Client ID**:
     - Cấu hình **Package name** chính xác là `com.buu.smarttravel1`.
     - Nhập SHA-1 certificate fingerprint tương ứng của bạn (nếu build native).
     - Dùng làm `androidClientId` tại Frontend và `GOOGLE_ANDROID_CLIENT_ID` tại Backend.
5. Cập nhật các mã Client ID vào file cấu hình:
   - **Backend**: Cập nhật file `.env` với các biến tương ứng:
     ```env
     GOOGLE_WEB_CLIENT_ID=your_web_client_id
     GOOGLE_IOS_CLIENT_ID=your_ios_client_id
     GOOGLE_ANDROID_CLIENT_ID=your_android_client_id
     ```
   - **Frontend**: Cập nhật các trường tương ứng trong [google.ts](file:///c:/SU26/mmasp26/project/SmartTravelNguHanhSon/frontend/src/config/google.ts).

> [!WARNING]
> **Hạn chế của Expo Go**: Google OAuth hiện tại **không tương thích và bị chặn trên Expo Go** (lỗi 400: `invalid_request`) do Google chặn các luồng chuyển hướng qua Proxy dùng chung (`auth.expo.io`).
> - **Để kiểm thử Google Login**: Bạn phải xây dựng **Development Build** (`npx expo run:android` hoặc `npx expo run:ios`) để tạo ứng dụng native chạy với cấu hình bundle identifier/package riêng (`com.buu.smarttravel1`) và deep link `smarttravel1://`.
> - **Đối với Expo Go**: Hệ thống đã cung cấp nút bấm chuyển đổi nhanh sang luồng **Google Demo Account** khi tắt trình duyệt bị lỗi để quá trình kiểm thử không bị gián đoạn.

### Các lỗi thường gặp khi phát triển

#### 1. Lỗi `redirect_uri_mismatch`
- **Nguyên nhân**: Redirect URI từ thiết bị di động không khớp với cấu hình trong Credentials trên Google Cloud Console.
- **Xử lý**: Kiểm tra deep link của app (ví dụ: `smarttravel1://oauth2redirect/google`) và thêm chính xác vào phần **Authorized redirect URIs** của Web Client ID trên Google Cloud Console.

#### 2. Lỗi `Google token không hợp lệ`
- **Nguyên nhân**: Backend kiểm tra `idToken` không thành công do cấu hình sai hoặc không khớp Client ID giữa Frontend và Backend.
- **Xử lý**: Đảm bảo các biến môi trường Client ID trong file `.env` ở backend khớp hoàn toàn với các Client ID tương ứng trong [google.ts](file:///c:/SU26/mmasp26/project/SmartTravelNguHanhSon/frontend/src/config/google.ts) ở frontend.

#### 3. Lỗi kết nối mạng (Network Error)
- **Nguyên nhân**: Thiết bị di động không kết nối được tới localhost của máy tính chạy backend.
- **Xử lý**: Thay đổi `API_BASE_URL` trong [env.ts](file:///c:/SU26/mmasp26/project/SmartTravelNguHanhSon/frontend/src/config/env.ts) thành địa chỉ IPv4 máy tính của bạn thay vì `localhost`. Cả máy tính chạy backend và thiết bị test phải kết nối chung một mạng Wifi.

---

## Phân quyền

### 👤 User (Du khách)
- Xem địa điểm, workshop đã duyệt, bản đồ
- Tìm kiếm, lọc thông minh
- Đặt lịch workshop → booking pending
- Xem lịch sử booking của mình
- Dùng AI tư vấn du lịch
- Lưu lịch trình, yêu thích
- Quản lý profile

### 🏭 Owner (Chủ xưởng)
- Dashboard: thống kê workshop, booking, doanh thu
- Xem/thêm/sửa workshop của mình
- Workshop mới → status pending → chờ Admin duyệt
- Xem booking của workshop mình
- Xác nhận / Hoàn thành / Hủy booking
- Xem doanh thu từ booking completed

### 🔒 Admin (Quản trị)
- Dashboard: thống kê hệ thống
- Xem danh sách user (view-only)
- Quản lý workshop: Duyệt / Ẩn
- Xem toàn bộ booking (view-only)

## Luồng demo

### Luồng User
1. Login `demo@gmail.com / 123456` hoặc **Đăng nhập bằng Google thật**.
2. Home → Xem workshop → Đặt lịch.
3. Xem lịch sử booking → Dùng AI.
4. Đăng xuất.

### Luồng Owner
1. Login `owner@gmail.com / 123456`.
2. Dashboard → Xem booking chờ → Xác nhận.
3. Xem workshop → Thêm workshop mới (pending).
4. Xem doanh thu → Đăng xuất.

### Luồng Admin
1. Login `admin@gmail.com / 123456`.
2. Dashboard → Duyệt workshop pending.
3. Xem user → Xem booking → Đăng xuất.

## Trạng thái

### Workshop: `pending` → `approved` → `hidden`
- pending: chờ admin duyệt
- approved: user thấy được
- hidden: bị ẩn

### Booking: `pending` → `confirmed` → `completed` / `cancelled`
- pending: user vừa đặt
- confirmed: owner xác nhận
- completed: đã hoàn thành (tính doanh thu)
- cancelled: đã hủy
