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
  /* Function that loops through each card and create its HTML */
  var htmlCard = '';
  for (var i = shuffledDeckOfCards.length - 1; i >= 0; i--) {
    htmlCard += '<li class = "card">' + shuffledDeckOfCards[i] + '</li>';
  }
  return htmlCard;
}

/*  Adds each card's HTML to the page */
$('.deck').html(createHtmlCard(shuffledDeckOfCards));

/* --When cards are clicked-- */

var timer;
var threeStars;
var twoStars;
var oneStar;
$('.deck').one('click', function() {
  /* Function that starts the Timer in the Score Panel and Final Scoreboard when any part of the deck is clicked from the first time with help from https://stackoverflow.com/questions/5517597/ */
  var sec = 0;
  function pad ( val ) { return val > 9 ? val : "0" + val; }
  timer = setInterval( function(){
    $('.seconds').html(pad(++sec % 60));
    $('.minutes').html(pad(parseInt(sec / 60, 10)));
  }, 1000);
});

var openCards = [];
var matchedCards = [];
$('.deck .card').on('click', function() {
  /* Function that executes when a card is clicked:
    -  The Move Counter in the Score Panel and the Final Scoreboard is incremented and displayed with help from https://stackoverflow.com/questions/4701349/
    - The card is opened to display its picture
    - The card is added to a *list* of "open" cards */
  $('.score-panel .moves, .final-scoreboard .moves').html(function(i, val) { return + val + 1 });
  lowerStarRating();
  var openedCard = $(this).addClass('.card show open').children();
  openCards.push(openedCard);
  console.log("Length of openCards: " + openCards.length);
  console.log("openCards[0] before checkMatch method: " + openCards[0].attr('class'));
  console.log("openCards[1] before checkMatch method: " + openCards[1].attr('class'));
  if (openCards.length === 2) {
    /* If the list of open cards is two cards, the checkMatch function is executed to check if the two cards match */
    console.log("checkMatch has been called");
    checkMatch();
  } else {
    console.log("checkMatch has not been called");
  }
});

function lowerStarRating() {
  var moveCount = $('.score-panel .moves').html();
  console.log("moveCount: " + moveCount);
  /* Function that lowers Star Rating after a certain amount of Moves made by the user */
  if (moveCount >=21 && moveCount <= 25) {
    /* If Move count is between 21 and 25, Star Rating is 3 stars */
    console.log("3 stars");
    $('.star4').css('color', 'gray');
  } else if (moveCount >= 26 && moveCount <= 30) {
    /* If Move count is between 26 and 30, Star Rating is 2 stars */
    console.log("2 stars");
    $('.star3').css('color', 'gray');
  } else if (moveCount >= 31) {
    /* If Move count is greater than 30, Star Rating is 1 star */
    console.log("1 star");
    $('.star2').css('color', 'gray');
  } else {
    console.log("4 stars");
  }
}

function checkMatch() {
  /* Function that checks if the cards in the openCards list match */
  if (openCards[0].attr('class') === openCards[1].attr('class')) {
    /* If the cards match, the cards are locked in the open position, the cards are removed from the openCards list and are added to the matchedCards list. Code for bounceIn animation taken from https://robots.thoughtbot.com/css-animation-for-beginners */
    console.log("Cards match");
    $(openCards[0]).parent().removeClass('.card show open').addClass('.card match').css({'animation-name': 'bounceIn', 'animation-duration': '0.5s'});
    $(openCards[1]).parent().removeClass('.card show open').addClass('.card match').css({'animation-name': 'bounceIn', 'animation-duration': '0.5s'});
    matchedCards.push(openCards[0]);
    matchedCards.push(openCards[1]);
    openCards = [];
  } else {
    /* If the two cards do not match, the cards are flipped back in the closed position after 3 seconds and the cards are removed from the openCards list. Code for shake animation taken from https://www.w3schools.com/howto/howto_css_shake_image.asp */
    console.log("Cards do not match");
    setTimeout(flipCards, 250);
    setTimeout(function() { openCards = []; }, 250);
    console.log("Length of openCards: " + openCards.length);
  }
  if (matchedCards.length === 16) {
    /* if all the cards are matched, the Timer and timer for the Star Rating are stopped and the Final Scoreboard is displayed. */
    clearInterval(timer);
    clearTimeout(threeStars);
    clearTimeout(twoStars);
    clearTimeout(oneStar);
    $(".final-scoreboard").css('display', 'block');
  } else {
    console.log("Not all cards are matched");
  }
  console.log("openCards[0] after checkMatch method: " + openCards[0]); // Should be undefined
  console.log("openCards[1] after checkMatch method: " + openCards[1]); // Should be undefined
}

