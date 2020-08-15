import React, { useState, useEffect } from 'react';

const url = 'https://hyper-swipe.herokuapp.com/cards';

function SwiperCard() {
  const [cardData, setCardData] = useState([]);
  useEffect(() => {
    fetch(url)
      .then(res => res.json())
      .then(res => setCardData({cardData: res}))
  });

  return (
  <div>
    {JSON.stringify(cardData)}
  </div>
  );
};

export default SwiperCard;