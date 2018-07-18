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

var openCards = [];
var matchedCards = [];
$('.deck .card').on('click', function() {
  /* Function that executes when a card is clicked:
    -  The Move Counter in the Score Panel and the Final Scoreboard is incremented and displayed with help from https://stackoverflow.com/questions/4701349/
    - The card is opened to display its picture with code for flip animation taken from http://www.theappguruz.com/tag-tools/web/CSSAnimations/
    - The card is added to a *list* of "open" cards */
  $('.score-panel .moves, .final-scoreboard .moves').html(function(i, val) { return + val + 1 });

  var openedCard = $(this).addClass('.card show open').children();

  openCards.push(openedCard);
  console.log("openCards.length: " + openCards.length);
  console.log(openCards[0].attr('class') === openCards[1].attr('class'));
  console.log("openCards[0] before checkMatch method: " + openCards[0].attr('class'));
  console.log("openCards[1] before checkMatch method: " + openCards[1].attr('class'));
  if (openCards.length === 2) {
    /* If the list of open cards is two cards, the checkMatch function is executed to check if the two cards match */
    console.log("checkMatch has been called");
    checkMatch();
  }
  else {
    console.log("checkMatch has not been called");
    openCards.length != 2;
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
  }
  else {
    /* If the cards do not match, the card's are put in the closed position and the cards are removed from the openCards list. Code for shake animation taken from https://www.w3schools.com/howto/howto_css_shake_image.asp */
    console.log("Cards do not match");
    var flipBack;
    function flipCards() {
      console.log("flipCards has been called");
      flipBack = setTimeout(noMatch, 3000);
    }
    function noMatch() {
      console.log("noMatch has been called");
      $(openCards[0]).parent().removeClass('.card show open').addClass('.deck .card');
      $(openCards[1]).parent().removeClass('.card show open').addClass('.deck .card');
    }
    flipCards();
    openCards = [];
  }
  if (matchedCards.length === 16) {
    /* if all the cards are matched, the Timer and timer for the Star Rating are stopped and the Final Scoreboard is displayed. */
    clearInterval(timer);
    clearTimeout(twoStars);
    clearTimeout(oneStar);
    $(".final-scoreboard").css('display', 'block');
  }
  else {
    matchedCards.length != 16;
    console.log("Not all cards are matched");
  }
  console.log("openCards[0] after checkMatch method: " + openCards[0].attr('class'));
  console.log("openCards[1] after checkMatch method: " + openCards[1].attr('class'));
}

var timer;
var twoStars;
var oneStar;
$('.deck').one('click', function() {
  /* Function that starts the Timer in the Score Panel and Final Scoreboard when the deck is first clicked with help from https://stackoverflow.com/questions/5517597/ */
  var sec = 0;
  function pad ( val ) { return val > 9 ? val : "0" + val; }
  timer = setInterval( function(){
    $('.seconds').html(pad(++sec % 60));
    $('.minutes').html(pad(parseInt(sec / 60, 10)));
  }, 1000);
  /* Once Timer starts, Grays out Star on the right (lowers Star Rating to two Stars) after 2 minutes with help from https://stackoverflow.com/questions/14247054/ */
  twoStars = setTimeout(function(){ $('.star3').css('color', 'gray'); }, 120000);
  /* Once Timer starts, Grays out Star in the middle (lowers Star Rating to one Star) after 4 minutes with help from https://stackoverflow.com/questions/14247054/ */
  oneStar = setTimeout(function(){ $('.star2').css('color', 'gray'); }, 240000);
});

$('.score-panel .restart').on('click', function() {
/* Function that restarts the game when the Restart Button on the Score Panel is clicked */
  var shuffledDeckOfCards = shuffle(deckOfCards);
  $('.deck').html(createHtmlCard(shuffledDeckOfCards));

  $('.deck .card').on('click', function() {
    /*When a card is clicked, it's opened to display its picture and the Move Counter increments with each Move */
    $(this).addClass('.card show open');
    $('.moves').html(function(i, val) { return +val+1 });
  });

  $('.score-panel .moves, .final-scoreboard .moves').html(function(i, val) { return 0 }); // Move Counter resets to 0

  $('.star3, .star2').css('color', 'orange'); // Resets Star Rating to 3 Stars

  clearInterval(timer); // Stops Timer so it can be restarted when game is restarted

  $('.seconds, .minutes').html('00'); // Displays the Timer as 00:00

  $('.deck').one('click',function() { // Starts the Timer again
    var sec = 0;
    function pad ( val ) { return val > 9 ? val : "0" + val; }
    timer = setInterval( function() {
      $('.seconds').html(pad(++sec % 60));
      $('.minutes').html(pad(parseInt(sec / 60, 10)));
    }, 1000);
    setTimeout(function(){ $('.star3').css('color', 'gray'); }, 120000); // Lowers the Star Rating to 2 Stars after 2 minutes
    setTimeout(function(){ $('.star2').css('color', 'gray'); }, 240000); // Lowers the Star Rating to 1 Star after 4 minutes
  });
});
