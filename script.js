  document.getElementById('playButton').addEventListener('click', jugar);

  // Define the deck of cards
  const suits = ['hearts', 'diamonds', 'clubs', 'spades'];
  const values = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];
  const deck = [];

  for (let suit of suits) {
      for (let value of values) {
          deck.push({ suit, value });
      }
  }

  function jugar() {
      // Clear any previously displayed cards
      const cardsContainer = document.getElementById('card-container');
      if (cardsContainer) {
          cardsContainer.innerHTML = '';
      } else {
          console.error("Element with id 'card-container' not found");
          return;
      }

      // Initialize an empty array for the player's hand
      const playerHand = [];

      // For 5 times:
      for (let i = 0; i < 5; i++) {
          // Select a random card from the deck
          const randomIndex = Math.floor(Math.random() * deck.length);
          const selectedCard = deck[randomIndex];

          // Remove the selected card from the deck
          deck.splice(randomIndex, 1);

          // Add the card to the player's hand
          playerHand.push(selectedCard);

          // Display the card on the webpage
          displayCard(selectedCard);
      }

      // Check if the hand is a winning combination
      const isWinning = checkWinningHand(playerHand);

      // Display the result (win or lose)
      displayResult(isWinning);
  }

  function checkWinningHand(hand) {
      // Sort the hand by card value
      hand.sort((a, b) => values.indexOf(a.value) - values.indexOf(b.value));

      // Check for a pair
      for (let i = 0; i < hand.length - 1; i++) {
          if (hand[i].value === hand[i + 1].value) {
              return true;
          }
      }

      // Check for a flush (all cards of the same suit)
      if (hand.every(card => card.suit === hand[0].suit)) {
          return true;
      }

      // Check for a straight
      let isStraight = true;
      for (let i = 0; i < hand.length - 1; i++) {
          if (values.indexOf(hand[i + 1].value) - values.indexOf(hand[i].value) !== 1) {
              isStraight = false;
              break;
          }
      }
      if (isStraight) {
          return true;
      }

      // If no winning combination is found
      return false;
  }

function displayCard(card) {
  if (!card || typeof card !== 'object' || !card.value || !card.suit) {
      console.error('Invalid card object:', card);
      return;
  }

  // Create an image element for the card
  const cardImage = document.createElement('img');

  // Set the image source to the corresponding card image
  // Adjust the file name format to match the PNG files in the cards directory
  let cardValue = card.value.toLowerCase();
  if (cardValue === 'j') cardValue = 'jack';
  if (cardValue === 'q') cardValue = 'queen';
  if (cardValue === 'k') cardValue = 'king';
  if (cardValue === 'a') cardValue = 'ace';

  cardImage.src = `cards/${cardValue}_of_${card.suit}.png`;

  // Append the image to the designated area on the webpage
  const cardContainer = document.getElementById('card-container');
  if (cardContainer) {
      cardContainer.appendChild(cardImage);
  } else {
      console.error("Element with id 'card-container' not found");
  }
}

  function displayResult(isWinning) {
      const resultElement = document.getElementById('result');
      if (resultElement) {
          if (isWinning) {
              resultElement.textContent = 'Congratulations! You have a winning hand!';
              resultElement.style.color = 'green';
          } else {
              resultElement.textContent = 'Sorry, you don\'t have a winning hand. Try again!';
              resultElement.style.color = 'red';
          }
      } else {
          console.error("Element with id 'result' not found");
      }
  }
