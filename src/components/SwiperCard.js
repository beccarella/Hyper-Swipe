import React, { useState, useEffect } from 'react';
import { Card, Button, Container } from 'react-bootstrap';

const url = 'https://hyper-swipe.herokuapp.com/cards';

const SwiperCard = () => {
  const [cardData, setCardData] = useState([]);
  const [, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true)
    fetch(url)
      .then(res => res.json())
      .then(cardData => {setCardData(cardData); setLoading(false)})
  },[]);

  const removeCard = id => {
    setCardData(cardData.filter(item => item.id !== id));
  };
  
  const handleBtnClick = (itemId, index) => {
    let clickedCard = cardData[index];
    localStorage.setItem(itemId, JSON.stringify(clickedCard));
    removeCard(itemId);
  };

  return (
    <div id="contentView">
        { cardData[0] ? (
          cardData.map((item, index) => {
            return(
              <Card key={index} className="cardContainer">
                <Container className="btnContainer">
                  <div className="btnWrapper">
                    <Button className="btn" onClick={() => { item.status='Disliked'; handleBtnClick(item.id, index) }}>DISLIKE</Button>
                  </div>
                </Container>
                <Container className="cardContentContainer">
                  <Card.Img className="mainCardImage"
                    variant="top" 
                    src={item.image} 
                    fluid="true" 
                  />
                  <Card.Body>
                    <Card.Title className="cardTitle">{item.title.toUpperCase()}</Card.Title>
                    <Card.Subtitle className="cardText">{item.body}</Card.Subtitle>
                  </Card.Body>
                </Container>
                <Container className="btnContainer">
                  <div className="btnWrapper">
                    <Button className="btn" onClick={() => { item.status='Liked'; handleBtnClick(item.id, index) }}>LIKE</Button>
                  </div>
                </Container>
              </Card>
            )
          })) : 
          <div>
            <h2>There are no more cards.</h2>
          </div>
      }
    </div>
  );
};

export default SwiperCard;