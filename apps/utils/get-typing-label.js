export const getTypingLabel = (type) => {
  switch (type) {
    case "access":
      return "Lượt truy cập";
    case "newly-released":
      return "Mới được phát hành";
    case "number-of-words":
      return "Số từ";
    case "nominations":
      return "Đề cử";
    case "vote":
      return "Phiếu bầu";
    default:
      return "Không tìm thấy";
  }
};
