import cloudinary from "../config/cloudinary.js";
import streamifier from "streamifier";
const uploadImage = async ({ folder, file, fileName }) => {
   const options = {
      folder,
      public_id: fileName,
   };
   return new Promise((resolve, reject) => {
      let cld_upload_stream = cloudinary.uploader.upload_stream(
         options,
         (error, result) => {
            if (result) {
               resolve(result);
            } else {
               reject(error);
            }
         },
      );
      streamifier.createReadStream(file).pipe(cld_upload_stream);
   });
};

export default uploadImage;
