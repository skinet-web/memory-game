import {React, useEffect, useState}  from "react";
import data from './Data.js';

function Card(props) {

    const [cardInfo, setCardInfo] = useState([])
    const [currentScore, setCurrentScore] = useState(0);
    const [lastClickedCard, setLastClickedCard] = useState([]);
    const [highScore, setHighScore]  = useState(0);

     useEffect(() =>{
        function cardInfoFunction (){
            setCardInfo(data.cards.map(card => ({
                id: card.id,
                name: card.name,
                image: card.image
            })));
        }
        cardInfoFunction()
    }, [])

    useEffect(() => {
        const highscore = localStorage.getItem('highscore');
        setHighScore(highscore || 0);
      }, []);

    const handleCardClick = (id) => {
        if (lastClickedCard.includes(id)) {
          setCurrentScore(0); // Reset score if the same card is clicked twice
          setLastClickedCard([]); // Clear the clicked cards array
        } else {
          const newScore = currentScore + 1;  
          setCurrentScore(newScore); // Increase score otherwise
          setLastClickedCard([...lastClickedCard, id]); // Add the clicked card's ID to the array
          if (newScore > highScore) {
            setHighScore(newScore); // Update high score if current score is higher
            localStorage.setItem('highscore', newScore) //  Set the highScore to localStorage
          }
        }        
      }
    // console.log(cardInfo)

    function checkWin(){
        if(currentScore === cardInfo.length){
            prompt('You won')
        }
    }


    //Using Fisher-Yates algorithm

   
    const shuffleCards = () => {
        setCardInfo(cards => {
          const shuffledCards = [...cards];
          
          for (let i = shuffledCards.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffledCards[i], shuffledCards[j]] = [shuffledCards[j], shuffledCards[i]];
          }
          console.log(shuffledCards)
          return shuffledCards;
        });
      };

    
    return ( 
        <div>
            <h1>Current score: {currentScore}</h1>
            <h1>Highscore: {highScore}</h1>
            <div className="container-Card" onClick={shuffleCards}>
        
            {cardInfo.map(card => (
                <div className="card-div" key={card.id} onClick={() => {
                    handleCardClick(card.id);
                    checkWin()
                }}>
                    <div>
                        <img src={card.image}/>
                    </div>
                    <h1>{card.name}</h1>
                </div>
            ))}
        </div>
        </div>
        
    )
}


export default Card;