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

  return (
    <div id="contentView">
        { cardData[0] ? (
          cardData.map((item, index) => {
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
          })) : 
          <div>
            <div className="likedCardContainer">
              <h2>These are some of the things we have in common:</h2>
              <div className="likedCardContent">
                {likedItem.map((item, index) => {
                return(
                  <Card key={index} className="likedCard">
                    <Card.Img alt="item you liked" src={item.itemImg}/>
                    <Card.Body>
                      <Card.Title>{item.itemTitle}</Card.Title>
                    </Card.Body>
                  </Card>
                )})}
              </div>
            </div>
          </div>
      }
    </div>
  );
};

export default SwiperCard;