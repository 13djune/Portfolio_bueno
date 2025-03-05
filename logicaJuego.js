
// Function to create a standard deck of 52 cards
export function createDeck() {
    const suits = ["hearts", "diamonds", "clubs", "spades"];
    const ranks = [
      "A",
      "2",
      "3",
      "4",
      "5",
      "6",
      "7",
      "8",
      "9",
      "10",
      "J",
      "Q",
      "K",
    ];
    return suits.flatMap((suit) =>
      ranks.map((rank) => ({
        suit,
        rank,
        isFaceUp: false, // Cards are face down by default
      }))
    );
  }
  
  // Function to shuffle a deck of cards using Fisher-Yates algorithm
  export function shuffleDeck(deck) {
    const shuffledDeck = [...deck];
    for (let i = shuffledDeck.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledDeck[i], shuffledDeck[j]] = [shuffledDeck[j], shuffledDeck[i]];
    }
    return shuffledDeck;
  }
  
  // Function to deal cards to tableau piles
  export function dealToTableau(deck) {
    const tableau = Array.from({ length: 7 }, () => []);
    for (let i = 0; i < 7; i++) {
      for (let j = 0; j <= i; j++) {
        const card = deck.pop();
        card.isFaceUp = j === i; // Only the top card in each pile is face up
        tableau[i].push(card);
      }
    }
    return { tableau, remainingDeck: deck };
  }
  
  // Function to move a card from one pile to another
  export function moveCard(sourcePile, targetPile, cardIndex) {
    const cardsToMove = sourcePile.splice(cardIndex);
    targetPile.push(...cardsToMove);
    return { sourcePile, targetPile };
  }
  
  // Function to check if a card can be moved to a foundation pile
  export function canMoveToFoundation(card, foundationPile) {
    const values = { A: 1, "2": 2, "3": 3, "4": 4, "5": 5, "6": 6, "7": 7, "8": 8, "9": 9, "10": 10, J: 11, Q: 12, K: 13 };
    if (foundationPile.length === 0) {
      return card.rank === 'A';
    } else {
      const topCard = foundationPile[foundationPile.length - 1];
      return topCard.suit === card.suit && values[topCard.rank] === values[card.rank] - 1;
    }
  }
  
  // Function to check if a card can be moved to a tableau pile
  export function canMoveToTableau(card, tableauPile) {
    if (tableauPile.length === 0) {
      return card.rank === "K"; // Only kings can start an empty tableau pile
    }
    const topCard = tableauPile[tableauPile.length - 1];
    const rankOrder = [
      "A",
      "2",
      "3",
      "4",
      "5",
      "6",
      "7",
      "8",
      "9",
      "10",
      "J",
      "Q",
      "K",
    ];
    const isOppositeColor =
      (["hearts", "diamonds"].includes(card.suit) &&
        ["clubs", "spades"].includes(topCard.suit)) ||
      (["clubs", "spades"].includes(card.suit) &&
        ["hearts", "diamonds"].includes(topCard.suit));
    return (
      isOppositeColor &&
      rankOrder.indexOf(card.rank) === rankOrder.indexOf(topCard.rank) - 1
    );
  }
  
  // Function to flip the top card of a tableau pile
  export function flipTopCard(pile) {
    if (pile.length > 0) {
      const topCard = pile[pile.length - 1];
      topCard.isFaceUp = true;
    }
    return pile;
  }