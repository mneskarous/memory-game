/* An array that holds all of the cards */
const deckOfCards = [
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
  /* Function that shuffles the array of cards using the provided "shuffle" method below with code from http://stackoverflow.com/a/2450976 */
  let currentIndex = array.length, temporaryValue, randomIndex;
  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }
  return array;
}

/* The shuffled deck of cards is assigned a constant */
const shuffledDeckOfCards = shuffle(deckOfCards);
function createHtmlCard(shuffledDeckOfCards) {
  /* Function that iterates through each card and creates its HTML */
  let htmlCard = '';
  for (let i = shuffledDeckOfCards.length - 1; i >= 0; i--) {
    htmlCard += '<li class = "card">' + shuffledDeckOfCards[i] + '</li>';
  }
  return htmlCard;
}

/*  Adds each card's HTML to the page */
$('.deck').html(createHtmlCard(shuffledDeckOfCards));

/* --When cards are clicked-- */

let timer;
$('.deck').one('click', function() {
  /* Function that starts the Timer in the Score Panel and Final Scoreboard when any part of the deck is clicked from the first time with help from https://stackoverflow.com/questions/5517597/ */
  let sec = 0;
  function pad ( val ) { return val > 9 ? val : "0" + val; }
  timer = setInterval( function(){
    $('.seconds').html(pad(++sec % 60));
    $('.minutes').html(pad(parseInt(sec / 60, 10)));
  }, 1000);
  /* When any part of the deck is clicked for the first time, the page is scrolled so that the Score Panel is at the top in case the board is not properly aligned vertically with help from https://www.abeautifulsite.net/smoothly-scroll-to-an-element-without-a-jquery-plugin-2 */
  $('html, body').animate( {
    scrollTop: $('.score-panel').offset().top
  }, 100);
});

let openCards = [];
let matchedCards = [];
$('.deck .card').on('click', function() {
  /* Function that executes when a card is clicked */
  /* The Move Counter in the Score Panel and the Final Scoreboard is incremented by 1 with help from https://stackoverflow.com/questions/4701349/ */
  $('.score-panel .moves, .final-scoreboard .moves').html(function(i, val) { return + val + 1 });
  /* A helper function is called to lower the Star Rating after certain number of Moves */
  lowerStarRating();
  /* The card is opened to display its picture and is assigned a variable */
  let openedCard = $(this).addClass('.card open').children();
  if ($('.card').hasClass('open')) {
    /* If the card has the class name 'open' then pointer-events is set to none so that an opened card can't be clicked again and matched to itself */
    $(this).css('pointer-events', 'none');
  } else {
    console.log(".card class does not have class 'open'")
  }
  /* The card is added to an array of open cards */
  openCards.push(openedCard);
  console.log("Length of openCards: " + openCards.length);
  console.log("openCards[0] before checkMatch method: " + openCards[0].attr('class'));
  console.log("openCards[1] before checkMatch method: " + openCards[1].attr('class'));
  if (openCards.length === 2) {
    /* If the length of the array of open cards is 2, the checkMatch() helper function is called to check if the two cards match */
    console.log("checkMatch has been called");
    checkMatch();
  } else {
    console.log("checkMatch has not been called");
  }
});

function lowerStarRating() {
  /* Function that lowers Star Rating after a certain amount of Moves made by the user */
  let moveCount = $('.score-panel .moves').html();
  console.log("moveCount: " + moveCount);
  if (moveCount >= 30 && moveCount <= 34) {
    /* If Move count is between 30 and 34, Star Rating is 3 stars */
    console.log("3 stars");
    $('.star4').css('color', 'gray');
  } else if (moveCount >= 35 && moveCount <= 39) {
    /* If Move count is between 35 and 39, Star Rating is 2 stars */
    console.log("2 stars");
    $('.star3').css('color', 'gray');
  } else if (moveCount > 39) {
    /* If Move count is 40 or greater, Star Rating is 1 star */
    console.log("1 star");
    $('.star2').css('color', 'gray');
  } else {
    /* If Move count is less than 30, Star Rating is 4 stars */
    console.log("4 stars");
  }
}

