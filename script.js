
function start() {

    let counter = 0
    let cardNumbers = prompt("Com quantas cartas deseja jogar? 4, 6, 8, 10, 12 ou 14?")
    let board = document.querySelector(".board")
    const cardsArr = ['bobrossparrot.gif', 'explodyparrot.gif', 'fiestaparrot.gif', 'metalparrot.gif', 'revertitparrot.gif', 'tripletsparrot.gif', 'unicornparrot.gif']

    while (cardNumbers < 4 || cardNumbers > 14 || cardNumbers % 2 !== 0) {

        cardNumbers = prompt("Com quantas cartas deseja jogar? 4, 6, 8, 10, 12 ou 14?")
    }

    for (i = 0; i < cardNumbers/2 ; i++) {

        board.innerHTML = board.innerHTML +
            `<div class="card">
                <img class="card-back" src="./imgs/front.png">
                <img class="card-front" src="./imgs/${cardsArr[i]}">
            </div>
            <div class="card">
                <img class="card-back" src="./imgs/front.png">
                <img class="card-front" src="./imgs/${cardsArr[i]}">
            </div>`
    }

    const cards = document.querySelectorAll('.card')
    let hasFlippedCard = false;
    let firstCard, secondCard;
    let lockboard = false

    cards.forEach(card => {
        let randomPos = Math.floor(Math.random() * cardNumbers);
        card.style.order = randomPos;
    });

    cards.forEach( card => {
        card.addEventListener('click', flipCard)
    })

    function flipCard () {
        counter++

        if (lockboard) return;
        if (this === firstCard){ 
            return;
        }
        this.classList.add('flip');
        if(!hasFlippedCard) {
            hasFlippedCard = true;
            firstCard = this;
            return
        }

        secondCard = this
        checkForMatch();
        checkAll();

    }

    function checkForMatch () {
        if(firstCard.innerHTML === secondCard.innerHTML) {
            disableCards()
            return;
        }

        unflipCards ()
    }

    function disableCards () {
        firstCard.removeEventListener('click', flipCard);
        secondCard.removeEventListener('click', flipCard);

        resetBoard ();
    }

    function resetBoard() {
        [hasFlippedCard, lockboard] = [false, false]
        [firstCard, secondCard] = [null, null]
    }

    function unflipCards () {

        lockboard = true

        setTimeout(() => {
            firstCard.classList.remove('flip');
            secondCard.classList.remove('flip');

            resetBoard();
        }, 1000);
    }

    function checkAll () {

        cardsCheck = Array.from(cards)
        if ( cardsCheck.every((card)=>card.classList.contains("flip"))) {
            setTimeout(function(){alert(`Você venceu em ${counter} jogadas`)}, 1000);

            setTimeout(restart, 3000)
        }
    }

    function restart () {

        let again = prompt('Gostaria de jogar novamente?')

        if(again === 'sim'){
            board.innerHTML = ''
            start();
        }else{
            alert('Obrigado por jogar!')
        }
    }
}