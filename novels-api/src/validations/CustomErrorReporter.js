import { errors } from "@vinejs/vine";

export class CustomErrorReporter {
   hasErrors = false;

   errors = {};

   report(message, rule, field, meta) {
      this.hasErrors = true;
      this.errors[field.wildCardPath] = message;
   }
   createError() {
      return new errors.E_VALIDATION_ERROR(this.errors);
   }
}

export const customErrorMessage = {
   string: "Trường dữ liệu >{{ field }}< phải là chuỗi",
   number: "Trường dữ liệu >{{ field }}< phải là số",
   object: "Trường dữ liệu >{{ field }}< phải là object",
   array: "Trường dữ liệu >{{ field }}< phải là mảng",
   boolean: "Trường dữ liệu >{{ field }}< phải là boolean",
   required: "Trường dữ liệu >{{ field }}< không được để trống",
   minLength: "Trường dữ liệu >{{ field }}< phải có ít nhất {{min}} ký tự",
   maxLength: "Trường dữ liệu >{{ field }}< phải có nhiều nhất {{max}} ký tự",
   min: "Trường dữ liệu >{{ field }}< phải lớn hơn hoặc bằng {{min}}",
   max: "Trường dữ liệu >{{ field }}< phải nhỏ hơn hoặc bằng {{max}}",
   trim: "Trường dữ liệu >{{ field }}< không được chứa khoảng trắng ở đầu hoặc cuối chuỗi",
   decimal: "Trường dữ liệu >{{ field }}< phải là số thập phân",
   email: "Trường dữ liệu >{{ field }}< phải là email",
   regex: "Trường dữ liệu >{{ field }}< không đúng định dạng",
   url: "Trường dữ liệu >{{ field }}< phải là URL",
   activeUrl: "Trường dữ liệu >{{ field }}< phải là URL",
   alpha: "Trường dữ liệu >{{ field }}< chỉ được chứa chữ cái",
   alphaNumeric: "Trường dữ liệu >{{ field }}< chỉ được chứa chữ cái và số",
   fixedLength: "Trường dữ liệu >{{ field }}< phải có đúng {{length}} ký tự",
   confirmed:
      "Trường dữ liệu >{{ field }}< không khớp với trường dữ liệu >{{ otherField }}<",
   endsWith:
      "Trường dữ liệu >{{ field }}< phải kết thúc bằng >{{ substring }}<",
   startsWith:
      "Trường dữ liệu >{{ field }}< phải bắt đầu bằng >{{ substring }}<",
   sameAs: "Trường dữ liệu >{{ field }}< và >{{ otherField }}< phải giống nhau",
   notSameAs:
      "Trường dữ liệu >{{ field }}< và >{{ otherField }}< không được giống nhau",
   in: "Trường dữ liệu >{{ field }}< không hợp lệ",
   notIn: "Trường dữ liệu >{{ field }}< không hợp lệ",
   ipAddress: "Trường dữ liệu >{{ field }}< phải là địa chỉ IP",
   uuid: "Trường dữ liệu >{{ field }}< phải là UUID",
   ascii: "Trường dữ liệu >{{ field }}< phải là ký tự ASCII",
   creditCard:
      "Trường dữ liệu >{{ field }}< phải là số thẻ tín dụng hợp lệ >{{ providersList }}<",
   hexCode: "Trường dữ liệu >{{ field }}< phải là mã màu hex",
   iban: "Trường dữ liệu >{{ field }}< phải là số IBAN hợp lệ",
   jwt: "Trường dữ liệu >{{ field }}< phải là chuỗi JWT hợp lệ",
   coordinates: "Trường dữ liệu >{{ field }}< phải là tọa độ địa lý hợp lệ",
   mobile: "Trường dữ liệu >{{ field }}< phải là số điện thoại di động hợp lệ",
   passport: "Trường dữ liệu >{{ field }}< phải là số hộ chiếu hợp lệ",
   postalCode: "Trường dữ liệu >{{ field }}< phải là mã bưu chính hợp lệ",
   range: "Trường dữ liệu >{{ field }}< phải nằm trong khoảng {{min}} và {{max}}",
   withoutDecimals: "Trường dữ liệu >{{ field }}< không được chứa số thập phân",
   date: "Trường dữ liệu >{{ field }}< phải là ngày tháng",
   "date.equals":
      "Trường dữ liệu >{{ field }}< phải bằng với ngày tháng >{{ expectedValue }}<",
   "date.after":
      "Trường dữ liệu >{{ field }}< phải là ngày sau ngày >{{ expectedValue }}<",
   "date.before":
      "Trường dữ liệu >{{ field }}< phải là ngày trước ngày >{{ expectedValue }}<",
   "date.afterOrEqual":
      "Trường dữ liệu >{{ field }}< phải là ngày sau hoặc bằng ngày >{{ expectedValue }}<",
   "date.beforeOrEqual":
      "Trường dữ liệu >{{ field }}< phải là ngày trước hoặc bằng ngày >{{ expectedValue }}<",
   "date.sameAs":
      "Trường dữ liệu >{{ field }}< và >{{ otherField }}< phải giống nhau",
   "date.notSameAs":
      "Trường dữ liệu >{{ field }}< và >{{ otherField }}< không được giống nhau",
   "date.afterField":
      "Trường dữ liệu >{{ field }}< phải là ngày sau trường dữ liệu >{{ otherField }}<",
};
