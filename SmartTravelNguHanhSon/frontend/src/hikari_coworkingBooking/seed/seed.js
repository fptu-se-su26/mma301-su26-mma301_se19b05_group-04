require('dotenv').config();
const path = require('path');
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const connectDB = require('../config/db');
const User = require('../models/userModel');
const Space = require('../models/spaceModel');
const Reservation = require('../models/reservationModel');
const { SALT_ROUNDS } = require('../utils/constants');

// Đọc dữ liệu mẫu gốc từ file JSON của đề bài.
const sourceData = require(path.join(__dirname, 'coworkingBooking_db.json'));

// Mật khẩu thật dùng để đăng nhập cho cả 3 tài khoản mẫu.
// Lưu ý: các hash trong file JSON gốc chỉ là placeholder giả, KHÔNG dùng trực
// tiếp — script sẽ tự hash lại "123456" bằng bcrypt tại thời điểm chạy seed.
const DEFAULT_PLAINTEXT_PASSWORD = '123456';

// Hàm chính: xóa dữ liệu cũ rồi nạp lại dữ liệu mẫu.
// Vì các reservation trong file gốc tham chiếu tới user/space qua ID cố định cũ,
// ta phải ánh xạ lại theo ObjectId MỚI do Mongoose sinh ra sau khi insert, để
// tránh lỗi tham chiếu sai.
async function runSeed() {
  try {
    await connectDB();

    // Xóa dữ liệu cũ của cả 3 collection để chạy lại nhiều lần không bị trùng.
    await User.deleteMany({});
    await Space.deleteMany({});
    await Reservation.deleteMany({});
    console.log('🧹 Đã xóa dữ liệu cũ của 3 collection');

    // Hash lại mật khẩu thật cho từng user mẫu rồi chèn vào DB.
    // Dùng insertMany kèm cờ để BỎ QUA pre-save hook (vì ta đã hash sẵn ở đây),
    // tránh bị hash 2 lần.
    const hashedPassword = await bcrypt.hash(DEFAULT_PLAINTEXT_PASSWORD, SALT_ROUNDS);
    const usersToInsert = sourceData.users.map((user) => ({
      username: user.username,
      password: hashedPassword,
      role: user.role,
      createdAt: user.createdAt,
    }));
    const insertedUsers = await User.insertMany(usersToInsert);
    console.log(`👤 Đã seed ${insertedUsers.length} user (mật khẩu: 123456)`);

    // Chèn danh sách space mẫu (giữ nguyên các thuộc tính nghiệp vụ).
    const spacesToInsert = sourceData.spaces.map((space) => ({
      spaceCode: space.spaceCode,
      type: space.type,
      capacity: space.capacity,
      status: space.status,
      pricePerHour: space.pricePerHour,
      amenities: space.amenities,
    }));
    const insertedSpaces = await Space.insertMany(spacesToInsert);
    console.log(`🏢 Đã seed ${insertedSpaces.length} space`);

    // Xây bảng ánh xạ từ ID cũ (trong file JSON) sang document mới vừa insert,
    // dựa trên username và spaceCode (là các giá trị duy nhất, ổn định).
    const usernameToNewId = buildIdMap(sourceData.users, insertedUsers, 'username');
    const spaceCodeToNewId = buildSpaceIdMap(sourceData.spaces, insertedSpaces);

    // Tra cứu username/spaceCode theo ID cũ để ánh xạ reservation sang ID mới.
    const oldUserIdToUsername = mapOldIdToField(sourceData.users, 'username');
    const oldSpaceIdToCode = mapOldIdToField(sourceData.spaces, 'spaceCode');

    const reservationsToInsert = sourceData.reservations.map((reservation) => {
      const username = oldUserIdToUsername[reservation.userId];
      const spaceCode = oldSpaceIdToCode[reservation.spaceId];
      return {
        userId: usernameToNewId[username],
        spaceId: spaceCodeToNewId[spaceCode],
        startTime: reservation.startTime,
        endTime: reservation.endTime,
        totalAmount: reservation.totalAmount,
        note: reservation.note,
      };
    });
    const insertedReservations = await Reservation.insertMany(reservationsToInsert);
    console.log(`📅 Đã seed ${insertedReservations.length} reservation`);

    console.log('✅ Seed dữ liệu mẫu hoàn tất!');
  } catch (error) {
    console.error('❌ Seed thất bại:', error.message);
  } finally {
    await mongoose.connection.close();
  }
}

// Hàm phụ: tạo map từ username -> ObjectId mới của user.
function buildIdMap(sourceItems, insertedItems, key) {
  const map = {};
  insertedItems.forEach((item) => {
    map[item[key]] = item._id;
  });
  return map;
}

// Hàm phụ: tạo map từ spaceCode -> ObjectId mới của space.
function buildSpaceIdMap(sourceSpaces, insertedSpaces) {
  const map = {};
  insertedSpaces.forEach((space) => {
    map[space.spaceCode] = space._id;
  });
  return map;
}

// Hàm phụ: tạo map từ ID cũ trong file JSON -> giá trị field định danh (username
// hoặc spaceCode), phục vụ việc ánh xạ tham chiếu của reservation.
function mapOldIdToField(sourceItems, field) {
  const map = {};
  sourceItems.forEach((item) => {
    map[item._id] = item[field];
  });
  return map;
}

runSeed();
