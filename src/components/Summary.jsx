import completeImg from "../assets/quiz-complete.png";
import { useEffect } from "react";

const Summary = ({ userAnswers }) => {
  // Đếm số lần chọn mỗi đáp án
  const answerCounts = {
    A: 0, // Đáp án đầu tiên
    B: 0, // Đáp án thứ hai
    C: 0, // Đáp án thứ ba
    D: 0  // Đáp án thứ tư
  };

  // Đếm số lượng câu trả lời cho mỗi vị trí
  userAnswers.forEach((answer, index) => {
    // Lấy ký tự đầu tiên của text để xác định đáp án (A, B, C, hoặc D)
    const firstChar = answer.text.charAt(0).toUpperCase();

    if (firstChar === 'A') answerCounts.A++;
    else if (firstChar === 'B') answerCounts.B++;
    else if (firstChar === 'C') answerCounts.C++;
    else if (firstChar === 'D') answerCounts.D++;
  });

  // Xác định đáp án được chọn nhiều nhất
  const mostFrequent = Object.keys(answerCounts).reduce((a, b) => {
    return answerCounts[a] > answerCounts[b] ? a : b;
  });

  // Kết quả dựa trên đáp án được chọn nhiều nhất
  let resultTitle = '';
  let resultColors = '';
  let colorPalette = [];

  switch (mostFrequent) {
    case 'A':
      resultTitle = 'Bạn thuộc nhóm màu Spring (Tươi sáng - Ấm áp)';
      resultColors = 'Những người thuộc nhóm màu này thường phù hợp với các tông màu nhẹ nhàng như hồng, hồng nhạt, cam đào hoặc các gam màu pastel. Đây là nhóm màu mang đặc trưng đại diện cho sự ngọt ngào, tươi tắn và trẻ trung. Bạn có thể dựa theo những đặc điểm này để lựa chọn kiểu tóc và phong cách makeup phù hợp với bản thân.';
      colorPalette = [
        '#b8860b', // Nâu ánh vàng (7.3)
        '#a9746e', // Nâu caramel (5.32)
        '#8b5f4d', // Nâu Mocha (5.32 + 7.3)
        '#c2b280', // Nâu Tây Sáng (Ash Blonde + 7.3)
        '#f8f8ff', // Bạch kim
      ];

      break;
    case 'B':
      resultTitle = 'Bạn thuộc nhóm màu Summer (Nhẹ nhàng - Lạnh)';
      resultColors = 'Những người thuộc nhóm màu này mang đến cảm giác năng động, trẻ trung nhưng cũng không kém phần tươi trẻ nên rất phù hợp với tone makeup cũng như các màu sắc mang trạng thái tương tự. Bạn có thể tham khảo các gam màu như xanh da trời, vàng chanh, hồng nhạt,...';
      colorPalette = [
        '#f0f0f0', // Bạch kim (Ash Blonde)
        '#a2a4a5', // Xám khói (Cool Ash)
        '#7d3b6a', // Tím mận (6.26)
        '#a9746e', // Nâu caramel (5.32)
      ];

      break;
    case 'C':
      resultTitle = 'Bạn thuộc nhóm màu Autumn (Trầm ấm - Sâu)';
      resultColors = 'Những người thuộc nhóm màu Autumn thiên về cảm giác nhẹ nhàng, thanh lịch và nhã nhặn. Sức hút và diện mạo của bạn sẽ được thăng hạng bội phần nếu bạn lựa chọn các gam màu như kem, nâu, olive đấy.';
      colorPalette = [
        '#c6904e', // Nâu ánh vàng (7.3)
        '#a24655', // Đỏ mâm xôi (7.65)
        '#a9746e', // Nâu caramel (5.32)
        '#8d5a4c', // Nâu mocha (5.32 + 7.3)
        '#cc704b', // Nâu ánh cam (7.65 + 7.3)
      ];

      break;
    case 'D':
      resultTitle = 'Bạn thuộc nhóm màu Winter (Tương phản cao - Lặng sâu)';
      resultColors = 'Những người thuộc nhóm màu này đại diện cho sự trầm lặng, sắc sảo nhưng vẫn toát lên tinh thần quý phái và sang trọng. Các gam màu như đỏ rượu, ghi, đen, xám sẽ là lựa chọn không nên bỏ qua cho những người thuộc nhóm màu này.';
      colorPalette = [
        '#1f3a4d', // Xanh đại dương (3.1)
        '#a2a4a5', // Xám khói (Cool Ash)
        '#7d3b6a', // Tím mận (6.26)
        '#912f46', // Cherry Cola (6.26 + 7.65)
        '#9c4b3f', // Nâu ánh đỏ (5.32 + 7.65)
      ];

      break;
    default:
      resultTitle = 'Không thể xác định nhóm màu';
      break;
  }

  // Hiệu ứng confetti xuất hiện sớm hơn và nổi bật
  useEffect(() => {
    const createConfetti = () => {
      const colors = [
        '#FF6B6B', '#4ECDC4', '#45B7D1', 
        '#96CEB4', '#FFEAA7', '#DDA0DD', 
        '#98D8C8', '#FFD700', '#FF1493',
        '#00FF7F', '#FF4500', '#8A2BE2'
      ]; // Thêm nhiều màu sắc nổi bật
      
      for (let i = 0; i < 40; i++) { // Tăng số lượng
        setTimeout(() => {
          const confetti = document.createElement('div');
          confetti.className = 'confetti';
          confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
          confetti.style.left = Math.random() * 100 + 'vw';
          confetti.style.animationDelay = Math.random() * 0.5 + 's'; // Giảm delay để xuất hiện sớm hơn
          confetti.style.animationDuration = (Math.random() * 2 + 2) + 's'; // Thời gian rơi ngắn hơn
          
          document.body.appendChild(confetti);

          // Tự động xóa sau 4 giây (ngắn hơn)
          setTimeout(() => {
            if (document.body.contains(confetti)) {
              document.body.removeChild(confetti);
            }
          }, 4000);
        }, i * 30); // Giảm khoảng cách thời gian giữa các confetti
      }
    };

    // Tạo confetti ngay lập tức khi component mount
    createConfetti();
    
    // Tạo thêm wave confetti sau 1 giây
    setTimeout(() => {
      createConfetti();
    }, 1000);

    // Cleanup khi component unmount
    return () => {
      const confettiElements = document.querySelectorAll('.confetti');
      confettiElements.forEach(el => {
        if (document.body.contains(el)) {
          document.body.removeChild(el);
        }
      });
    };
  }, []);

  const handleClick = () => {
    window.location.reload();
  }

  return (
    <div id="summary">
      <img src={completeImg} alt="Quiz Over" onClick={handleClick} style={{ cursor: 'pointer' }} />
      <h2>Kết quả</h2>

      <div id="result-stats">
        <p style={{ fontSize: '1.2rem' }}>{resultTitle}</p>
        <p><strong>{resultColors}</strong></p>

        {colorPalette.length > 0 && (
          <div className="color-palette">
            {colorPalette.map((color, index) => (
              <div
                key={index}
                className="color-swatch"
                style={{ backgroundColor: color }}
              ></div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Summary;