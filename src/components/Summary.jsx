import completeImg from "../assets/quiz-complete.png";

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
    console.log(`Câu ${index + 1}: text = ${answer.text}`);
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
  let resultCoat = '';
  let colorPalette = [];

  switch (mostFrequent) {
    case 'A':
      resultTitle = 'Bạn thuộc nhóm màu mùa Xuân';
      resultColors = 'Hồng san hô, cam sáng, vàng, xanh lá non';
      resultCoat = 'Màu be nhạt hoặc nâu';
      colorPalette = [
        '#F05E3B', // Đỏ cam
        '#FF7F6F', // Hồng san hô
        '#F28B35', // Cam sáng
        '#FFDD33', // Vàng
        '#F58F98', // Hồng đào
        '#7EC845', // Xanh lá non
        '#21B091', // Xanh ngọc
        '#DEB887', // Be nhạt
        '#FFB347', // Cam vàng
        '#A0522D', // Nâu
      ];
      break;
    case 'B':
      resultTitle = 'Bạn thuộc nhóm màu mùa Thu';
      resultColors = 'Màu gạch, vàng đậm, xanh lá mạ, màu khaki';
      resultCoat = 'Màu be trầm hoặc nâu';
      colorPalette = [
        '#BC4B29', // Màu gạch
        '#C8973C', // Vàng đậm
        '#477E2C', // Xanh lá mạ
        '#BDB76B', // Khaki
        '#8A6642', // Nâu nhạt
        '#6E260E', // Nâu đậm
        '#C19A6B', // Be trầm
        '#AF6E4D', // Nâu đất
        '#CD7F32', // Đồng
        '#78552B', // Nâu vàng
      ];
      break;
    case 'C':
      resultTitle = 'Bạn thuộc nhóm màu mùa Hạ';
      resultColors = 'Hồng nhạt, Pastel, xanh da trời, màu chàm, màu tím hoa cà';
      resultCoat = 'Màu Navy, xám';
      colorPalette = [
        '#FAB3C4', // Hồng nhạt
        '#B0E0E6', // Pastel xanh
        '#87CEFA', // Xanh da trời
        '#000080', // Navy
        '#9370DB', // Tím hoa cà
        '#4169E1', // Xanh dương
        '#6495ED', // Chàm
        '#778899', // Xám nhạt
        '#ADD8E6', // Xanh biển nhạt
        '#708090', // Xám chì
      ];
      break;
    case 'D':
      resultTitle = 'Bạn thuộc nhóm màu mùa Đông';
      resultColors = 'Đỏ thẫm, xanh, vàng chanh, Hồng Neon, xanh lá cây thẫm, màu đỏ bầm, màu đơn sắc';
      resultCoat = 'Navy, xám, đen';
      colorPalette = [
        '#800000', // Đỏ thẫm
        '#0000CD', // Xanh đậm
        '#DFFF00', // Vàng chanh
        '#FF6EC7', // Hồng neon
        '#006400', // Xanh lá thẫm
        '#8B0000', // Đỏ bầm
        '#000080', // Navy
        '#696969', // Xám
        '#000000', // Đen
        '#4B0082', // Tím đậm
      ];
      break;
    default:
      resultTitle = 'Không thể xác định nhóm màu';
      break;
  }

  const handleClick = () => {
    window.location.reload();
  }

  return (
    <div id="summary">
      <img src={completeImg} alt="Quiz Over" onClick={handleClick} style={{ cursor: 'pointer' }} />
      <h2>Kết quả</h2>
      
      <div id="result-stats">
        <p style={{ fontSize: '1.2rem' }}>{resultTitle}</p>
        <p>Bạn phù hợp với những màu như: <strong>{resultColors}</strong></p>
        <p>Màu áo khoác ngoài: <strong>{resultCoat}</strong></p>
        
        {colorPalette.length > 0 && (
          <div className="color-palette">
            {colorPalette.map((color, index) => (
              <div 
                key={index} 
                className="color-swatch" 
                style={{backgroundColor: color}}
              ></div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Summary;