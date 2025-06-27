import completeImg from "../assets/quiz-complete.png";
import { useEffect, useState } from "react";

// Import các hình ảnh từ assets
import milkCoffeeImg from "../assets/MILK_COFFEE.png"; // Nâu tây sáng
import cherryColaImg from "../assets/Cherry_cola.png"; // Cherry Cola
import charcoalLateImg from "../assets/CHARCOAL_LATTE.png"; // Xám khói xxx
import orangeColdBrewImg from "../assets/ORANGE_COLDBREW.png";  // Nâu ánh cam
import vanilaMilkShakeImg from "../assets/VANILLA_MILKSHAKE.png";  // Bạch kim xxx
import oceanMojitoImg from "../assets/OCEAN_MOJITO.png";  // Xanh đại dương xxx
import raspberryColdBrewImg from "../assets/RASPBERRY_COLD_BREW.png";  // Nâu ánh đỏ 
import brownMochaImg from "../assets/BROWN_MOCHA.png";  // Nâu mocha
import caramelBrownImg from "../assets/CARAMEL_BROWN.png";  // Nâu caramel xxx
import goldenBrownImg from "../assets/GOLDEN_BROWN.png";  // Nâu ánh vàng xxx
import plumRedImg from "../assets/PLUM_RED.png";  // Tím mận 
import raspberryRedImg from "../assets/RASPBERRY_RED.png";  // Đỏ mâm xôi xxx

import nauCaramel from "../assets/nauCaramel.png";
import nauBasic from "../assets/nauBasic.png";
import xamKhoi from "../assets/xamKhoi.png";
import xanhDaiDuong from "../assets/xanhDaiDuong.png";
import doMan from "../assets/doMan.png";
import nauAnhVang from "../assets/nauAnhVang.png";
import doMamXoi from "../assets/doMamXoi.png";
import bachKim from "../assets/bachKim.png";

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
      resultTitle = 'DEEP SPRING';
      resultColors = 'NGỌT NGÀO, TƯƠI TẮN VÀ TRẺ TRUNG';
      colorPalette = [
        "#eb4a20", // đỏ cam
        "#e2705a", // cam đất
        "#f29a45", // cam sáng
        "#ffee5a", // vàng nhạt
        "#ee6e82", // hồng dâu
        "#88bd5f", // xanh lá sáng
        "#40b68c", // xanh ngọc
        "#ddb06c", // vàng nâu nhạt
        "#f2b233", // vàng cam
        "#8c4c27"  // nâu đất
      ];
      colorImages = [
        // goldenBrownImg, // Nâu ánh vàng (7.3) =======
        // caramelBrownImg, // Nâu caramel (5.32)  ====
        // brownMochaImg, // Nâu Mocha (5.32 + 7.3) ====
        // milkCoffeeImg, // Nâu Tây Sáng (Ash Blonde + 7.3) 
        // vanilaMilkShakeImg, // Bạch kim

        nauCaramel,
        nauBasic,
        bachKim

      ];
      break;

    case 'B':
      resultTitle = 'DEEP SUMMER';
      resultColors = 'MÁT MẺ, TRẺ TRUNG VÀ NĂNG ĐỘNG';
      colorPalette = [
        "#e42928", // đỏ tươi
        "#e35d32", // cam đỏ
        "#eb7326", // cam sáng
        "#f5902a", // cam nhạt
        "#fedc3b", // vàng sáng
        "#808c3d", // xanh olive
        "#264e2c", // xanh rêu đậm
        "#d2ab6e", // vàng nâu
        "#a47741", // nâu nhạt
        "#74391f"  // nâu đất đậm
      ]
      colorImages = [
        // vanilaMilkShakeImg, // Bạch kim (Ash Blonde)
        // charcoalLateImg, // Xám khói (Cool Ash) 
        // plumRedImg, // Tím mận (6.26)  ==========
        // caramelBrownImg, // Nâu caramel (5.32) ==========

        bachKim,
        xamKhoi,
        nauCaramel
      ];
      break;

    case 'C':
      resultTitle = 'DEEP AUTUMN';
      resultColors = 'NHẸ NHÀNG, THANH LỊCH VÀ NHÃ NHẶN';
      colorPalette = [
        "#f3b4c1", // hồng nhạt
        "#e96fa2", // hồng đậm
        "#e7315f", // đỏ hồng
        "#f6f0c3", // vàng kem
        "#66bc97", // xanh ngọc nhạt
        "#74c1e3", // xanh dương nhạt
        "#9c94c4", // tím xanh pastel
        "#8e3c87", // tím đỏ
        "#466284", // xanh navy nhạt
        "#a4b3bb"  // xám xanh
      ];
      colorImages = [
        // goldenBrownImg, // Nâu ánh vàng (7.3) =========
        // raspberryRedImg, // Đỏ mâm xôi (7.65)  ============
        // caramelBrownImg, // Nâu caramel (5.32) ==========
        // brownMochaImg, // Nâu mocha (5.32 + 7.3)========
        // orangeColdBrewImg, // Nâu ánh cam (7.65 + 7.3) 

        nauAnhVang,
        doMamXoi,
        nauCaramel,
        // nauBasic,
      ];
      break;

    case 'D':
      resultTitle = 'DEEP WINTER';
      resultColors = 'SẮC SẢO, QUÝ PHÁI VÀ SANG TRỌNG';
      colorPalette = [
        "#e04579", // hồng tươi
        "#e50085", // hồng cánh sen
        "#b6002a", // đỏ đậm
        "#f5f59d", // vàng nhạt
        "#00994f", // xanh lá tươi
        "#003f35", // xanh lá đậm
        "#0046a1", // xanh lam hoàng gia
        "#1d2e5c", // xanh navy
        "#251918", // nâu đen
        "#ffffff"  // trắng
      ]
      colorImages = [
        // oceanMojitoImg, // Xanh đại dương (3.1)
        // charcoalLateImg, // Xám khói (Cool Ash)  
        // plumRedImg, // Tím mận (6.26) =====
        // cherryColaImg, // Cherry Cola (6.26 + 7.65)
        // raspberryColdBrewImg, // Nâu ánh đỏ (5.32 + 7.65) 

        xanhDaiDuong,
        xamKhoi,
        doMan,
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
        {/* <h2>Kết quả</h2> */}
        <h2>{resultTitle}</h2>

        <div id="result-stats">
          {/* <div className="result-title">{resultTitle}</div> */}
          <div className="result-subtitle">{resultColors}</div>

          <div className="main-color-section">
            <div className="main-color-label">MAIN COLOR</div>
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

          <div className="product-section">
            <div className="product-section-title">MÀU SẮC TÓC PHÙ HỢP VỚI BẠN LÀ</div>
            {colorImages.length > 0 && (
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
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Summary;