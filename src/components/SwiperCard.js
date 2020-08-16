import React, { useState, useEffect } from 'react';
import { Card } from 'react-bootstrap';

const url = 'https://hyper-swipe.herokuapp.com/cards';

function SwiperCard() {
  const [cardData, setCardData] = useState([]);
  useEffect(() => {
    fetch(url)
      .then(res => res.json())
      .then(cardData => setCardData(cardData))
  });

  const cardItems = cardData.map((item, index) => {
    return(
      <Card key={index} style={{width: "18rem"}} className={"card"}>
        <Card.Img 
          variant="top" 
          src={item.image} 
          style={{width: "18rem"}}
          fluid="true" 
        />
        <Card.Body>
          <Card.Title>{item.title}</Card.Title>
          <Card.Subtitle>{item.body}</Card.Subtitle>
        </Card.Body>
      </Card>
    )
  });

  return (
    <div>
      {cardItems}
    </div>
  );
};

export default SwiperCard;