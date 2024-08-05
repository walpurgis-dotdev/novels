import { StatusCodes } from "http-status-codes";

export default function prismaErrorHandle(errorCode) {
   switch (errorCode) {
      case "P2025":
         return {
            message: "Tai nguyen khong ton tai trong he thong.",
            code: StatusCodes.NOT_FOUND,
         };
      case "P2002":
         return {
            message: "Tai nguyen da ton tai trong he thong.",
            code: StatusCodes.CONFLICT,
         };
      case "P2000":
         return {
            message: "Gia tri dau vao khong hop le.",
            code: StatusCodes.BAD_REQUEST,
         };
      case "P2006":
         return {
            message: "Gia tri dau vao khong hop le.",
            code: StatusCodes.BAD_REQUEST,
         };
      case "P2012":
         return {
            message: "Thieu thong tin bat buoc.",
            code: StatusCodes.BAD_REQUEST,
         };
      case "P2021":
         return {
            message: "Loi he thong, hay thu lai sau it phut.",
            code: StatusCodes.BAD_REQUEST,
         };
      case "P2022":
         return {
            message: "Loi he thong, hay thu lai sau it phut.",
            code: StatusCodes.BAD_REQUEST,
         };
      case "P2024":
         return {
            message: "Loi he thong, hay thu lai sau it phut.",
            code: StatusCodes.BAD_REQUEST,
         };
      default:
         return {
            message: "He thong ban, hay thu lai sau it phut.",
            code: StatusCodes.INTERNAL_SERVER_ERROR,
         };
   }
}
