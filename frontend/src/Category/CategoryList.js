// 이미 저장되어있는 카테고리 리스트를 받아와야함
// 대분류 카테고리들의 버튼이 눌리면 그에 맞는 소분류 카테고리들이 나오게 만들어야함

import { useState } from 'react';
import * as React from 'react';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import Category from './Category';
import './Category.css';

const categoryData = [
  {
    id: 0,
    name: '상의',
    sub: [
      {
        id: 0,
        name: '반팔',
        image:
          'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRiH-hZo-vjt-_EODPXxbF50svqXA9nrMorWQ&usqp=CAU',
      },
      {
        id: 1,
        name: '긴팔',
        image:
          'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ82nGbcIUp6yKucy_eQMTW9CdLPaqAQwixaDT0kXCva5rP8EtDqIB84c5Ql41dSOJ0tEo&usqp=CAU',
      },
      {
        id: 3,
        name: `맨투맨/스웨트셔츠`,
        image:
          'https://search.pstatic.net/sunny/?src=https%3A%2F%2Fi.pinimg.com%2Foriginals%2F4b%2Ff0%2Fd0%2F4bf0d05ac89191a0d92db043fb7e9357.jpg&type=a340',
      },
      {
        id: 4,
        name: '니트',
        image:
          'https://search.pstatic.net/common/?src=http%3A%2F%2Fshopping.phinf.naver.net%2Fmain_3667226%2F36672261153.20221221145918.jpg&type=a340',
      },
      {
        id: 5,
        name: '셔츠',
        image:
          'https://search.pstatic.net/common/?src=http%3A%2F%2Fshop1.phinf.naver.net%2F20220223_157%2F1645605981751BbbpI_JPEG%2F53070506579860337_692000650.jpg&type=a340',
      },
      {
        id: 6,
        name: '기타 상의',
        image:
          'https://search.pstatic.net/common/?src=https%3A%2F%2Fshopping-phinf.pstatic.net%2Fmain_3606971%2F36069713937.jpg&type=a340',
      },
      {
        id: 7,
        name: '기타 상의',
        image:
          'https://search.pstatic.net/common/?src=https%3A%2F%2Fshopping-phinf.pstatic.net%2Fmain_3606971%2F36069713937.jpg&type=a340',
      },
      {
        id: 8,
        name: '기타 상의',
        image:
          'https://search.pstatic.net/common/?src=https%3A%2F%2Fshopping-phinf.pstatic.net%2Fmain_3606971%2F36069713937.jpg&type=a340',
      },
    ],
  },
  {
    id: 1,
    name: '아우터',
    sub: [
      {
        id: 0,
        name: '후드 집업',
        image:
          'https://search.pstatic.net/common/?src=http%3A%2F%2Fshop1.phinf.naver.net%2F20221228_33%2F16722152402022Czg1_JPEG%2F2147127837_0_600.jpg&type=a340',
      },
      {
        id: 1,
        name: '블루종',
        image:
          'https://search.pstatic.net/common/?src=http%3A%2F%2Fshop1.phinf.naver.net%2F20221205_56%2F16701722204081fK5g_JPEG%2F71308054226665375_875207163.jpg&type=a340',
      },
      {
        id: 2,
        name: '레더 재킷',
        image:
          'https://search.pstatic.net/common/?src=http%3A%2F%2Fshopping.phinf.naver.net%2Fmain_3674240%2F36742409978.20221224130307.jpg&type=a340',
      },
      {
        id: 3,
        name: '트러커 재킷',
        image:
          'https://search.pstatic.net/common/?src=http%3A%2F%2Fshop1.phinf.naver.net%2F20220303_150%2F1646279573131nRRSI_JPEG%2F47415356836532116_1540376694.jpg&type=a340',
      },
      {
        id: 4,
        name: '카디건',
        image:
          'https://search.pstatic.net/common/?src=http%3A%2F%2Fshop1.phinf.naver.net%2F20221128_256%2F1669604414874cY6HN_JPEG%2F70740310598819199_1082309636.jpg&type=a340',
      },
      {
        id: 5,
        name: '기타 아우터',
        image:
          'https://search.pstatic.net/common/?src=http%3A%2F%2Fshop1.phinf.naver.net%2F20220916_277%2F1663257525382TXrT1_JPEG%2F32262477_W.jpg&type=a340',
      },
    ],
  },
  {
    id: 2,
    name: '바지',
    sub: [
      {
        id: 0,
        name: '데님 팬츠',
        image:
          'https://search.pstatic.net/sunny/?src=https%3A%2F%2Fscontent-nrt1-1.cdninstagram.com%2Fv%2Ft51.2885-15%2Fe35%2Fs1080x1080%2F246469545_137401008628245_724683264266084652_n.jpg%3F_nc_ht%3Dscontent-nrt1-1.cdninstagram.com%26_nc_cat%3D109%26_nc_ohc%3DDHfOdutkLlcAX9_msZU%26edm%3DAABBvjUBAAAA%26ccb%3D7-4%26oh%3D6cbada4db850534b0dae2520b579830a%26oe%3D61779524%26_nc_sid%3D83d603&type=a340',
      },
      {
        id: 1,
        name: '코튼 팬츠',
        image:
          'https://search.pstatic.net/common/?src=https%3A%2F%2Fshopping-phinf.pstatic.net%2Fmain_8178709%2F81787093164.jpg&type=a340',
      },
      {
        id: 2,
        name: '슈트 팬츠/슬랙스',
        image:
          'https://search.pstatic.net/common/?src=http%3A%2F%2Fshop1.phinf.naver.net%2F20221228_115%2F1672205188269h1J9q_JPEG%2F1000x1000.jpg&type=a340',
      },
      {
        id: 3,
        name: '트레이닝/조거 팬츠',
        image:
          'https://search.pstatic.net/common/?src=http%3A%2F%2Fshop1.phinf.naver.net%2F20230113_57%2F1673597628561VOw40_JPEG%2FINcAR_107051_7.jpg&type=a340',
      },
      {
        id: 4,
        name: '숏팬츠',
        image:
          'https://search.pstatic.net/common/?src=http%3A%2F%2Fshop1.phinf.naver.net%2F20220930_184%2F1664473963618Fvdfr_JPEG%2F65609747333386044_1600721968.jpg&type=a340',
      },
      {
        id: 5,
        name: '기타 바지',
        image:
          'https://search.pstatic.net/common/?src=https%3A%2F%2Fshopping-phinf.pstatic.net%2Fmain_3511421%2F35114216767.20221007185351.jpg&type=a340',
      },
    ],
  },
  {
    id: 3,
    name: '신발',
    sub: [
      {
        id: 0,
        name: '구두',
        image:
          'https://search.pstatic.net/common/?src=http%3A%2F%2Fshop1.phinf.naver.net%2F20221231_248%2F1672415835834pLEL0_JPEG%2F73551663666214806_355242924.jpg&type=a340',
      },
      {
        id: 1,
        name: '로퍼',
        image:
          'https://search.pstatic.net/common/?src=http%3A%2F%2Fshopping.phinf.naver.net%2Fmain_3351520%2F33515203395.20220715170154.jpg&type=a340',
      },
      {
        id: 2,
        name: '플랫 슈즈',
        image:
          'https://search.pstatic.net/common/?src=https%3A%2F%2Fshopping-phinf.pstatic.net%2Fmain_2641741%2F26417419837.jpg&type=a340',
      },
      {
        id: 3,
        name: '샌들',
        image:
          'https://search.pstatic.net/common/?src=https%3A%2F%2Fshopping-phinf.pstatic.net%2Fmain_8206434%2F82064349427.2.jpg&type=a340',
      },
      {
        id: 4,
        name: '블로퍼',
        image:
          'https://search.pstatic.net/common/?src=https%3A%2F%2Fshopping-phinf.pstatic.net%2Fmain_1825799%2F18257997896.jpg&type=a340',
      },
      {
        id: 5,
        name: '신발 용품',
        image:
          'https://search.pstatic.net/common/?src=http%3A%2F%2Fshop1.phinf.naver.net%2F20230103_223%2F1672731257914Xm2A3_JPEG%2F73867041625180378_1822182352.jpg&type=a340',
      },
    ],
  },
];

