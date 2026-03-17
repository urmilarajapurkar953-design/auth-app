import jwt from "jsonwebtoken";

const userAuth =async (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.json({ success: false, message: "No token provided" });
    }

    const tokenDecode = jwt.verify(token, process.env.JWT_SECRET);
    if(tokenDecode.id){
        req.userId = tokenDecode.id;  // Changed from req.body.userId
    } else {
        return res.json({ success: false, message: "not authorized login again" });
    }
   
    next();
  } catch (error) {
    return res.json({ success: false, message: "Invalid token" });
  }
};

export default userAuth;