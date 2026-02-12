// import jwt from 'jsonwebtoken'

// const authUser = async(req,res,next)=>{
//     const {token} = req.headers;
//     if (!token) {
//         return res.json({success : false ,message: 'قم بتسجيل الدخول اولا'})
// // Not Athorized Login Again
//     }
    
//     try {
//         const token_decode =jwt.verify(token,process.env.JWT_SECRET)
//         req.body.userId = token_decode.id
//         next()
//     } catch (error) {
//         console.log(error);
//         res.json({success : false ,message:error.message})
        
//     }




// }
// export default authUser




import jwt from 'jsonwebtoken';

const authUser = async (req, res, next) => {
  const token = req.headers.token; // خليها token مش {token}
  if (!token) {
    return res.json({ success: false, message: "قم بتسجيل الدخول أولًا" });
  }

  try {
    const token_decode = jwt.verify(token, process.env.JWT_SECRET);
    if (!token_decode.id) {
      return res.json({ success: false, message: "توكن غير صالح" });
    }
    req.userId = token_decode.id; // غير req.body.userId => req.userId
    next();
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

export default authUser;
