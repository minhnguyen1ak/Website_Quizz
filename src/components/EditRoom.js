import React, { useState, useEffect } from 'react'; // Nhập React và các hook useState, useEffect từ thư viện 'react'
import { useNavigate } from 'react-router-dom'; // Nhập useNavigate để điều hướng
import '../css/form.css'; // Nhập tệp CSS để định dạng giao diện biểu mẫu

// Khai báo component EditRoom, nhận props: exams (danh sách đề thi), onBack (quay lại), onSave (lưu dữ liệu), roomData (dữ liệu phòng thi)
const EditRoom = ({ exams = [], onBack, onSave, roomData }) => {
  // Khởi tạo trạng thái form với useState để lưu thông tin phòng thi (tên, mã phòng, mã đề thi)
  const [form, setForm] = useState({
    roomName: '',
    roomCode: '',
    examCode: ''
  });

  // Khởi tạo useNavigate để điều hướng
  const navigate = useNavigate();

  // Sử dụng useEffect để cập nhật form khi roomData thay đổi
  useEffect(() => {
    // Nếu roomData tồn tại, cập nhật trạng thái form với dữ liệu từ roomData
    if (roomData) {
      setForm({
        roomName: roomData.roomName || '', // Gán tên phòng, mặc định rỗng nếu không có
        roomCode: roomData.roomCode || '', // Gán mã phòng, mặc định rỗng nếu không có
        examCode: roomData.examCode || ''  // Gán mã đề thi, mặc định rỗng nếu không có
      });
    }
  }, [roomData]); // Chỉ chạy khi roomData thay đổi

  // Nếu roomData chưa có, hiển thị thông báo đang tải
  if (!roomData) {
    return <div>Đang tải dữ liệu phòng thi...</div>;
  }

  // Hàm xử lý sự kiện thay đổi giá trị trong các trường nhập liệu
  const handleChange = (e) => {
    const { name, value } = e.target; // Lấy tên trường và giá trị từ sự kiện
    // Cập nhật trạng thái form, giữ nguyên các giá trị cũ và thay đổi giá trị trường tương ứng
    setForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  };

  // Hàm xử lý khi gửi biểu mẫu
  const handleSubmit = (e) => {
    e.preventDefault(); // Ngăn hành vi mặc định của biểu mẫu (tải lại trang)

    // Kiểm tra nếu tên phòng hoặc mã phòng rỗng, hiển thị cảnh báo
    if (!form.roomName.trim() || !form.roomCode.trim()) {
      alert("Tên phòng và mã phòng không được để trống.");
      return;
    }

    // Gọi hàm onSave để gửi dữ liệu đã chỉnh sửa lên component cha
    onSave(form);
  };

  // Hàm xử lý quay lại trang trước
  const handleBack = () => {
    // Gọi hàm onBack nếu được truyền qua props
    if (onBack) {
      onBack();
    }
    // Sử dụng navigate để quay lại trang trước đó
    navigate(-1);
  };

  // Trả về giao diện JSX của component
  return (
    // Container chính của biểu mẫu với class form-container
    <div className="form-container">
      {/* Tiêu đề của biểu mẫu */}
      <h2>✏️ Chỉnh Sửa Phòng Thi</h2>
      {/* Biểu mẫu với sự kiện onSubmit gọi hàm handleSubmit */}
      <form onSubmit={handleSubmit}>
        {/* Nhóm trường nhập liệu cho tên phòng */}
        <div className="form-group">
          <label>Tên Phòng:</label>
          <input
            type="text" // Kiểu nhập liệu là văn bản
            name="roomName" // Tên trường
            value={form.roomName} // Giá trị lấy từ trạng thái form
            onChange={handleChange} // Sự kiện thay đổi gọi hàm handleChange
            required // Bắt buộc nhập
          />
        </div>

        {/* Nhóm trường nhập liệu cho mã phòng */}
        <div className="form-group">
          <label>Mã Phòng:</label>
          <input
            type="text"
            name="roomCode"
            value={form.roomCode}
            onChange={handleChange}
            required
          />
        </div>

        {/* Nhóm trường nhập liệu cho mã đề thi (menu thả xuống) */}
        <div className="form-group">
          <label>Chọn Đề Thi:</label>
          <select
            name="examCode" // Tên trường
            value={form.examCode} // Giá trị lấy từ trạng thái form
            onChange={handleChange} // Sự kiện thay đổi gọi hàm handleChange
            required // Bắt buộc chọn
          >
            {/* Tùy chọn mặc định */}
            <option value="">-- Chọn mã đề thi --</option>
            {/* Lặp qua mảng exams để tạo các tùy chọn */}
            {exams.map((exam, idx) => (
              <option key={idx} value={exam.examCode}>
                {exam.examCode} - {exam.examName} {/* Hiển thị mã và tên đề thi */}
              </option>
            ))}
          </select>
        </div>

        {/* Container cho các nút hành động */}
        <div className="form-actions">
          {/* Nút gửi biểu mẫu để lưu thay đổi */}
          <button type="submit">💾 Lưu Thay Đổi</button>
          {/* Nút quay lại, khi nhấn sẽ gọi hàm handleBack */}
          <button type="button" onClick={handleBack}>Quay Lại</button>
        </div>
      </form>
    </div>
  );
};

// Xuất component EditRoom để sử dụng ở nơi khác
export default EditRoom;