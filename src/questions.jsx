import hinh1 from './assets/hinh1.png';
import hinh2 from './assets/hinh2.png';
import hinh3 from './assets/hinh3.png';
import hinh4 from './assets/hinh4.png';
import hinh5 from './assets/hinh5.png';
import hinh6 from './assets/hinh6.png';
import hinh7 from './assets/hinh7.png';
import hinh8 from './assets/hinh8.png';
import hinh9 from './assets/hinh9.png';
import hinh10 from './assets/hinh10.png';

// Import hình ảnh cho từng đáp án
import hinh1A from './assets/hinh1A.png';
import hinh1B from './assets/hinh1B.png';
import hinh1C from './assets/hinh1C.png';
import hinh1D from './assets/hinh1D.png';

import hinh2A from './assets/hinh2A.png';
import hinh2B from './assets/hinh2B.jpg';
import hinh2C from './assets/hinh2C.jpg';
import hinh2D from './assets/hinh2D.png';

import hinh3A from './assets/hinh3A.jpg';
import hinh3B from './assets/hinh3B.jpg';
import hinh3C from './assets/hinh3C.jpg';
import hinh3D from './assets/hinh3D.jpg';

import hinh4A from './assets/hinh4A.jpg';
import hinh4B from './assets/hinh4B.png';
import hinh4C from './assets/hinh4C.png';
import hinh4D from './assets/hinh4D.jpg';

import hinh5A from './assets/hinh5A.jpg';
import hinh5B from './assets/hinh5B.png';
import hinh5C from './assets/hinh5C.jpg';
import hinh5D from './assets/hinh5D.jpg';

import hinh6A from './assets/hinh6A.jpg';
import hinh6B from './assets/hinh6B.jpg';
import hinh6C from './assets/hinh6C.jpg';
import hinh6D from './assets/hinh6D.jpg';

