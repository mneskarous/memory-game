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

/* When a card is clicked, the card is opened and its picture is shown */
$('.deck .card').on('click', function() {
  $(this).addClass('.card show open');
});

/* When a card is clicked, it's added to a *list* of "open" cards */
var openCards = [];
$('.deck .card').on('click', function() {
  openCards.push($(this).children());
});
console.log(openCards);

function checkMatch() {
/* Function that checks if the cards in the openCards list match */
  if (openCards.length === 2) {
  /* If the list of open cards is two cards, the cards are checked to see if they match */
    if (openCards[0] === openCards[1]) {
    /* If the cards match, the cards are locked in the open position */
      $('.card show open').addClass('.card match');
    }
    else {
      /* If the cards do not match, the cards are removed from the list and the card's are put in the closed position */
      $('.card show open').addClass('.deck .card').removeClass('.card show open');
      openCards.length = 0;
    }
  }
}

checkMatch(openCards)
console.log(checkMatch(openCards));

/* Function that increments the Move Counter in the Score Panel when a card is clicked and displays it on the page with help from https://stackoverflow.com/questions/4701349/ */
$('.deck .card').on('click', function() {
  $('.score-panel .moves').html(function(i, val) { return +val+1 });
});

/* Function that starts the Timer in the Score Panel when the first card is clicked with help from https://stackoverflow.com/questions/5517597/ */
$('.deck').one('click',function() {
  var sec = 0;
  function pad ( val ) { return val > 9 ? val : "0" + val; }
  setInterval( function(){
    $('#seconds').html(pad(++sec % 60));
    $('#minutes').html(pad(parseInt(sec / 60, 10)));
  }, 1000);
});

/*$('.deck').on('click', function() {
  $('#star3').css('color', 'gray');
});*/

/* Function that lowers the Star Rating after a certain amount of time */
/* $(document).ready(function() {
  var minutes = $('#minutes');

  if (minutes === 00) {
  /* Removes a star after 1 minute 
    $('#star3').css('color', 'gray');
  }

  if (minutes >= 02) {
  /* Removes a star after 2 minutes
    $('#star2').css('color', 'gray');
  }
});
*/

/* Function that restarts the game when the Restart Button on the Score Panel is clicked */
$('.score-panel .restart').on('click', function() {
/* When the Restart Button is clicked */
  var shuffledDeckOfCards = shuffle(deckOfCards);
  $('.deck').html(createHtmlCard(shuffledDeckOfCards));
  $('.deck .card').on('click', function() { // When card is clicked, it's opened
    $(this).addClass('.card show open');
  });
  $('.score-panel .moves').html(function(i, val) { return 0 }); // Move Counter reset to 0
  $('.deck .card').on('click', function() { // Move Counter increments with each move
      $('.moves').html(function(i, val) { return +val+1 });
  });

/* Need to reset timer
  var resetTimer = function () {
    clearInterval(pad)
  };

  $('.deck').one('click',function() { // Timer starts when first card is clicked
    var sec = 0;
    function pad ( val ) { return val > 9 ? val : "0" + val; }
    setInterval( function(){
        $("#seconds").html(pad(++sec % 60));
        $("#minutes").html(pad(parseInt(sec / 60, 10)));
    }, 1000);
  });
  */
});

/*
 * set up the event listener for a card. If a card is clicked:
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
