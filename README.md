# memory-game

Hello! This is my version of the memory game for the Udacity Intro to Programming Final Project. 

The game consists of 16 cards (8 matching pairs) that are randomly shuffled and placed face-down. When the user clicks on a card, it is turned face-up to display a shape. The user must click on another face-down card to turn it over to display another shape. If the second shape matches the first shape, both cards stay face-up. If the second shape does not match the first shape, both cards are flipped back face-down. The user wins once all the pairs have been matched.

Features:
- Star Rating: 4 stars are displayed at the beginning of the game. After 30 seconds elapses from the start of the game, the star rating lowers to 3 stars. Then after another 30 seconds elapses (60 seconds total), the star rating is lowered to 2 stars. After another 30 seconds elapses (90 seconds total), the star rating is lowered to 1 star (the lowest Star Rating).
- A Timer is displayed which counts up from 00:00 when the game starts. When the user wins, the timer stops.
- The game displays a Move Counter which indicates the current number of moves made by the user.
- A Restart button is present to allow the user to reset the deck of cards, the Star Rating, the Move Counter, and the Timer.
- When the user wins, a Scoreboard appears congratulating the user and indicates what the Star Rating was, how long it took to win the game, and how many moves were made. The user is then asked to play again.

Extras:
- CSS animations when:
  - The cards are unsuccessfully matched (shake animation)
  - The cards are successfully matched (bounceIn animation)
  - The Final Scoreboard appears (bounceIn animation)
