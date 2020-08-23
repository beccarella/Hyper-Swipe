import React, { useState, useEffect } from 'react';
import { Card, Button, Container } from 'react-bootstrap';

const url = 'https://hyper-swipe.herokuapp.com/cards';

const SwiperCard = () => {
  const [cardData, setCardData] = useState([]);
  const [, setLoading] = useState(false);

  const [clicked, setClicked] = useState(() => {
    const localData = localStorage.getItem('clicked');
    return localData ? JSON.parse(localData) : [];
  });

  useEffect(() => {
    localStorage.setItem('clicked', JSON.stringify(clicked))
  }, [clicked])

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
    setClicked([...clicked, JSON.stringify(clickedCard)]);
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
            {/* <div>
              {localStorage.getItem('clicked') !== null ? 
                clicked.map(card => {                  
                  return(
                    <Card key={card.id} className="likedCard">
                      <Card.Img alt="item you liked" src={card.image}/>
                      <Card.Body>
                        <Card.Title>{card.title}</Card.Title>
                      </Card.Body>
                    </Card>
                  ) 
                }) : ([])
              }
            </div> */}
          </div>
      }
    </div>
  );
};

export default SwiperCard;