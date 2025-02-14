const healthyFoods = ['empanada', 'fideos', 'frutilla', 'pan', 'palta', 'taco', 'queso'];
const unhealthyFoods = ['dona', 'carne', 'maruchan', 'wafles', 'medialunaXD'];
let score = 0;

const koromo = document.getElementById('koromo');
const feedbackEl = document.getElementById('feedback');
const scoreEl = document.getElementById('score');
const resetButton = document.getElementById('resetButton');
const startButton = document.getElementById('startButton');
const restartButton = document.getElementById('restartButton');
const memoryScreen = document.getElementById('memoryScreen');
const memoryBoard = document.getElementById('memoryBoard');
const welcomeScreen = document.getElementById('welcomeScreen');
const finalScreen = document.getElementById('finalScreen');

// Agregar comprobaciones para asegurarse de que los elementos existen
if (resetButton) {
	resetButton.addEventListener('click', resetGame);
}
if (startButton) {
	startButton.addEventListener('click', startGame);
}
if (restartButton) {
	restartButton.addEventListener('click', restartGame);
	// Eliminar listener duplicado si existe
}
document.getElementById('restartButton').addEventListener('click', function() {
    location.reload();
});

let memoryCards = [];
let flippedCards = [];
let memoryStage = 1; // 1: primer tablero de 6 tarjetas, 2: segundo tablero de 6 tarjetas

function startGame() {
    welcomeScreen.classList.add('hidden');
    feedbackEl.textContent = "Comencemos a cuidar a Koromo, selecciona alimentos saludables para él.";
}

