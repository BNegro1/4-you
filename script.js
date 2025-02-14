const healthyFoods = ['zanahoria', 'manzana', 'brocoli'];
const unhealthyFoods = ['donut', 'chocolate', 'palomitas'];
let score = 0;

const hamster = document.getElementById('hamster');
const feedbackEl = document.getElementById('feedback');
const scoreEl = document.getElementById('score');
const resetButton = document.getElementById('resetButton');
const startButton = document.getElementById('startButton');
const restartButton = document.getElementById('restartButton');
const memoryScreen = document.getElementById('memoryScreen');
const memoryDoneButton = document.getElementById('memoryDoneButton');
const memoryBoard = document.getElementById('memoryBoard');
const welcomeScreen = document.getElementById('welcomeScreen');
const finalScreen = document.getElementById('finalScreen');

document.querySelectorAll('.food-item').forEach(item => {
    item.addEventListener('click', handleClick);
});

resetButton.addEventListener('click', resetGame);
startButton.addEventListener('click', startGame);
restartButton.addEventListener('click', restartGame);
memoryDoneButton.addEventListener('click', checkMemoryMatch);

let memoryCards = [];
let flippedCards = [];

function startGame() {
    welcomeScreen.classList.add('hidden');
    feedbackEl.textContent = "Comencemos a cuidar a Koromo, selecciona alimentos saludables para él.";
}

function handleClick(e) {
    const food = e.target.closest('.food-item').dataset.food;
    if (healthyFoods.includes(food)) {
        score += 10;
        showFeedback(`¡Buen trabajo, amor! Nuestro pequeño se siente mejor gracias a ti 🥕 +10 puntos`, '#C8E6C9');
        hamster.classList.add('dropped');
        playSound('healthySound');
        setTimeout(() => hamster.classList.remove('dropped'), 500);
    } else {
        score -= 5;
        showFeedback(`¡Oh no, amor! Eso no es saludable 🚨 -5 puntos`, '#FFCDD2');
        hamster.classList.add('shake');
        playSound('unhealthySound');
        setTimeout(() => hamster.classList.remove('shake'), 500);
    }
    scoreEl.textContent = score;

    if (score >= 50) {
        setTimeout(() => {
            memoryScreen.classList.remove('hidden');
            generateMemoryGame();
        }, 1000);
    }
}

function showFeedback(text, color) {
    feedbackEl.textContent = text;
    feedbackEl.style.backgroundColor = color;
    setTimeout(() => {
        feedbackEl.style.backgroundColor = 'transparent';
    }, 1000);
}

function generateMemoryGame() {
    const foods = ['zanahoria', 'manzana', 'brocoli', 'donut', 'chocolate', 'palomitas'];
    memoryCards = foods.concat(foods).sort(() => 0.5 - Math.random());
    memoryBoard.innerHTML = '';

    memoryCards.forEach((food, index) => {
        const card = document.createElement('div');
        card.classList.add('memory-card');
        card.dataset.food = food;
        card.dataset.index = index;
        card.addEventListener('click', flipCard);
        memoryBoard.appendChild(card);
    });
}

function flipCard() {
    const card = this;
    if (flippedCards.length < 2 && !card.classList.contains('flipped')) {
        card.classList.add('flipped');
        flippedCards.push(card);
    }

    if (flippedCards.length === 2) {
        checkMemoryMatch();
    }
}

function checkMemoryMatch() {
    if (flippedCards[0].dataset.food === flippedCards[1].dataset.food) {
        score += 10;
        flippedCards.forEach(card => card.classList.add('matched'));
        showFeedback(`¡Emparejaste correctamente! +10 puntos`, '#C8E6C9');
    } else {
        score -= 5;
        flippedCards.forEach(card => card.classList.remove('flipped'));
        showFeedback(`No coinciden, inténtalo de nuevo. -5 puntos`, '#FFCDD2');
    }
    flippedCards = [];
    scoreEl.textContent = score;

    if (document.querySelectorAll('.memory-card.matched').length === memoryCards.length) {
        setTimeout(() => {
            finalScreen.classList.remove('hidden');
        }, 1000);
    }
}

function resetGame() {
    score = 0;
    scoreEl.textContent = score;
    feedbackEl.textContent = '¡Juego reiniciado! Ayuda al hamster de nuevo.';
    finalScreen.classList.add('hidden');
}

function restartGame() {
    resetGame();
    finalScreen.classList.add('hidden');
    welcomeScreen.classList.remove('hidden');
}

function playSound(soundId) {
    const sound = document.getElementById(soundId);
    if (sound) {
        sound.currentTime = 0;
        sound.play();
    }
}
