import { useState, useCallback, useEffect } from 'react';
import * as React from 'react';
import axios from 'axios';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import Category from './Category';
import './Category.css';

export default function CategoryList() {
  const [categoryId, setCategoryId] = useState(1);
  const [categoryData, setCategoryData] = useState([]);

  const getCategoryData = useCallback(async () => {
    await axios.get('https://i8b204.p.ssafy.io/be-api/cate/type').then(res => {
      // console.log(res.data, 'd');
      setCategoryData(res.data);
    });
  }, [setCategoryData]);

  useEffect(() => {
    getCategoryData();
  }, [getCategoryData]);

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
    ?.find(category => category.id === categoryId)
    ?.detail.map((sub, index) => {
      return sub.detail && sub.detail_image ? (
        <Category sub={sub} key={sub.detail} />
      ) : (
        <div key={index}></div>
      );
    });

  return (
    <div>
      <Divider />
      <div style={{ display: 'flex', height: '100vh' }}>
        <Box
          sx={{
            width: '30%',
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
            width: '70%',
            maxWidth: '100%',
            bgcolor: '#D9D9D9',
          }}
        >
          <nav aria-label="sub-category">
            {categoryData && <div className="categories">{subCategory}</div>}
          </nav>
        </Box>
      </div>
    </div>
  );
}
