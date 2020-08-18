import React, { useState, useEffect } from 'react';
import { Card, Button, Container } from 'react-bootstrap';

const url = 'https://hyper-swipe.herokuapp.com/cards';

const SwiperCard = () => {
  const [cardData, setCardData] = useState([]);
  const [loading, setLoading] = useState(false)
  const [likedItem, setLikedItem] = useState([]);
  const [dislikedItem, setDislikedItem] = useState([]);

  useEffect(() => {
    setLoading(true)
    fetch(url)
      .then(res => res.json())
      .then(cardData => {setCardData(cardData); setLoading(false)})
  },[]);

  const removeCard = id => {
    setCardData(cardData.filter(item => item.id !== id));
  };
  
  const handleLike = (itemId, itemImg, itemTitle) => {
    setLikedItem([...likedItem, {itemId, itemImg, itemTitle}]);
    removeCard(itemId);
  };

  const handleDislike = (itemId, itemImg, itemTitle) => {
    setDislikedItem([...dislikedItem, {itemId, itemImg, itemTitle}]);
    removeCard(itemId);
  };

  const cardItems = cardData.map((item, index) => {
    return(
      <Card key={index} className="cardContainer">
        <Container className="btnContainer">
          <div className="btnWrapper">
            <Button className="btn" onClick={() => handleDislike(item.id, item.image, item.title)}>DISLIKE</Button>
          </div>
        </Container>
        <Container className="cardContentContainer">
          <Card.Img style={{width: "18rem"}}
            variant="top" 
            src={item.image} 
            fluid="true" 
          />
          <Card.Body style={{width: "18rem"}}>
            <Card.Title className="cardTitle">{item.title.toUpperCase()}</Card.Title>
            <Card.Subtitle className="cardText">{item.body}</Card.Subtitle>
          </Card.Body>
        </Container>
        <Container className="btnContainer">
          <div className="btnWrapper">
            <Button className="btn" onClick={() => handleLike(item.id, item.image, item.title)}>LIKE</Button>
          </div>
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