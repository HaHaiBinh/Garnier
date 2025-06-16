import completeImg from "../assets/quiz-complete.png";
import { useEffect, useState } from "react";

// Import các hình ảnh từ assets
import milkCoffeeImg from "../assets/MILK_COFFEE.png"; // Thay đổi đường dẫn thực tế
import cherryColaImg from "../assets/Cherry_cola.png";
import charcoalLateImg from "../assets/CHARCOAL_LATTE.png";
import orangeColdBrewImg from "../assets/ORANGE_COLDBREW.png";

const Summary = ({ userAnswers }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [loadingProgress, setLoadingProgress] = useState(0);

  // Hiệu ứng loading với progress bar
  useEffect(() => {
    const interval = setInterval(() => {
      setLoadingProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => setIsLoading(false), 200); // Thêm delay nhỏ sau khi hoàn thành
          return 100;
        }
        return prev + 2; // Tăng 2% mỗi 100ms = 5 giây để đạt 100%
      });
    }, 100);

    return () => clearInterval(interval);
  }, []);

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
  let colorImages = []; // Thêm mảng chứa hình ảnh

  switch (mostFrequent) {
    case 'A':
      resultTitle = 'Bạn thuộc nhóm màu Spring (Tươi sáng - Ấm áp)';
      resultColors = 'Những người thuộc nhóm màu này thường phù hợp với các tông màu nhẹ nhàng như hồng, hồng nhạt, cam đào hoặc các gam màu pastel. Đây là nhóm màu mang đặc trưng đại diện cho sự ngọt ngào, tươi tắn và trẻ trung. Bạn có thể dựa theo những đặc điểm này để lựa chọn kiểu tóc và phong cách makeup phù hợp với bản thân.';
      colorImages = [
        milkCoffeeImg,
        cherryColaImg,
        cherryColaImg,
        charcoalLateImg,
        orangeColdBrewImg
      ];
      break;

    case 'B':
      resultTitle = 'Bạn thuộc nhóm màu Summer (Nhẹ nhàng - Lạnh)';
      resultColors = 'Những người thuộc nhóm màu này mang đến cảm giác năng động, trẻ trung nhưng cũng không kém phần tươi trẻ nên rất phù hợp với tone makeup cũng như các màu sắc mang trạng thái tương tự. Bạn có thể tham khảo các gam màu như xanh da trời, vàng chanh, hồng nhạt,...';
      colorImages = [
        milkCoffeeImg,
        cherryColaImg,
        cherryColaImg,
        orangeColdBrewImg
      ];
      break;

    case 'C':
      resultTitle = 'Bạn thuộc nhóm màu Autumn (Trầm ấm - Sâu)';
      resultColors = 'Những người thuộc nhóm màu Autumn thiên về cảm giác nhẹ nhàng, thanh lịch và nhã nhặn. Sức hút và diện mạo của bạn sẽ được thăng hạng bội phần nếu bạn lựa chọn các gam màu như kem, nâu, olive đấy.';
      colorImages = [
        milkCoffeeImg,
        cherryColaImg,
        cherryColaImg,
        charcoalLateImg,
        orangeColdBrewImg
      ];
      break;

    case 'D':
      resultTitle = 'Bạn thuộc nhóm màu Winter (Tương phản cao - Lặng sâu)';
      resultColors = 'Những người thuộc nhóm màu này đại diện cho sự trầm lặng, sắc sảo nhưng vẫn toát lên tinh thần quý phái và sang trọng. Các gam màu như đỏ rượu, ghi, đen, xám sẽ là lựa chọn không nên bỏ qua cho những người thuộc nhóm màu này.';
      colorImages = [
        milkCoffeeImg,
        cherryColaImg,
        cherryColaImg,
        charcoalLateImg,
        orangeColdBrewImg
      ];
      break;

    default:
      resultTitle = 'Không thể xác định nhóm màu';
      break;
  }

  // Hiệu ứng confetti xuất hiện sau khi loading xong
  useEffect(() => {
    if (!isLoading) {
      const createConfetti = () => {
        const colors = [
          '#FF6B6B', '#4ECDC4', '#45B7D1',
          '#96CEB4', '#FFEAA7', '#DDA0DD',
          '#98D8C8', '#FFD700', '#FF1493',
          '#00FF7F', '#FF4500', '#8A2BE2'
        ];

        for (let i = 0; i < 40; i++) {
          setTimeout(() => {
            const confetti = document.createElement('div');
            confetti.className = 'confetti';
            confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            confetti.style.left = Math.random() * 100 + 'vw';
            confetti.style.animationDelay = Math.random() * 0.5 + 's';
            confetti.style.animationDuration = (Math.random() * 2 + 2) + 's';

            document.body.appendChild(confetti);

            setTimeout(() => {
              if (document.body.contains(confetti)) {
                document.body.removeChild(confetti);
              }
            }, 4000);
          }, i * 30);
        }
      };

      createConfetti();
      setTimeout(() => {
        createConfetti();
      }, 1000);
    }

    return () => {
      const confettiElements = document.querySelectorAll('.confetti');
      confettiElements.forEach(el => {
        if (document.body.contains(el)) {
          document.body.removeChild(el);
        }
      });
    };
  }, [isLoading]);

  const handleClick = () => {
    window.location.reload();
  }

  // Hiển thị loading screen
  if (isLoading) {
    return (
      <div id="loading-container">
        <div className="loading-content">
          <div className="loading-spinner"></div>
          <h2>Đang phân tích kết quả...</h2>
          <div className="loading-progress">
            <div className="progress-bar">
              <div 
                className="progress-fill" 
                style={{ width: `${loadingProgress}%` }}
              ></div>
            </div>
            <p>{Math.round(loadingProgress)}%</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <div id="summary">
        <img src={completeImg} alt="Quiz Over" onClick={handleClick} style={{ cursor: 'pointer' }} />
        <h2>Kết quả</h2>

        <div id="result-stats">
          <p style={{ fontSize: '1.2rem' }}>{resultTitle}</p>
          <p><strong>{resultColors}</strong></p>

          {
            colorImages.length > 0 && (
              <div className="img-gallery">
                {colorImages.map((image, index) => (
                  <div key={index}>
                    <img
                      src={image}
                      alt={`Color ${index + 1}`}
                    />
                  </div>
                ))}
              </div>
            )
          }
        </div>
      </div>

    </>
  );
};

export default Summary;