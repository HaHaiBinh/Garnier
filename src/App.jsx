import { useState, useRef } from "react";
import Quiz from "./components/Quiz";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const [isRunning, setIsRunning] = useState(false);
  const [userInfo, setUserInfo] = useState({
    fullName: "",
    birthDate: "",
    phoneNumber: "",
    gender: ""
  });
  const [clickCount, setClickCount] = useState(0);
  const clickTimeoutRef = useRef(null);

  const dateInputRef = useRef(null);

  // Function để download Excel với UTF-8 BOM
  const downloadExcel = (data, filename = 'data.csv') => {
    // Lọc bỏ các field không mong muốn
    const filteredData = data.map(item => {
      const { _id, result, age, ...filteredItem } = item;
      return {
        "Họ và tên": filteredItem.name,
        "Ngày sinh": filteredItem.birthDay,
        "Giới tính": filteredItem.gender,
        "Số điện thoại": filteredItem.phoneNumber
      };
    });

    // Tạo CSV content với UTF-8 BOM
    const headers = Object.keys(filteredData[0]).join(',');
    const rows = filteredData.map(row =>
      Object.values(row).map(value => {
        // Xử lý các giá trị có dấu phẩy, dấu ngoặc kép, hoặc xuống dòng
        const stringValue = String(value);
        if (stringValue.includes(',') || stringValue.includes('"') || stringValue.includes('\n')) {
          return `"${stringValue.replace(/"/g, '""')}"`;
        }
        return stringValue;
      }).join(',')
    ).join('\n');

    const csvContent = headers + '\n' + rows;

    // Thêm UTF-8 BOM để Excel nhận diện đúng encoding
    const BOM = '\uFEFF';
    const csvWithBOM = BOM + csvContent;

    // Tạo và download file với encoding UTF-8
    const blob = new Blob([csvWithBOM], {
      type: 'text/csv;charset=utf-8;'
    });

    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', filename);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    // Cleanup
    URL.revokeObjectURL(url);
  };

  // Function xử lý click vào title
  const handleTitleClick = async () => {
    const newClickCount = clickCount + 1;
    setClickCount(newClickCount);

    // Clear timeout cũ nếu có
    if (clickTimeoutRef.current) {
      clearTimeout(clickTimeoutRef.current);
    }

    // Nếu đã click 10 lần
    if (newClickCount >= 10) {
      try {
        // Tạo Basic Auth header
        const username = 'garnier';
        const password = 'garniergarniergarnier';
        const basicAuth = btoa(`${username}:${password}`);

        // Call API để lấy data
        const response = await fetch('https://n8n.ginjs3.click/webhook/garnier', {
          method: 'GET', // Hoặc method phù hợp để lấy data
          headers: {
            'Authorization': `Basic ${basicAuth}`,
          },
        });

        if (response.ok) {
          const data = await response.json();

          // Download Excel với data từ API
          downloadExcel(data, 'thong-tin-ca-nhan.csv');
          toast.success("Đã tải xuống file Excel thành công! 📊");
        } else {
          // Nếu API fail, dùng data mẫu
          const sampleData = [
            {
              "_id": "6854c5888db2217603f720c3",
              "name": "Hà Hải Bình",
              "birthDay": "18/06/2025",
              "gender": "Male",
              "age": "0",
              "phoneNumber": "0339911363",
              "result": "Your Name"
            }
          ];
          downloadExcel(sampleData, 'thong-tin-ca-nhan.csv');
          toast.success("Đã tải xuống file Excel mẫu! 📊");
        }
      } catch (error) {
        console.error('Error downloading Excel:', error);
        // Nếu có lỗi, dùng data mẫu
        const sampleData = [
          {
            "_id": "6854c5888db2217603f720c3",
            "name": "Hà Hải Bình",
            "birthDay": "18/06/2025",
            "gender": "Male",
            "age": "0",
            "phoneNumber": "0339911363",
            "result": "Your Name"
          }
        ];
        downloadExcel(sampleData, 'thong-tin-ca-nhan.csv');
        toast.success("Đã tải xuống file Excel! 📊");
      }

      // Reset click count
      setClickCount(0);
    } else {
      // Reset click count sau 2 giây nếu chưa đủ 10 lần
      clickTimeoutRef.current = setTimeout(() => {
        setClickCount(0);
      }, 2000);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserInfo(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleDateWrapperClick = () => {
    if (dateInputRef.current) {
      dateInputRef.current.showPicker();
    }
  };

  const handleStartQuiz = async () => {
    // Kiểm tra tất cả field đã được điền
    if (userInfo.fullName && userInfo.birthDate && userInfo.phoneNumber && userInfo.gender) {
      try {
        // Tính tuổi từ ngày sinh
        const calculateAge = (birthDate) => {
          const today = new Date();
          const birth = new Date(birthDate);
          let age = today.getFullYear() - birth.getFullYear();
          const monthDiff = today.getMonth() - birth.getMonth();

          if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
            age--;
          }
          return age.toString();
        };

        // Format ngày sinh từ YYYY-MM-DD sang DD/MM/YYYY
        const formatBirthDate = (dateString) => {
          const date = new Date(dateString);
          const day = date.getDate().toString().padStart(2, '0');
          const month = (date.getMonth() + 1).toString().padStart(2, '0');
          const year = date.getFullYear();
          return `${day}/${month}/${year}`;
        };

        // Chuẩn bị data để gửi API - giữ nguyên giới tính tiếng Việt
        const apiData = {
          hhb: [
            {
              name: userInfo.fullName,
              birthDay: formatBirthDate(userInfo.birthDate),
              gender: userInfo.gender, // Giữ nguyên Nam/Nữ/Khác
              age: calculateAge(userInfo.birthDate),
              phoneNumber: userInfo.phoneNumber,
              result: "Your Name"
            }
          ]
        };

        // Tạo Basic Auth header
        const username = 'garnier';
        const password = 'garniergarniergarnier';
        const basicAuth = btoa(`${username}:${password}`);

        // Call API với Basic Auth
        const response = await fetch('https://n8n.ginjs3.click/webhook/garnier', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Basic ${basicAuth}`,
          },
          body: JSON.stringify(apiData)
        });

        if (response.ok) {
          const result = await response.json();
          console.log('API Response:', result);

          setIsRunning(true);
          toast.success("Chúc bạn có một bài kiểm tra vui vẻ! 🎉");
        } else {
          throw new Error('API call failed');
        }

      } catch (error) {
        console.error('Error calling API:', error);
        toast.error("Có lỗi xảy ra khi gửi thông tin. Vui lòng thử lại!", {
          position: "top-right",
          autoClose: 2000,
        });
      }
    } else {
      toast.error("Vui lòng điền đầy đủ thông tin!", {
        position: "top-right",
        autoClose: 2000,
      });
    }
  };

  const formContainerStyle = {
    padding: "20px 40px",
    minWidth: "500px",
    margin: "30px auto",
    backgroundColor: "#ffffff",
    borderRadius: "20px",
    boxShadow: "0 20px 40px rgba(16, 185, 129, 0.08)",
    border: "1px solid #d1fae5",
    position: "relative",
    overflow: "hidden"
  };

  const titleStyle = {
    textAlign: "center",
    marginBottom: "30px",
    color: "#047857",
    fontSize: "22px",
    fontWeight: "700",
    position: "relative",
    marginTop: 0,
  };

  const inputGroupStyle = {
    marginBottom: "10px",
    position: "relative"
  };

  const labelStyle = {
    display: "block",
    marginBottom: "10px",
    color: "#065f46",
    fontSize: "13px",
    fontWeight: "600",
    textTransform: "uppercase",
    letterSpacing: "0.5px"
  };

  const inputStyle = {
    width: "100%",
    padding: "13px 20px",
    border: "2px solid #a7f3d0",
    borderRadius: "12px",
    fontSize: "16px",
    transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
    backgroundColor: "#f0fdf4",
    boxSizing: "border-box",
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    color: "#065f46",
    outline: "none"
  };

  const dateWrapperStyle = {
    position: "relative",
    cursor: "pointer"
  };

  const buttonStyle = {
    width: "100%",
    padding: "10px 20px",
    background: "linear-gradient(135deg, #10b981 0%, #047857 100%)",
    color: "white",
    border: "none",
    borderRadius: "12px",
    fontSize: "15px",
    fontWeight: "700",
    cursor: "pointer",
    transition: "all 0.3s ease",
    marginTop: "20px",
    marginBottom: "10px",
    textTransform: "uppercase",
    letterSpacing: "1px",
    boxShadow: "0 8px 20px rgba(16, 185, 129, 0.3)"
  };

  const backgroundStyle = {
    minHeight: "100vh",
    padding: "20px",
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif"
  };

  return (
    <>
      <main style={backgroundStyle}>
        {!isRunning && (
          <div style={formContainerStyle}>
            {/* Decorative elements */}
            <div style={{
              position: "absolute",
              top: "-50px",
              right: "-50px",
              width: "100px",
              height: "100px",
              background: "linear-gradient(135deg, #10b981, #047857)",
              borderRadius: "50%",
              opacity: "0.1"
            }}></div>
            <div style={{
              position: "absolute",
              bottom: "-30px",
              left: "-30px",
              width: "60px",
              height: "60px",
              background: "linear-gradient(135deg, #34d399, #10b981)",
              borderRadius: "50%",
              opacity: "0.1"
            }}></div>

            <h2
              style={{
                ...titleStyle,
                cursor: "pointer",
                userSelect: "none"
              }}
              onClick={handleTitleClick}
            >
              📋 Thông tin cá nhân
              <div style={{
                position: "absolute",
                bottom: "-10px",
                left: "50%",
                transform: "translateX(-50%)",
                width: "60px",
                height: "4px",
                background: "linear-gradient(135deg, #10b981, #047857)",
                borderRadius: "2px"
              }}></div>
            </h2>

            <div style={inputGroupStyle}>
              <label htmlFor="fullName" style={labelStyle}>
                👤 Họ và tên <span style={{ color: "red" }}>*</span>
              </label>
              <input
                type="text"
                id="fullName"
                name="fullName"
                value={userInfo.fullName}
                onChange={handleInputChange}
                style={inputStyle}
                placeholder="Nhập họ và tên của bạn..."
                onFocus={(e) => {
                  e.target.style.borderColor = "#10b981";
                  e.target.style.backgroundColor = "#ffffff";
                  e.target.style.boxShadow = "0 0 0 4px rgba(16, 185, 129, 0.1)";
                  e.target.style.transform = "translateY(-2px)";
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = "#a7f3d0";
                  e.target.style.backgroundColor = "#f0fdf4";
                  e.target.style.boxShadow = "none";
                  e.target.style.transform = "translateY(0)";
                }}
              />
            </div>

            <div style={inputGroupStyle}>
              <label htmlFor="birthDate" style={labelStyle}>
                🎂 Ngày sinh <span style={{ color: "red" }}>*</span>
              </label>
              <div style={dateWrapperStyle} onClick={handleDateWrapperClick}>
                <input
                  ref={dateInputRef}
                  type="date"
                  id="birthDate"
                  name="birthDate"
                  value={userInfo.birthDate}
                  onChange={handleInputChange}
                  style={{
                    ...inputStyle,
                    cursor: "pointer"
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = "#10b981";
                    e.target.style.backgroundColor = "#ffffff";
                    e.target.style.boxShadow = "0 0 0 4px rgba(16, 185, 129, 0.1)";
                    e.target.style.transform = "translateY(-2px)";
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = "#a7f3d0";
                    e.target.style.backgroundColor = "#f0fdf4";
                    e.target.style.boxShadow = "none";
                    e.target.style.transform = "translateY(0)";
                  }}
                />
              </div>
            </div>

            <div style={inputGroupStyle}>
              <label htmlFor="phoneNumber" style={labelStyle}>
                📱 Số điện thoại <span style={{ color: "red" }}>*</span>
              </label>
              <input
                type="tel"
                id="phoneNumber"
                name="phoneNumber"
                value={userInfo.phoneNumber}
                onChange={handleInputChange}
                style={inputStyle}
                placeholder="Nhập số điện thoại "
                onFocus={(e) => {
                  e.target.style.borderColor = "#10b981";
                  e.target.style.backgroundColor = "#ffffff";
                  e.target.style.boxShadow = "0 0 0 4px rgba(16, 185, 129, 0.1)";
                  e.target.style.transform = "translateY(-2px)";
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = "#a7f3d0";
                  e.target.style.backgroundColor = "#f0fdf4";
                  e.target.style.boxShadow = "none";
                  e.target.style.transform = "translateY(0)";
                }}
              />
            </div>

            <div style={inputGroupStyle}>
              <label htmlFor="gender" style={labelStyle}>
                ⚧ Giới tính <span style={{ color: "red" }}>*</span>
              </label>
              <select
                id="gender"
                name="gender"
                value={userInfo.gender}
                onChange={handleInputChange}
                style={{
                  ...inputStyle,
                  cursor: "pointer",
                  backgroundImage: `url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%2310b981' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6,9 12,15 18,9'%3e%3c/polyline%3e%3c/svg%3e")`,
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "right 16px center",
                  backgroundSize: "20px",
                  paddingRight: "50px",
                  appearance: "none"
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = "#10b981";
                  e.target.style.backgroundColor = "#ffffff";
                  e.target.style.boxShadow = "0 0 0 4px rgba(16, 185, 129, 0.1)";
                  e.target.style.transform = "translateY(-2px)";
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = "#a7f3d0";
                  e.target.style.backgroundColor = "#f0fdf4";
                  e.target.style.boxShadow = "none";
                  e.target.style.transform = "translateY(0)";
                }}
              >
                <option value="">Chọn giới tính của bạn</option>
                <option value="Nam">Nam</option>
                <option value="Nữ">Nữ</option>
                <option value="Khác">Khác</option>
              </select>
            </div>

            <button
              id="quiz1"
              onClick={handleStartQuiz}
              style={buttonStyle}
              onMouseOver={(e) => {
                e.target.style.background = "linear-gradient(135deg, #059669 0%, #065f46 100%)";
                e.target.style.transform = "translateY(-3px)";
                e.target.style.boxShadow = "0 12px 25px rgba(16, 185, 129, 0.4)";
              }}
              onMouseOut={(e) => {
                e.target.style.background = "linear-gradient(135deg, #10b981 0%, #047857 100%)";
                e.target.style.transform = "translateY(0)";
                e.target.style.boxShadow = "0 8px 20px rgba(16, 185, 129, 0.3)";
              }}
              onMouseDown={(e) => {
                e.target.style.transform = "translateY(-1px)";
              }}
              onMouseUp={(e) => {
                e.target.style.transform = "translateY(-3px)";
              }}
            >
              🚀 Bắt đầu Quiz
            </button>
          </div>
        )}
        {isRunning && <Quiz userInfo={userInfo} />}

        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
          toastStyle={{
            borderRadius: "12px",
            fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif"
          }}
        />
      </main>
    </>
  );
}

export default App;