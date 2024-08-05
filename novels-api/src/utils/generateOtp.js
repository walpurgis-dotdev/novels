import { generate } from "otp-generator";

export default function generateOtp() {
   return generate(6, {
      digits: true,
      lowerCaseAlphabets: false,
      specialChars: false,
      upperCaseAlphabets: false,
   });
}
