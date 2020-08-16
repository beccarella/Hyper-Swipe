import React, { useState, useEffect } from 'react';
import { Card, Button, Container } from 'react-bootstrap';

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
      <Card key={index} className="cardContainer">
        <Container className="btnContainer">
          <Button>DISLIKE</Button>
        </Container>
        <Container className="cardContentContainer">
          <Card.Img style={{width: "18rem"}}
            variant="top" 
            src={item.image} 
            fluid="true" 
          />
          <Card.Body style={{width: "18rem"}}>
            <Card.Title>{item.title}</Card.Title>
            <Card.Subtitle>{item.body}</Card.Subtitle>
          </Card.Body>
        </Container>
        <Container className="btnContainer">
          <Button>LIKE</Button>
        </Container>
      </Card>
    )
  });

  return (
      <div id="contentView">
        {cardItems}
      </div>
  );
};

export default SwiperCard;