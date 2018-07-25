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
  /* When any part of the deck is clicked, the page is scrolled to the Score Panel in case board is not properly aligned vertically with help from https://www.abeautifulsite.net/smoothly-scroll-to-an-element-without-a-jquery-plugin-2. */
  $('html, body').animate( {
    scrollTop: $(".score-panel").offset().top
  }, 100);
});

var openCards = [];
var matchedCards = [];
$('.deck .card').on('click', function() {
  /* Function that executes when a card is clicked:
    -  The Move Counter in the Score Panel and the Final Scoreboard is incremented and displayed with help from https://stackoverflow.com/questions/4701349/
    - The card is opened to display its picture
    - The card is added to a *list* of "open" cards */
  $('.score-panel .moves, .final-scoreboard .moves').html(function(i, val) { return + val + 1 });
  lowerStarRating(); // Function is called to lower the Star Rating after certain number of Moves
  /* When a card is clicked, it's opened to display its picture */
  var openedCard = $(this).addClass('.card open').children();
  openCards.push(openedCard);
  console.log("Length of openCards: " + openCards.length);
  console.log("openCards[0] before checkMatch method: " + openCards[0].attr('class'));
  console.log("openCards[1] before checkMatch method: " + openCards[1].attr('class'));
  console.log("openCards[0] class: " + openCards[0].attr('class'));
  console.log("openCards[0] class: " + openCards[1].attr('class'));
  console.log("openCards[0] id: " + openCards[0].attr('id'));
  console.log("openCards[0] id: " + openCards[1].attr('id'));
  if (openCards.length === 2) {
    /* If the list of open cards is two cards, the checkMatch() function is called to check if the two cards match */
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
  if (moveCount >=30 && moveCount <= 34) {
    /* If Move count is between 30 and 34, Star Rating is 3 stars */
    console.log("3 stars");
    $('.star4').css('color', 'gray');
  } else if (moveCount >= 35 && moveCount <= 39) {
    /* If Move count is between 35 and 39, Star Rating is 2 stars */
    console.log("2 stars");
    $('.star3').css('color', 'gray');
  } else if (moveCount >= 39) {
    /* If Move count is greater than 40, Star Rating is 1 star */
    console.log("1 star");
    $('.star2').css('color', 'gray');
  } else {
    /* If Move count is less than 30, Star Rating is 4 stars */
    console.log("4 stars");
  }
}

function checkMatch() {
  /* Function that checks if the cards in the openCards list match */
  if (openCards[0].attr('id') != openCards[1].attr('id')) {
    if (openCards[0].attr('class') === openCards[1].attr('class')) {
      /* If the cards match, the cards are locked in the open position, the cards are removed from the openCards list and are added to the matchedCards list. Code for bounceIn animation taken from https://robots.thoughtbot.com/css-animation-for-beginners */
      console.log("Cards match");
      $(openCards[0]).parent().removeClass('.card open').addClass('.card match').css({'animation-name': 'bounceIn', 'animation-duration': '0.5s'});
      $(openCards[1]).parent().removeClass('.card open').addClass('.card match').css({'animation-name': 'bounceIn', 'animation-duration': '0.5s'});
      matchedCards.push(openCards[0]);
      matchedCards.push(openCards[1]);
      openCards = [];
    } else {
      /* If the two cards do not match, the cards are flipped back in the closed position after 3 seconds and the cards are removed from the openCards list. Code for shake animation taken from https://www.w3schools.com/howto/howto_css_shake_image.asp */
      console.log("Cards do not match");
      setTimeout(flipCards, 500);
      setTimeout(function() { openCards = []; }, 500);
      console.log("Length of openCards: " + openCards.length);
    }
    if (matchedCards.length === 16) {
      /* if all the cards are matched, the Timer is stopped and the Final Scoreboard is displayed. */
      clearInterval(timer);
      $(".final-scoreboard").css('display', 'block');
    } else {
      console.log("Not all cards are matched");
    }
  } else {
    /* The same card is clicked twice */
    console.log("Same card clicked");
    $('.score-panel .moves, .final-scoreboard .moves').html(function(i, val) { return + val - 1 }); /* Move counter doesn't increment with second click */
  }
}

function flipCards() {
  /* Function that flips the open unmatched cards back closed */
  console.log("flipCards has been called");
  $(openCards[0]).parent().css('animation', 'shake 0.5s').removeClass('.card open').addClass('.deck .card');
  $(openCards[1]).parent().css('animation', 'shake 0.5s').removeClass('.card open').addClass('.deck .card');
}

/* --When the Restart button is clicked-- */

$('.score-panel .restart').on('click', function() {
/* Function that restarts the game when the Restart Button on the Score Panel is clicked */
  var shuffledDeckOfCards = shuffle(deckOfCards);
  $('.deck').html(createHtmlCard(shuffledDeckOfCards)); // Deck of cards is reshuffled

  $('.score-panel .moves, .final-scoreboard .moves').html(function(i, val) { return 0 }); // Move Counter resets to 0

  $('.star4, .star3, .star2').css('color', 'orange'); // Resets Star Rating to 4 Stars

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
    /*When a card is clicked, the Move Counter increments with each Move */
    $('.moves').html(function(i, val) { return +val+1 });
    lowerStarRating(); // Lowers Star Rating after certain number of Moves
    /* When a card is clicked, it's opened to display its picture */
    var openedCard = $(this).addClass('.card open').children();
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
});
