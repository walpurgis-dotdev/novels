import { ADMIN } from "../utils/constants.js";

const authAdminMiddleware = async (req, res, next) => {
   if (req.user.role !== ADMIN) {
      return res.status(403).json({
         message: "Bạn không có quyền truy cập.",
         ok: false,
         statusCode: 403,
      });
   }
   next();
};
export default authAdminMiddleware;