function flipCards() {
  /* Function that flips the open unmatched cards back closed */
  console.log("flipCards has been called");
  $(openCards[0]).parent().css('animation', 'shake 0.5s').removeClass('.card show open').addClass('.deck .card');
  $(openCards[1]).parent().css('animation', 'shake 0.5s').removeClass('.card show open').addClass('.deck .card');
}

/* --When the Restart button is clicked-- */

$('.score-panel .restart').on('click', function() {
/* Function that restarts the game when the Restart Button on the Score Panel is clicked */
  var shuffledDeckOfCards = shuffle(deckOfCards);
  $('.deck').html(createHtmlCard(shuffledDeckOfCards)); // Deck of cards is reshuffled

  $('.score-panel .moves, .final-scoreboard .moves').html(function(i, val) { return 0 }); // Move Counter resets to 0

  $('.star4, .star3, .star2').css('color', 'orange'); // Resets Star Rating to 3 Stars

  clearInterval(timer); // Stops Timer so it can be restarted when game is restarted

  $('.seconds, .minutes').html('00'); // Displays the Timer as 00:00

  $('.deck').one('click',function() { // Starts the Timer again when any part of the deck is clicked for the first time
    var sec = 0;
    function pad ( val ) { return val > 9 ? val : "0" + val; }
    timer = setInterval( function() {
      $('.seconds').html(pad(++sec % 60));
      $('.minutes').html(pad(parseInt(sec / 60, 10)));
    }, 1000);
  });

  $('.deck .card').on('click', function() {
    /*When a card is clicked, it's opened to display its picture and the Move Counter increments with each Move */
    $(this).addClass('.card show open');
    $('.moves').html(function(i, val) { return +val+1 });
    lowerStarRating(); // Lowers Star Rating after certain number of Moves
    var openedCard = $(this).addClass('.card show open').children();
    openCards.push(openedCard);
    console.log("Length of openCards: " + openCards.length);
    console.log("openCards[0] before checkMatch method: " + openCards[0].attr('class'));
    console.log("openCards[1] before checkMatch method: " + openCards[1].attr('class'));
    if (openCards.length === 2) {
      /* If the list of open cards is two cards, the checkMatch function is executed to check if the two cards match */
      console.log("checkMatch has been called");
      checkMatch();
    } else {
      console.log("checkMatch has not been called");
    }
  });
  function checkMatch() {
    /* Function that checks if the cards in the openCards list match */
    if (openCards[0].attr('class') === openCards[1].attr('class')) {
      /* If the cards match, the cards are locked in the open position, the cards are removed from the openCards list and are added to the matchedCards list. Code for bounceIn animation taken from https://robots.thoughtbot.com/css-animation-for-beginners */
      console.log("Cards match");
      $(openCards[0]).parent().removeClass('.card show open').addClass('.card match').css({'animation-name': 'bounceIn', 'animation-duration': '0.5s'});
      $(openCards[1]).parent().removeClass('.card show open').addClass('.card match').css({'animation-name': 'bounceIn', 'animation-duration': '0.5s'});
      matchedCards.push(openCards[0]);
      matchedCards.push(openCards[1]);
      openCards = [];
    } else {
      /* If the two cards do not match, the cards are flipped back in the closed position after 3 seconds and the cards are removed from the openCards list. Code for shake animation taken from https://www.w3schools.com/howto/howto_css_shake_image.asp */
      console.log("Cards do not match");
      setTimeout(flipCards, 250);
      setTimeout(function() { openCards = []; }, 250);
      console.log("Length of openCards: " + openCards.length);
    }
    if (matchedCards.length === 16) {
      /* if all the cards are matched, the Timer and timer for the Star Rating are stopped and the Final Scoreboard is displayed. */
      clearInterval(timer);
      clearTimeout(threeStars);
      clearTimeout(twoStars);
      clearTimeout(oneStar);
      $(".final-scoreboard").css('display', 'block');
    } else {
      console.log("Not all cards are matched");
    }
    console.log("openCards[0] after checkMatch method: " + openCards[0]); // Should be undefined
    console.log("openCards[1] after checkMatch method: " + openCards[1]); // Should be undefined
  }

  function flipCards() {
    /* Function that flips the open unmatched cards back closed */
    console.log("flipCards has been called");
    $(openCards[0]).parent().css('animation', 'shake 0.5s').removeClass('.card show open').addClass('.deck .card');
    $(openCards[1]).parent().css('animation', 'shake 0.5s').removeClass('.card show open').addClass('.deck .card');
  }
});
