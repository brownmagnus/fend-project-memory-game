/*
 * Create a list that holds all of your cards
 */
 var cards = ['fa-diamond', 'fa-paper-plane-o', 'fa-anchor',
              'fa-bolt', 'fa-cube', 'fa-anchor', 'fa-leaf',
              'fa-bicycle', 'fa-diamond', 'fa-bomb',
              'fa-leaf', 'fa-bomb', 'fa-bolt',
              'fa-bicycle' , 'fa-paper-plane-o', 'fa-cube'
            ];

 function generateCard(card) {
   return `<li class="card" data-card="${card}"><i class="fa ${card}"></i></li>`;
 }

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */
 function initGame() {
   var deck = document.querySelector('.deck');
   var cardHTML = shuffle(cards).map(function(card) {
     return generateCard(card);
   });
   deck.innerHTML = cardHTML.join('');

 }

 initGame();
// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
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


/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
var restartGame = document.querySelector('.restart');
restartGame.addEventListener('click', initGame);

var cardsInList = document.querySelectorAll('.card');
var openCards = [];

cardsInList.forEach(gaming);

function gaming(card) {
  card.addEventListener('click', function(e) {
    if (!card.classList.contains('open') && !card.classList.contains('show') && !card.classList.contains('match')) {
      openCards.push(card);
      card.classList.add('open', 'show');

      if (openCards.length == 2) {
        if (openCards[0].dataset.card == openCards[1].dataset.card) {
          openCards[0].classList.add('match');
          openCards[0].classList.add('open');
          openCards[0].classList.add('show');

          openCards[1].classList.add('match');
          openCards[1].classList.add('open');
          openCards[1].classList.add('show');

          openCards = [];
        } else {
            setTimeout(function() {
              openCards.forEach(function(card) {
                card.classList.remove('open', 'show');
              });
              openCards = [];
            }, 1000);
        }
        movesDone();

      }
    }

  });
}

//moves functionality


// function to count moves and remove sters
function movesDone() {
  var movesText = document.querySelector('.moves');
  var num = parseInt(movesText.innerText);
  movesText.innerText = num + 1;
}
