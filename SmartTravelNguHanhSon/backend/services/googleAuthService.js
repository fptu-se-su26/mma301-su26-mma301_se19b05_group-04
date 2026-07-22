const { OAuth2Client } = require('google-auth-library');

// Tạo OAuth2Client từ Web Client ID được cấu hình trong env
const client = new OAuth2Client();

/**
 * Xác thực Google ID Token gửi từ frontend
 * @param {string} idToken 
 * @returns {Promise<object>} Payload chứa thông tin người dùng Google
 */
const verifyGoogleToken = async (idToken) => {
  try {
    const ticket = await client.verifyIdToken({
      idToken,
      audience: [
        process.env.GOOGLE_WEB_CLIENT_ID,
        process.env.GOOGLE_IOS_CLIENT_ID,
        process.env.GOOGLE_ANDROID_CLIENT_ID
      ].filter(Boolean),
    });

    const payload = ticket.getPayload();
    if (!payload) {
      throw new Error('Không thể giải mã payload từ Google token');
    }

    if (!payload.email_verified) {
      throw new Error('Email chưa được xác thực bởi Google');
    }

    return {
      googleId: payload.sub,
      email: payload.email,
      fullName: payload.name || payload.given_name || 'Google User',
      avatar: payload.picture,
    };
  } catch (error) {
    console.error('Lỗi khi xác thực Google ID Token:', error.message);
    throw new Error(error.message || 'Token Google không hợp lệ');
  }
};

module.exports = {
  verifyGoogleToken,
};
