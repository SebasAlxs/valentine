// Mantener el JavaScript existente
function mostrarMensaje() {
    document.getElementById('inicio').style.opacity = '0';
    setTimeout(() => {
        document.getElementById('inicio').style.display = 'none';
        document.getElementById('mensaje').style.display = 'flex';
    }, 1000);
}

function aceptar() {
    document.getElementById('mensaje').style.opacity = '0';
    setTimeout(() => {
        document.getElementById('mensaje').style.display = 'none';
        document.getElementById('juego-memoria').style.display = 'flex';
        iniciarJuegoMemoria();
    }, 1000);
}

function mostrarGirasol() {
    document.getElementById('juego-memoria').style.display = 'none';
    document.getElementById('girasol').style.display = 'flex';
    generarCorazones();
}

function generarCorazones() {
    for (let i = 0; i < 15; i++) {
        let heart = document.createElement("div");
        heart.className = "heart";
        heart.innerHTML = "❤️";
        heart.style.left = Math.random() * window.innerWidth + "px";
        heart.style.top = Math.random() * window.innerHeight + "px";
        document.body.appendChild(heart);

        setTimeout(() => { heart.remove(); }, 4000);
    }
}

// Juego de memoria
function iniciarJuegoMemoria() {
    const cards = document.querySelectorAll('.memory-card');
    let hasFlippedCard = false;
    let lockBoard = false;
    let firstCard, secondCard;

    function flipCard() {
        if (lockBoard) return;
        if (this === firstCard) return;

        this.classList.add('flip');

        if (!hasFlippedCard) {
            hasFlippedCard = true;
            firstCard = this;
            return;
        }

        secondCard = this;
        checkForMatch();
    }

    function checkForMatch() {
        let isMatch = firstCard.dataset.framework === secondCard.dataset.framework;
        isMatch ? disableCards() : unflipCards();
    }

    function disableCards() {
        firstCard.removeEventListener('click', flipCard);
        secondCard.removeEventListener('click', flipCard);
        resetBoard();
    }

    function unflipCards() {
        lockBoard = true;
        setTimeout(() => {
            firstCard.classList.remove('flip');
            secondCard.classList.remove('flip');
            resetBoard();
        }, 1500);
    }

    function resetBoard() {
        [hasFlippedCard, lockBoard] = [false, false];
        [firstCard, secondCard] = [null, null];
    }

    (function shuffle() {
        cards.forEach(card => {
            let randomPos = Math.floor(Math.random() * 8);
            card.style.order = randomPos;
        });
    })();

    cards.forEach(card => card.addEventListener('click', flipCard));
}

function moverBoton(btn) {
    const screenWidth = window.innerWidth;
    const screenHeight = window.innerHeight;
    const btnRect = btn.getBoundingClientRect();
    const margin = 20;
    
    let newX = Math.random() * (screenWidth - btnRect.width - margin*2) + margin;
    let newY = Math.random() * (screenHeight - btnRect.height - margin*2) + margin;
    
    newX = Math.min(Math.max(newX, margin), screenWidth - btnRect.width - margin);
    newY = Math.min(Math.max(newY, margin), screenHeight - btnRect.height - margin);
    
    btn.style.position = 'fixed';
    btn.style.left = newX + 'px';
    btn.style.top = newY + 'px';
    
    if (event) {
        event.preventDefault();
    }
    return false;
}