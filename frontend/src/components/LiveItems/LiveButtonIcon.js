import * as React from 'react';
import { useEffect, useCallback } from 'react';
import axios from 'axios';
import { useParams } from 'react-router';

export default function LiveButtonIcon() {
  const { liveId } = useParams();
  const [images, setImages] = React.useState(false);

  console.log(Number(liveId), 'chhhhhhhh');
  const getLiveInfo = useCallback(async () => {
    await axios
      .get('https://i8b204.p.ssafy.io/be-api/live/item', {
        params: {
          liveId: Number(liveId),
        },
      })
      .then(res => {
        console.log(res.data, 'getting data');
        // console.log(res.data.length)
        let imageList = [];
        res.data.forEach(d1 => {
          imageList.push(d1.postDetailResponse.postImages[0].url);
        });
        console.log(imageList, 'maded list');
        setImages(imageList.slice(0, 2));
      });
    // .catch(err => console.log(err.data, "errrr"));
  }, [setImages, liveId]);

  useEffect(() => {
    getLiveInfo();
  }, [getLiveInfo]);

  return (
    <div
      style={{
        position: 'relative',
        top: '-10vw',
        left: '-17vw',
      }}
    >
      {console.log(images, 'sjp')}
      {images && (
        <img
          style={{
            zIndex: '3',
            width: '48px',
            height: '48px',
            // top: '-3vw',
            // left: '-2vw',
            position: 'absolute',
          }}
          src={images[0]}
          alt="#"
        ></img>
      )}
      {images && (
        <img
          style={{
            zIndex: '2',
            top: '-2vw',
            left: '2vw',
            width: '48px',
            height: '48px',
            position: 'absolute',
          }}
          src={images[0]}
          alt="#"
        ></img>
      )}
      {images && (
        <img
          style={{
            zIndex: '1',
            top: '-4vw',
            left: '4vw',
            width: '48px',
            height: '48px',
            position: 'absolute',
          }}
          src={images[1]}
          alt="#"
        ></img>
      )}
    </div>
  );
}