export default [
  {
    id: 'q1',
    text: 'Câu 1: Màu mắt của bạn có màu gì? Chọn một trong những đáp án đúng hoặc gần đúng nhất về màu mắt của bạn',
    image: hinh1,
    answers: [
      {
        text: 'A. Màu nâu sáng pha ánh đen.',
        image: hinh1A
      },
      {
        text: 'B. Mắt màu nâu đen hoặc đen.',
        image: hinh1B
      },
      {
        text: 'C. Màu nâu pha ánh đỏ đồng.',
        image: hinh1C
      },
      {
        text: 'D. Màu nâu pha ánh đỏ.',
        image: hinh1D
      },
    ],
  },
  {
    id: 'q2',
    text: 'Câu 2: Màu da skintone của bạn có màu sắc như thế nào?',
    image: hinh2,
    // answers: [
    //   'A. Da có màu hồng hoặc trắng hồng.',
    //   'B. Da màu trắng hoặc trắng hồng.',
    //   'C. Màu da trắng vàng hoặc hoặc hơi ngăm.',
    //   'D. Màu da sáng hồng.',
    // ],
    answers: [
      {
        text: 'A. Da có màu hồng hoặc trắng hồng.',
        image: hinh2A
      },
      {
        text: 'B. Da màu trắng hoặc trắng hồng.',
        image: hinh2B
      },
      {
        text: 'C. Màu da trắng vàng hoặc hoặc hơi ngăm.',
        image: hinh2C
      },
      {
        text: 'D. Màu da sáng hồng.',
        image: hinh2D
      }
      // 'A. Da có màu hồng hoặc trắng hồng.',
      // 'B. Da màu trắng hoặc trắng hồng.',
      // 'C. Màu da trắng vàng hoặc hoặc hơi ngăm.',
      // 'D. Màu da sáng hồng.',
    ],
  },
  {
    id: 'q3',
    text: 'Câu 3: Màu da undertone của bạn có màu sắc như thế nào? Quan sát phần tĩnh mạch ở cổ tay và chọn đáp áp đúng nhất trong các đáp án sau:',
    image: hinh3,
    // answers: [
    //   'A. Mạch máu có màu xanh lá nhạt',
    //   'B. Mạch máu có màu xanh dương pha tím',
    //   'C. Mạch máu có màu xanh lá pha tím',
    //   'D. Mạch máu có màu xanh dương hoặc tím',
    // ],
    answers: [
      {
        text: 'A. Mạch máu có màu xanh lá nhạt',
        image: hinh3A
      },
      {
        text: 'B. Mạch máu có màu xanh dương pha tím',
        image: hinh3B
      },
      {
        text: 'C. Mạch máu có màu xanh lá pha tím',
        image: hinh3C
      },
      {
        text: 'D. Mạch máu có màu xanh dương hoặc tím',
        image: hinh3D
      }
    ],
  },
  {
    id: 'q4',
    text: 'Câu 4: Khi bị cháy nắng, da của bạn có sự thay đổi như thế nào?',
    image: hinh4,
    // answers: [
    //   'A. Da dễ bị bắt nắng nhưng nhanh chóng hồi phục và nhả nắng sau một thời gian ngắn.',
    //   'B. Da dễ bắt nắng nhưng khó hồi phục, bị sạm đen trong thời gian dài.',
    //   'C. Da ửng đỏ lên khi bắt nắng nhưng khó cháy nắng.',
    //   'D. Da đỏ ửng lên khi tiếp xúc với ánh nắng và dễ cháy nắng.',
    // ],
    answers: [
      {
        text: 'A. Da dễ bị bắt nắng nhưng nhanh chóng hồi phục và nhả nắng sau một thời gian ngắn.',
        image: hinh4A
      },
      {
        text: 'B. Da dễ bắt nắng nhưng khó hồi phục, bị sạm đen trong thời gian dài.',
        image: hinh4B
      },
      {
        text: 'C. Da ửng đỏ lên khi bắt nắng nhưng khó cháy nắng.',
        image: hinh4C
      },
      {
        text: 'D. Da đỏ ửng lên khi tiếp xúc với ánh nắng và dễ cháy nắng.',
        image: hinh4D
      }
    ],
  },
  {
    id: 'q5',
    text: 'Câu 5: Màu son nào giúp bạn trông rạng rỡ nhất?',
    image: hinh5,
    // answers: [
    //   'A. Các màu ấm áp, sáng như san hô, hồng đào, đỏ cam.',
    //   'B. Các màu dịu mát, hồng phấn, hồng cánh sen, màu berry nhạt.',
    //   'C. Các màu đất, đỏ gạch, nâu đỏ, cam đất, đỏ cam trầm.',
    //   'D. Các màu đậm, lạnh như đỏ ruby, hồng fuschia, đỏ mận, đỏ rượu vang.',
    // ],
    answers: [
      {
        text: 'A. Các màu ấm áp, sáng như san hô, hồng đào, đỏ cam.',
        image: hinh5A
      },
      {
        text: 'B. Các màu dịu mát, hồng phấn, hồng cánh sen, màu berry nhạt.',
        image: hinh5B
      },
      {
        text: 'C. Các màu đất, đỏ gạch, nâu đỏ, cam đất, đỏ cam trầm.',
        image: hinh5C
      },
      {
        text: 'D. Các màu đậm, lạnh như đỏ ruby, hồng fuschia, đỏ mận, đỏ rượu vang.',
        image: hinh5D
      }
    ],
  },
  // {
  //   id: 'q6',
  //   text: 'Câu 6: Màu son nào khiến da bạn xỉn màu, mọi người thường nhận xét là không phù hợp với bạn?',
  //   image: hinh6,
  //   answers: [
  //     'A. Các màu son đậm như đỏ rượu vang, đỏ cherry.',
  //     'B. Son màu hồng.',
  //     'C. Màu hồng cam.',
  //     'D. Màu cam nhạt, các màu son nude.',
  //   ],
  // },
  // {
  //   id: 'q7',
  //   text: 'Câu 7: Khi diện các màu trung tính như be hoặc xám, trông bạn sẽ như thế nào?',
  //   image: hinh7,
  //   answers: [
  //     'A. Khuôn mặt trông tươi sáng và tràn đầy sức sống hơn khi diện đồ be.',
  //     'B. Không có nhiều sự khác biệt, diện đồ màu be hay xám trông khá giản dị.',
  //     'C. Trang phục màu xám giúp tôn da và nổi bật hơn màu be.',
  //     'D. Trang phục màu xám khiến đường nét gương mặt trông đậm nét, nổi bật hơn.',
  //   ],
  // },
  // {
  //   id: 'q8',
  //   text: 'Câu 8: Bạn trông trắng sáng, tôn da hơn khi diện trang phục có màu sắc như thế nào?',
  //   image: hinh8,
  //   answers: [
  //     'A. Trang phục có màu nhạt, gam màu nhẹ nhàng, không quá nổi bật',
  //     'B. Trang phục có màu sắc tươi sáng, tự nhiên',
  //     'C. Trang phục có màu hơi trầm',
  //     'D. Trang phục có màu đậm',
  //   ],
  // },
  {
    id: 'q6',
    text: 'Câu 6: Trang sức nào phù hợp với bạn nhất?',
    image: hinh9,
    // answers: [
    //   'A. Các món trang sức vàng lấp lánh.',
    //   'B. Trang sức vàng đậm, vàng mờ hoặc ánh đồng nhẹ.',
    //   'C. Trang sức có màu bạc, bạch kim ánh nhẹ.',
    //   'D. Trang sức màu bạc hoặc bạch kim sáng bóng.',
    // ],
    answers: [
      {
        text: 'A. Các món trang sức vàng lấp lánh.',
        image: hinh6A
      },
      {
        text: 'B. Trang sức vàng đậm, vàng mờ hoặc ánh đồng nhẹ.',
        image: hinh6B
      },
      {
        text: 'C. Trang sức có màu bạc, bạch kim ánh nhẹ.',
        image: hinh6C
      },
      {
        text: 'D. Trang sức màu bạc hoặc bạch kim sáng bóng.',
        image: hinh6D
      }
    ],
  },
  // {
  //   id: 'q10',
  //   text: 'Câu 10: Mọi người xung quanh thường nhận xét như thế nào về ngoại hình của bạn?',
  //   image: hinh10,
  //   answers: [
  //     'A. Ngoại hình trong trẻo, đáng yêu, mang đến cảm giác tươi tắn, trẻ hơn so với tuổi',
  //     'B. Ngoại hình mang đến cảm giác điềm đạm, chững chạc nhưng vẫn tự nhiên',
  //     'C. Ngoại hình tạo thiện cảm thanh lịch, dễ chịu, đoan trang',
  //     'D. Ngoại hình trông sắc sảo, cá tính và lôi cuốn',
  //   ],
  // },
];
