// import multer from "multer";

// const storage = multer.diskStorage({
//   filename:function(req,file,callback){
//     callback(null,file.originalname)
//   }
  
// })

// const upload = multer({ storage })

// export default upload


import multer from "multer";

const storage = multer.diskStorage({
  filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname),
});

const upload = multer({ storage });

export const uploadProof = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    if (!file.mimetype.startsWith("image/")) {
      return cb(new Error("الملف يجب أن يكون صورة"));
    }
    cb(null, true);
  },
});

export default upload;








// import multer from 'multer'
// const storage =multer.diskStorage({
//   filename:function(req,file,callback) {
//     callback(null,file.originalname)
//   }
// })
// const upload = multer({storage})


// export default upload










// import multer from 'multer'
// const storage =multer.diskStorage({
//   filename:function(req,file,callback) {
//     callback(null,file.originalname)
//   }
// })
// const upload = multer({storage})


// export default upload
