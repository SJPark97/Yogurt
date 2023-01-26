import React from 'react';
import { useParams } from 'react-router-dom';
import dummy from '../db/list.json';
import BackToTop from '../AppBar/BackToTop';

function GoodDetail() {
  const { postId } = useParams();
  const post = dummy.Goods.find(event => event.postId === Number(postId));

  return (
    <div>
      <BackToTop />
      hello
      {post.post_content}
      {post.post_title}
      {post.post_title}
      {post.post_title}
      {post.post_title}
      {post.post_title}
      {post.post_title}
      {post.post_title}
      {post.post_title}
    </div>
  );
}

export default GoodDetail;
