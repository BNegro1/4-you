const healthyFoods = ['empanada', 'fideos', 'frutilla', 'pan', 'palta', 'taco', 'queso'];
const unhealthyFoods = ['dona', 'carne', 'maruchan', 'wafles', 'medialunaXD'];
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
        // Cambiar a imagen de selección correcta
        hamster.src = "assets/koromos/Koromo_rico.png";
        hamster.classList.add('dropped');
        playSound('healthySound');
        setTimeout(() => {
            hamster.classList.remove('dropped');
            // Restaurar imagen estándar
            hamster.src = "assets/koromos/Koromo_normal.png";
        }, 950); // Duración reducida a 300ms
    } else {
        score -= 5;
        showFeedback(`¡Oh no, amor! Eso no es saludable 🚨 -5 puntos`, '#FFCDD2');
        // Cambiar a imagen de selección errónea
        hamster.src = "assets/koromos/Koromo_malo.png";
        hamster.classList.add('shake');
        playSound('unhealthySound');
        setTimeout(() => {
            hamster.classList.remove('shake');
            // Restaurar imagen estándar
            hamster.src = "assets/koromos/Koromo_normal.png";
        }, 950); // Duración reducida a 300ms
    }
    scoreEl.textContent = score;

    if (score === 50) {
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
        // Mostrar botón para confirmar el emparejamiento
        memoryDoneButton.classList.remove('hidden');
    }
}

function checkMemoryMatch() {
    // Ocultar el botón de confirmación al iniciar la verificación
    memoryDoneButton.classList.add('hidden');
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

function shuffleFoodItems() {
    const foodOptions = document.querySelector('.food-options');
    const foods = [
        { name: 'carne', type: 'unhealthy', img: 'assets/carne.png' },
        { name: 'dona', type: 'unhealthy', img: 'assets/dona.png' },
        { name: 'empanada', type: 'healthy', img: 'assets/empanada.png' },
        { name: 'fideos', type: 'healthy', img: 'assets/fideos.png' },
        { name: 'frutilla', type: 'healthy', img: 'assets/frutilla.png' },
        { name: 'maruchan', type: 'unhealthy', img: 'assets/maruchan.png' },
        { name: 'pan', type: 'healthy', img: 'assets/pan.png' },
        { name: 'palta', type: 'healthy', img: 'assets/palta.png' },
        { name: 'taco', type: 'healthy', img: 'assets/taco.png' },
        { name: 'wafles', type: 'unhealthy', img: 'assets/wafles.png' },
        { name: 'queso', type: 'healthy', img: 'assets/queso.png' },
        { name: 'medialunaXD', type: 'unhealthy', img: 'assets/medialunaXD.png' },
    ];
    
    // Seleccionar 5 alimentos aleatorios
    const randomFoods = foods.sort(() => 0.5 - Math.random()).slice(0, 7);
    
    foodOptions.innerHTML = '';

    randomFoods.forEach(food => {
        const foodItem = document.createElement('div');
        foodItem.classList.add('food-item');
        foodItem.dataset.food = food.name;
        foodItem.dataset.type = food.type;

        const img = document.createElement('img');
        img.src = food.img;
        img.alt = food.name;

        foodItem.appendChild(img);
        foodOptions.appendChild(foodItem);
    });

    document.querySelectorAll('.food-item').forEach(item => {
        item.addEventListener('click', handleClick);
    });
}

document.addEventListener('DOMContentLoaded', shuffleFoodItems);
