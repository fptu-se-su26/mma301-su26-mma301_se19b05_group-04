// Bộ nhớ tạm lưu trữ danh sách người dùng cho demo MMA
// Khởi tạo sẵn 3 tài khoản demo cố định phù hợp spec
const users = [
  {
    id: 'user-1',
    fullName: 'Nguyễn Ngọc Bữu',
    email: 'demo@gmail.com',
    password: '123456',
    phone: '0900000001',
    role: 'user',
    avatar: 'https://picsum.photos/id/64/200/200',
    provider: 'local',
  },
  {
    id: 'owner-1',
    fullName: 'Chủ xưởng Non Nước',
    email: 'owner@gmail.com',
    password: '123456',
    phone: '0900000002',
    role: 'owner',
    workshopName: 'Xưởng đá mỹ nghệ Non Nước',
    workshopAddress: 'Phường Hòa Hải, Ngũ Hành Sơn, Đà Nẵng',
    avatar: 'https://picsum.photos/id/91/200/200',
    provider: 'local',
  },
  {
    id: 'admin-1',
    fullName: 'Quản trị viên',
    email: 'admin@gmail.com',
    password: '123456',
    phone: '0900000003',
    role: 'admin',
    avatar: 'https://picsum.photos/id/65/200/200',
    provider: 'local',
  },
];

const findUserByEmail = (email) => {
  return users.find(u => u.email.toLowerCase() === email.toLowerCase());
};

const findUserById = (id) => {
  return users.find(u => u.id === id);
};

const findUserByGoogleId = (googleId) => {
  return users.find(u => u.googleId === googleId);
};

const createUser = (userData) => {
  const newUser = {
    id: 'user-' + Date.now(),
    provider: 'local',
    ...userData,
  };
  users.push(newUser);
  return newUser;
};

module.exports = {
  users,
  findUserByEmail,
  findUserById,
  findUserByGoogleId,
  createUser,
};