function handleClick(e) {
    const food = e.target.closest('.food-item').dataset.food;
    if (healthyFoods.includes(food)) {
        score += 10;
        showFeedback(`SÍ, por fín comida, 🥵 +10 puntos`, '#C8E6C9');
        // Cambiar a imagen de selección correcta
        koromo.src = "assets/koromos/Koromo_rico.png";
        koromo.classList.add('dropped');
        playSound('healthySound');
        setTimeout(() => {
            koromo.classList.remove('dropped');
            // Restaurar imagen estándar
            koromo.src = "assets/koromos/Koromo_normal.png";
        }, 950); // Duración reducida a 300ms
    } else {
        score -= 5;
        showFeedback(`Eso NO es saludable (Mentira XD) - 🚨🗣️🆘 -5 puntos`, '#FFCDD2');
        // Cambiar a imagen de selección errónea
        koromo.src = "assets/koromos/Koromo_malo.png";
        koromo.classList.add('shake');
        playSound('unhealthySound');
        setTimeout(() => {
            koromo.classList.remove('shake');
            // Restaurar imagen estándar
            koromo.src = "assets/koromos/Koromo_normal.png";
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

// Función auxiliar para obtener N elementos aleatorios de un array
function pickRandom(arr, num) {
    const arrayCopy = [...arr];
    const result = [];
    for(let i = 0; i < num; i++){
        const index = Math.floor(Math.random() * arrayCopy.length);
        result.push(arrayCopy.splice(index, 1)[0]);
    }
    return result;
}

// Actualizar la función generateMemoryGame para usar imágenes desde assets/memorizar
function generateMemoryGame() {
    const allImages = [
        "assets/memorizar/komoro_8bit.png",
        "assets/memorizar/komoro_ballena.png",
        "assets/memorizar/komoro_bat.png",
        "assets/memorizar/komoro_besito.png",
        "assets/memorizar/komoro_boom.png",
        "assets/memorizar/komoro_caballo.png",
        "assets/memorizar/komoro_calculadora.png",
        "assets/memorizar/komoro_campana.png",
        "assets/memorizar/komoro_corazongigante.png",
        "assets/memorizar/komoro_crazy.png",
        "assets/memorizar/komoro_cum.png",
        "assets/memorizar/komoro_enamorado.png",
        "assets/memorizar/komoro_enojao.png",
        "assets/memorizar/komoro_fantasma.png",
        "assets/memorizar/komoro_ganso.png",
        "assets/memorizar/komoro_gato.png",
        "assets/memorizar/komoro_hopeado.png",
        "assets/memorizar/komoro_hot.png",
        "assets/memorizar/komoro_jeje.png",
        "assets/memorizar/komoro_koromitos_parejitajeje.png",
        "assets/memorizar/komoro_koromo.png",
        "assets/memorizar/komoro_leon.png",
        "assets/memorizar/komoro_llama.png",
        "assets/memorizar/komoro_lobo.png",
        "assets/memorizar/komoro_lov.png",
        "assets/memorizar/komoro_lsd.png",
        "assets/memorizar/komoro_marciano.png",
        "assets/memorizar/komoro_monkey.png",
        "assets/memorizar/komoro_no_es_komoro.png",
        "assets/memorizar/komoro_ojito.png",
        "assets/memorizar/komoro_ola.png",
        "assets/memorizar/komoro_pajaro.png",
        "assets/memorizar/komoro_palta_cosplay.png",
        "assets/memorizar/komoro_pancito.png",
        "assets/memorizar/komoro_personificado.png",
        "assets/memorizar/komoro_pinguino.png",
        "assets/memorizar/komoro_python.png",
        "assets/memorizar/komoro_rana.png",
        "assets/memorizar/komoro_saddoromo.png",
        "assets/memorizar/komoro_solcito.png",
        "assets/memorizar/komoro_suerte.png",
        "assets/memorizar/komoro_tiburon.png",
        "assets/memorizar/komoro_tortuga.png",
        "assets/memorizar/komoro_twiotter.png",
        "assets/memorizar/komoro_vaquero.png",
        "assets/memorizar/komoro_wat.png",
        "assets/memorizar/komoro_yolo.png",
        "assets/memorizar/komoro_zzz.png"
    ];
    // Seleccionar 3 imágenes aleatorias para formar 3 pares (tablero 3x2)
    const selectedImages = pickRandom(allImages, 3);
    const pairs = selectedImages.concat(selectedImages).sort(() => 0.5 - Math.random());
    memoryBoard.innerHTML = '';
    pairs.forEach((imgPath, index) => {
        const card = document.createElement('div');
        card.classList.add('memory-card');
        card.dataset.image = imgPath;
        card.dataset.index = index;
        // Inicialmente la imagen está oculta
        const img = document.createElement('img');
        img.src = imgPath;
        img.classList.add('hidden-image');
        card.appendChild(img);
        card.addEventListener('click', flipCard);
        memoryBoard.appendChild(card);
    });
    // Reiniciar el array de tarjetas volteadas
    flippedCards = [];
}

// En flipCard, al voltear la tarjeta, si hay 2 volteadas se procede a verificar
function flipCard() {
    const card = this;
    const img = card.querySelector('img');
    if (flippedCards.length < 2 && !card.classList.contains('flipped')) {
        card.classList.add('flipped');
        img.classList.remove('hidden-image');
        flippedCards.push(card);
    }
    if (flippedCards.length === 2) {
        // Verificar después de un breve delay para apreciar la imagen
        setTimeout(checkMemoryMatch, 800);
    }
}

// Verificar si las 2 tarjetas volteadas coinciden
function checkMemoryMatch() {
    // Evitar errores si flippedCards tiene menos de 2 elementos
    if (flippedCards.length < 2) return;

    if (flippedCards[0].dataset.image === flippedCards[1].dataset.image) {
        score += 10;
        flippedCards.forEach(card => card.classList.add('matched'));
        showFeedback(`¡Emparejaste correctamente! +10 puntos`, '#C8E6C9');
        // Vaciar array de tarjetas volteadas
        flippedCards = [];
        // Si todas las tarjetas están emparejadas, actuar según la fase
        if (document.querySelectorAll('.memory-card.matched').length === memoryBoard.childElementCount) {
            if (memoryStage === 1) {
                memoryStage = 2;
                generateMemoryGame();
            } else {
                finalScreen.classList.remove('hidden');
            }
        }
        scoreEl.textContent = score;
    } else {
        score -= 5;
        showFeedback(`No coinciden, inténtalo de nuevo. -5 puntos`, '#FFCDD2');
        setTimeout(() => {
            flippedCards.forEach(card => {
                card.classList.remove('flipped');
                card.querySelector('img').classList.add('hidden-image');
            });
            flippedCards = [];
            scoreEl.textContent = score;
        }, 500);
    }
}

function resetGame() {
    score = 0;
    scoreEl.textContent = score;
    feedbackEl.textContent = '¡Juego reiniciado! Ayuda al koromo de nuevo.';
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
