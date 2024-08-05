import { supportedMimes } from "./constants.js";

export const imageValidator = (size, mime) => {
   if (bytesToMb(size) > 2) {
      return "Kích thước hình ảnh không được vượt quá 2MB";
   } else if (!supportedMimes.includes(mime)) {
      return "Chỉ hỗ trợ các định dạng ảnh: jpg, jpeg, png, gif";
   }
   return null;
};

export const bytesToMb = (bytes) => {
   return bytes / (1024 * 1024);
};
