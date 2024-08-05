export default function countWords(text) {
   // Xóa các ký tự đặc biệt và chuyển đổi nhiều khoảng trắng thành một khoảng trắng
   const cleanText = text.replace(/[^\w\s]|_/g, "").replace(/\s+/g, " ");
   // Tách chuỗi thành mảng các từ dựa trên khoảng trắng
   const wordsArray = cleanText.split(" ");
   // Trả về số lượng từ
   return wordsArray.length;
}
