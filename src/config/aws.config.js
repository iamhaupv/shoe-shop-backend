const AWS = require("aws-sdk");
const multer = require("multer");
const path = require("path");

// Cấu hình AWS SDK
AWS.config.update({
  region: process.env.REGION,
  accessKeyId: process.env.ACCESS_KEY_ID,
  secretAccessKey: process.env.SECRET_ACCESS_KEY,
});


// Khởi tạo service S3
const s3 = new AWS.S3();

// Tên bucket S3
const bucketName = process.env.S3_BUCKET_NAME; // Thay thế bằng tên bucket của bạn

// Cấu hình Multer để lưu trữ file ảnh tạm thời trong bộ nhớ
const storage = multer.memoryStorage();

// Cấu hình Multer upload
const upload = multer({
  storage,
  limits: { fileSize: 200000000 }, // Giới hạn kích thước file ảnh (ví dụ 200MB)
  fileFilter(req, file, cb) {
    checkFileType(file, cb); // Kiểm tra loại file ảnh cho phép
  },
});

// Hàm kiểm tra loại file ảnh cho phép
function checkFileType(file, cb) {
  const filetypes = /jpeg|png|jpg|gif|webp|avif/;
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  if (extname) {
    return cb(null, true);
  }
  return cb(new Error("Chỉ chấp nhận file ảnh!"));
}

module.exports = {
  bucketName,
  s3,
  upload,
};
