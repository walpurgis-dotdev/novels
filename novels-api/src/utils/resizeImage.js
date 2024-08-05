import sharp from "sharp";

const resizeImage = async (image, width, height, format = "webp") => {
   const buffer = await sharp(image)
      .resize(width, height)
      .toFormat(format)
      .toBuffer();
   return buffer;
};
export default resizeImage;
