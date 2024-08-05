export const getNovelStatusLabel = (novel) => {
  switch (novel?.status) {
    case "ONGOING":
      return "Đang ra";
    case "PAUSED":
      return "Tạm dừng";
    default:
      return "Hoàn thành";
  }
};