function checkMatch() {
  /* Helper function that checks if the cards in the openCards array match */
  if (openCards[0].attr('class') === openCards[1].attr('class')) {
    /* If the first card clicked and opened matches the second card clicked and opened */
    console.log("Cards match");
    /* The matched cards are changed to the '.card match' classes with code for bounceIn animation from https://robots.thoughtbot.com/css-animation-for-beginners */
    $(openCards[0]).parent().removeClass('.card open').addClass('.card match').css({'animation-name': 'bounceIn', 'animation-duration': '0.5s'});
    $(openCards[1]).parent().removeClass('.card open').addClass('.card match').css({'animation-name': 'bounceIn', 'animation-duration': '0.5s'});
    /* The matched cards are removed from the matchedCards array */
    matchedCards.push(openCards[0]);
    matchedCards.push(openCards[1]);
    /* The matched cards are removed from the openCards array */
    openCards = [];
  } else {
    /* If the two clicked and opened cards do not match, a helper function is called and the cards are flipped back in the closed position after a 0.5 second delay */
    console.log("Cards do not match");
    setTimeout(flipCards, 500);
    /* The unmatched cards are removed from the openCards array after a 0.5 second delay */
    setTimeout(function() { openCards = []; }, 500);
    console.log("Length of openCards: " + openCards.length);
  }
  if (matchedCards.length === 16) {
    /* If all the cards are matched */
    /* The Timer is stopped */
    clearInterval(timer);
    /* The Final Scoreboard is displayed */
    $(".final-scoreboard").css('display', 'block');
  } else {
    console.log("Not all cards are matched");
  }
}

function flipCards() {
  /* Helper function that allows the cards that are flipped back closed be able to be clicked open again, changes the classes of the unmatched cards to '.deck .card' and flips the open unmatched cards back closed with code for shake animation from https://www.w3schools.com/howto/howto_css_shake_image.asp */
  console.log("flipCards has been called");
  $(openCards[0]).parent().css({'animation': 'shake 0.5s', 'pointer-events': 'auto'}).removeClass('.card open').addClass('.deck .card');
  $(openCards[1]).parent().css({'animation': 'shake 0.5s', 'pointer-events': 'auto'}).removeClass('.card open').addClass('.deck .card');
}

/* --When the Restart button is clicked-- */

$('.score-panel .restart').on('click', function() {
  /* Function that restarts the game when the Restart Button on the Score Panel is clicked */
  /* The shuffled deck of cards is assigned a constant */
  const shuffledDeckOfCards = shuffle(deckOfCards);
  /* The deck of cards is reshuffled */
  $('.deck').html(createHtmlCard(shuffledDeckOfCards));
  /* The Move Counter is reset to 0 */
  $('.score-panel .moves, .final-scoreboard .moves').html(function(i, val) { return 0 });
  /* The Star Rating is reset to 4 Stars */
  $('.star4, .star3, .star2').css('color', 'orange');
  /* The Timer is stopped so it can be restarted when the game is restarted */
  clearInterval(timer);
  /* The Timer is displayed as 00:00 */
  $('.seconds, .minutes').html('00');
  /* The Timer is started again when any part of the deck is clicked for the first time */
  $('.deck').one('click',function() {
    let sec = 0;
    function pad ( val ) { return val > 9 ? val : "0" + val; }
    timer = setInterval( function() {
      $('.seconds').html(pad(++sec % 60));
      $('.minutes').html(pad(parseInt(sec / 60, 10)));
    }, 1000);
  });

  $('.deck .card').on('click', function() {
    /* Function that executes when a card is clicked */
    /* The Move Counter in the Score Panel and the Final Scoreboard is incremented by 1 */
    $('.moves').html(function(i, val) { return + val + 1 });
    /* A helper function is called to lower the Star Rating after certain number of Moves */
    lowerStarRating();
    /* The card is opened to display its picture and is assigned a variable */
    let openedCard = $(this).addClass('.card open').children();
    /* The card is added to a array of open cards */
    openCards.push(openedCard);
    console.log("Length of openCards: " + openCards.length);
    console.log("openCards[0] before checkMatch method: " + openCards[0].attr('class'));
    console.log("openCards[1] before checkMatch method: " + openCards[1].attr('class'));
    if (openCards.length === 2) {
      /* If the length of the array of open cards is 2, the checkMatch() helper function is called to check if the two cards match */
      console.log("checkMatch has been called");
      checkMatch();
    } else {
      console.log("checkMatch has not been called");
    }
  });
});
