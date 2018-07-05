/* A list that holds all of the cards */
var deckOfCards = [
  '<i class="fas fa-fish"></i>',
  '<i class="fas fa-fish"></i>',
  '<i class="fas fa-leaf"></i>',
  '<i class="fas fa-leaf"></i>',
  '<i class="fas fa-heart"></i>',
  '<i class="fas fa-heart"></i>',
  '<i class="fas fa-bell"></i>',
  '<i class="fas fa-bell"></i>',
  '<i class="fas fa-balance-scale"></i>',
  '<i class="fas fa-balance-scale"></i>',
  '<i class="fas fa-bicycle"></i>',
  '<i class="fas fa-bicycle"></i>',
  '<i class="fas fa-bolt"></i>',
  '<i class="fas fa-bolt"></i>',
  '<i class="fas fa-gem"></i>',
  '<i class="fas fa-gem"></i>',
];

/* --Displaying the cards on the page-- */

function shuffle(array) {
/* Function that shuffles the list of cards using the provided "shuffle" method below.  Shuffle function from http://stackoverflow.com/a/2450976 */
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }
    return array;
}

/* The shuffled deck of cards are assigned a variable */
var shuffledDeckOfCards = shuffle(deckOfCards);

function createHtmlCard(shuffledDeckOfCards) {
/*  Function that loops through each card and create its HTML */
  var htmlCard = '';

  for (var i = shuffledDeckOfCards.length - 1; i >= 0; i--) {
    htmlCard += '<li class = "card">' + shuffledDeckOfCards[i] + '</li>';
  }
  return htmlCard;
}

/*  Adds each card's HTML to the page */
$('.deck').html(createHtmlCard(shuffledDeckOfCards));

/* --When cards are clicked-- */

/* When a card is clicked, the card is opened and it's display is shown */
$('.deck .card').on('click', function() {
  $(this).addClass('.card show open');
});

/* When a card is clicked, it's added to a *list* of "open" cards */
var openCards = [];
$('.deck .card').on('click', function() {
  $('.card show open').each(function() {
    openCards.push($(this));
  });
});

if (openCards.length === 2) {
/* If the list of open cards already has another card, two cards are checked to see if they match */
  if (openCards[0] === openCards[1]) {
  /* If the cards do match, the cards are locked in the open position */
    $('.card show open').addClass('.card match').removeClass('.card show open');
  }
  else {
    /* If the cards do not match, the cards are removed from the list and the card's are put in the closed position */
    openCards.length = 0;
    $('.card show open').addClass('.deck .card').removeClass('.card show open');
  }
}

/* Function that restarts the game when the Restart button on the Score Panel is clicked */
$('.score-panel .restart').on('click', function() {
  var shuffledDeckOfCards = shuffle(deckOfCards);
  $('.deck').html(createHtmlCard(shuffledDeckOfCards));
  $('.deck .card').on('click', function() {
    $(this).addClass('.card show open');
  });
});

/*
 * set up the event listener for a card. If a card is clicked:
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
