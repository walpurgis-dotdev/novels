-- Tạo một hàm để xóa hàng quá hạn
CREATE OR REPLACE FUNCTION delete_expired_otps()
RETURNS TRIGGER AS $$
BEGIN
  -- Kiểm tra mỗi hàng xem đã quá hạn chưa và xóa nếu cần
  IF OLD.expires < NOW() THEN
    DELETE FROM Otps WHERE id = OLD.id;
    RETURN OLD;
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Tạo một trigger để gọi hàm trên khi có hàng cũ được cập nhật
CREATE TRIGGER trigger_delete_expired_otps
AFTER UPDATE ON Otps
FOR EACH ROW
WHEN (OLD.expires < NOW())
EXECUTE FUNCTION delete_expired_otps();
