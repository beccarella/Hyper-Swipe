import React, { useState, useEffect } from 'react';
import { Card, Button, Container } from 'react-bootstrap';

const url = 'https://hyper-swipe.herokuapp.com/cards';

const SwiperCard = () => {
  const [cardData, setCardData] = useState([]);
  const [loading, setLoading] = useState(false)

  const useLocalState = (likedItem) => {
    const [item, setState] = useState(localStorage.getItem(likedItem));

    const setLocal = (newItem) => {
      localStorage.setItem(likedItem, JSON.stringify(newItem));
      setState(newItem);
    }
    
    return [item, setLocal]; 
  };

  const [likedItem, setLikedItem] = useLocalState('Liked items', []);
  const [dislikedItem, setDislikedItem] = useLocalState('Disliked items',[]);


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
    setLikedItem([likedItem, {itemId, itemImg, itemTitle}]);
    removeCard(itemId);
  };

  const handleDislike = (itemId, itemImg, itemTitle) => {
    setDislikedItem([dislikedItem, {itemId, itemImg, itemTitle}]);
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
            <h2>There are no more cards.</h2>
          </div>
      }
    </div>
  );
};

export default SwiperCard;