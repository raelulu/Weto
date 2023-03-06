const multer = require('multer');
const path = require('path');
const upload = multer({
  storage: multer.diskStorage({
    // 이미지 저장 경로: public/img
    destination(req, file, done) {
      done(null, `../${process.env.ROUTE}/img`);
    },
    filename(req, file, done) {
      // 파일명 겹침 방지를 위해 timestamp로 파일명 지정
      console.log(req.body);
      done(null, Date.now() + path.extname(file.originalname));
    },
  }),
});

exports.upLoadImg = upload.single('img');
