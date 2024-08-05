import { ADMIN, ERROR_MESSAGE } from "./constants";
import { getPermissionsByUserId } from "../services/user.services";
export async function checkRole(...allowRole) {
   return async (req, res, next) => {
      try {
         const userRole = req.user?.role;
         if (userRole === ADMIN) return next();
         const valid = allowRole.some((role) => role === userRole);
         if (!valid) {
            return res.status(403).json({
               ok: false,
               message: ERROR_MESSAGE.FORBIDDEN,
            });
         }
         next();
      } catch (error) {
         return res.status(500).json({
            success: false,
            message: ERROR_MESSAGE.SERVER_ERROR,
         });
      }
   };
}