function CategoryList() {
  const [categoryId, setCategoryId] = useState(0);

  const categoryName = categoryData.map(category =>
    category.id === categoryId ? (
      <ListItem
        disablePadding
        key={category.id}
        onClick={() => {
          setCategoryId(category.id);
        }}
        sx={{ background: '#d9d9d9' }}
      >
        <ListItemButton>
          <ListItemText primary={category.name} />
        </ListItemButton>
      </ListItem>
    ) : (
      <ListItem
        disablePadding
        key={category.id}
        onClick={() => {
          setCategoryId(category.id);
        }}
      >
        <ListItemButton>
          <ListItemText primary={category.name} />
        </ListItemButton>
      </ListItem>
    ),
  );
  // map 할때 키값 index 불가능해서 id 값 받기
  const subCategory = categoryData
    .find(category => category.id === categoryId)
    .sub.map(sub => <Category sub={sub} key={sub.id} />);

  return (
    <div>
      <Divider />
      <div style={{ display: 'flex', height: '100vh' }}>
        <Box
          sx={{
            width: '26.66666%',
            maxWidth: 360,
            bgcolor: 'background.paper',
          }}
        >
          <nav aria-label="category-name">
            <List sx={{ padding: 0 }}>{categoryName}</List>
          </nav>
        </Box>
        <Box
          sx={{
            width: '73.33334%',
            maxWidth: '100%',
            bgcolor: '#D9D9D9',
          }}
        >
          <nav aria-label="sub-category">
            <div className="categories">{subCategory}</div>
          </nav>
        </Box>
      </div>
    </div>
  );
}

export default CategoryList;
